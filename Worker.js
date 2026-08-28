// Cloudfare Worker
export default {
  async fetch(request) {
    const ip = request.headers.get("CF-Connecting-IP");
    const userAgent = request.headers.get("User-Agent");
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "unknown";

    console.log(`IP: ${ip}, Page: ${page}, UA: ${userAgent}`);

    return new Response("Logged", { status: 200 });
  }
};
