import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { navigation } from "./src/data/business";
import { horses } from "./src/data/horses";

// Pages serves real files, so give every React route its own HTML entry point.
function pageEntries(): Plugin {
  return {
    name: "github-pages-route-entries",
    apply: "build",
    writeBundle(output) {
      const directory = resolve(output.dir || "dist");
      const routes = [
        ...navigation.map(([path]) => path),
        "/privatliv",
        ...horses.map((horse) => `/hestene/${horse.slug}`),
      ];
      for (const route of routes.filter((path) => path !== "/")) {
        const target = resolve(directory, `.${route}`);
        mkdirSync(target, { recursive: true });
        copyFileSync(
          resolve(directory, "index.html"),
          resolve(target, "index.html"),
        );
      }
      // Unknown paths still render the site's existing Danish not-found page.
      copyFileSync(
        resolve(directory, "index.html"),
        resolve(directory, "404.html"),
      );
    },
  };
}

export default defineConfig({
  base: "/Jessica-sofia-hestehjemmeisde/",
  plugins: [react(), tailwindcss(), pageEntries()],
});
