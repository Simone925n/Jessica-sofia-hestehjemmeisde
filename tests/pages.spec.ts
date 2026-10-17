import { test, expect } from "@playwright/test";
import { navigation } from "../src/data/business";
import { horses } from "../src/data/horses";
const base = "http://127.0.0.1:4180/Jessica-sofia-hestehjemmeisde";

test("Pages: direkte links og genindlæsning på alle statiske sider", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    ...navigation.map(([path]) => path),
    "/privatliv",
    ...horses.map((h) => `/hestene/${h.slug}`),
  ]) {
    const response = await page.goto(`${base}${path}`);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).not.toHaveTitle(/Siden findes ikke/);
    const heading = await page.locator("h1").innerText();
    const refreshed = await page.reload();
    expect(refreshed?.status(), path).toBe(200);
    await expect(page.locator("h1")).toHaveText(heading, {
      useInnerText: true,
    });
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(await image.getAttribute("src")).toContain(
        "/Jessica-sofia-hestehjemmeisde/",
      );
    }
  }
  expect(errors).toEqual([]);
});

test("Pages: navigation, quiz, bookingvalg og 404 under repository-stien", async ({
  page,
}, info) => {
  await page.goto(`${base}/`);
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Åbn menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobilnavigation" })
      .getByRole("link", { name: "Mød hestene" })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Hovednavigation" })
      .getByRole("link", { name: "Mød hestene" })
      .click();
  }
  await page.locator(".horse-card").first().click();
  await expect(page).toHaveURL(`${base}/hestene/freja`);
  await expect(page.locator("h1")).toHaveText("Freja");
  await page.reload();
  await expect(page).toHaveTitle(/Freja/);
  await page.goto(`${base}/quiz/`);
  await page.getByRole("button", { name: "Start quizzen" }).click();
  await page.locator(".answer").first().click();
  await expect(page.getByRole("status")).toContainText("Helt rigtigt.");
  await page.goto(`${base}/rideture?tur=nature`);
  await expect(page.locator(".booking-summary h3")).toHaveText(
    "Ud i det grønne",
  );
  expect(new URL(page.url()).searchParams.get("tur")).toBe("nature");
  const missing = await page.goto(`${base}/findes-ikke`);
  expect(missing?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Her ender stien.");
});
