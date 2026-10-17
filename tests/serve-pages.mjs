// Strict static hosting for Pages tests: no Vite SPA fallback or route rewrites.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
const base = "/Jessica-sofia-hestehjemmeisde/";
const root = resolve("dist");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:4180");
  try {
    if (!url.pathname.startsWith(base)) throw new Error("Outside mount");
    let file = resolve(
      root,
      decodeURIComponent(url.pathname.slice(base.length)),
    );
    if (file !== root && !file.startsWith(root + "/"))
      throw new Error("Outside root");
    if ((await stat(file)).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(301, { Location: url.pathname + "/" + url.search });
        return res.end();
      }
      file = resolve(file, "index.html");
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(await readFile(resolve(root, "404.html")));
  }
}).listen(4180, "127.0.0.1");
