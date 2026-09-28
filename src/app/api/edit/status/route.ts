import { NextResponse } from "next/server";
import { isEditor } from "@/lib/site-editor/session";
import { makeGitHub } from "@/lib/site-editor/github";
import { editBranch } from "@/lib/site-editor/publish";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isEditor())) return NextResponse.json({ state: "unknown" }, { status: 401 });
  const sha = new URL(req.url).searchParams.get("sha") ?? "";
  if (!/^[0-9a-f]{40}$/.test(sha)) return NextResponse.json({ state: "unknown" }, { status: 400 });
  const gh = makeGitHub({ token: process.env.GITHUB_TOKEN ?? "", owner: "NBBallet", repo: "artem-site", branch: editBranch() });
  try {
    return NextResponse.json({ state: await gh.deploymentState(sha) });
  } catch {
    return NextResponse.json({ state: "unknown" });
  }
}
