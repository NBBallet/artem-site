/** Retries a Notion API call once after a short delay — guards against transient rate-limit/network blips. */
export async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[notion] request failed, retrying once:", err);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return fn();
  }
}
