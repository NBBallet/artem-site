/* eslint-disable @typescript-eslint/no-explicit-any -- GitHub REST JSON is untyped here */
type Options = { token: string; owner: string; repo: string; branch: string; fetchImpl?: typeof fetch };
const API = "https://api.github.com";
export function makeGitHub(opts: Options) {
  const request = async (url: string, init: RequestInit = {}): Promise<Response> => {
    const response = await (opts.fetchImpl ?? fetch)(url, { ...init, headers: { Authorization: `Bearer ${opts.token}`, "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "site-editor", Accept: "application/vnd.github+json", ...(init.headers as Record<string, string> | undefined) } });
    if (!response.ok) {
      const body = (await response.text()).slice(0, 240);
      const error = new Error(`GitHub ${response.status}: ${body}`) as Error & { status: number; code?: string };
      error.status = response.status;
      if (response.status === 422 && /fast-forward|non-fast-forward|reference update failed/i.test(body)) error.code = "conflict";
      throw error;
    }
    return response;
  };
  const base = `${API}/repos/${encodeURIComponent(opts.owner)}/${encodeURIComponent(opts.repo)}`;
  return {
    async getHead() {
      const commit = await (await request(`${base}/git/ref/heads/${encodeURIComponent(opts.branch)}`)).json() as any;
      const commitSha = commit.object.sha;
      const data = await (await request(`${base}/git/commits/${commitSha}`)).json() as any;
      return { commitSha, treeSha: data.tree.sha };
    },
    async readFile(path: string, ref: string): Promise<string | null> {
      const url = `${base}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`;
      const response = await (opts.fetchImpl ?? fetch)(url, { headers: { Authorization: `Bearer ${opts.token}`, "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "site-editor", Accept: "application/vnd.github.raw+json" } });
      if (response.status === 404) return null;
      if (!response.ok) { const body = (await response.text()).slice(0, 240); throw Object.assign(new Error(`GitHub ${response.status}: ${body}`), { status: response.status }); }
      return response.text();
    },
    async listFiles(ref: string, filter: (path: string) => boolean): Promise<string[]> {
      const data = await (await request(`${base}/git/trees/${encodeURIComponent(ref)}?recursive=1`)).json() as any;
      return (data.tree ?? []).filter((entry: any) => entry.type === "blob" && filter(entry.path)).map((entry: any) => entry.path);
    },
    async commitFiles(params: { parentSha: string; baseTreeSha: string; files: Record<string, string>; message: string; author: { name: string; email: string } }) {
      const entries = await Promise.all(Object.entries(params.files).map(async ([path, content]) => {
        const blob = await (await request(`${base}/git/blobs`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, encoding: "utf-8" }) })).json() as any;
        return { path, mode: "100644", type: "blob", sha: blob.sha };
      }));
      const tree = await (await request(`${base}/git/trees`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ base_tree: params.baseTreeSha, tree: entries }) })).json() as any;
      const commit = await (await request(`${base}/git/commits`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: params.message, tree: tree.sha, parents: [params.parentSha], author: params.author }) })).json() as any;
      await request(`${base}/git/refs/heads/${encodeURIComponent(opts.branch)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sha: commit.sha, force: false }) });
      return commit.sha;
    },
    async deploymentState(sha: string): Promise<"pending" | "success" | "failure" | "unknown"> {
      const data = await (await request(`${base}/deployments?sha=${encodeURIComponent(sha)}`)).json() as any[];
      if (!data.length) return "pending";
      const deployment = data.find(d => d.environment === "Production") ?? data[0];
      const statuses = await (await request(`${base}/deployments/${deployment.id}/statuses`)).json() as any[];
      if (!statuses.length) return "pending";
      const state = statuses[0].state;
      if (state === "success") return "success";
      if (state === "failure" || state === "error") return "failure";
      return "pending";
    },
  };
}
