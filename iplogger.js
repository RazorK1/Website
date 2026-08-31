// Cloudfare Worker
export default {
  async fetch(request, env) {
    const ip = request.headers.get("CF-Connecting-IP");
    const userAgent = request.headers.get("User-Agent");
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "unknown";
    const timestamp = new Date().toISOString();

    // Insert into cloudflare database
    await env.DB.prepare(
      `INSERT INTO logs (ip, page, user_agent, timestamp)
       VALUES (?, ?, ?, ?)`
    )
    .bind(ip, page, userAgent, timestamp)
    .run();

    return new Response("Logged", { status: 200 });
  }
};

