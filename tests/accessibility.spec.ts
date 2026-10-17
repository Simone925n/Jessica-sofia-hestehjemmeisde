import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("grundlæggende WCAG-kontrol på hovedsider", async ({ page }) => {
  for (const path of [
    "/",
    "/islandshesten",
    "/hestene",
    "/hestene/freja",
    "/quiz",
    "/rideture",
    "/om",
    "/kontakt",
    "/privatliv",
  ]) {
    await page.goto(`/Jessica-sofia-hestehjemmeisde${path}`);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ html: n.html, reason: n.failureSummary })),
      })),
      path,
    ).toEqual([]);
  }
});
test("smal mobil og tablet uden vandret overløb", async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/rideture",
      "/quiz",
      "/kontakt",
      "/hestene/freja",
    ]) {
      await page.goto(`/Jessica-sofia-hestehjemmeisde${path}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} ved ${width}px`,
      ).toBe(true);
    }
  }
});
