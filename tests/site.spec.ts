import { test, expect } from "@playwright/test";
import { questions } from "../src/data/quiz";
test("alle sider, billeder og profiler vises uden browserfejl eller vandret overløb", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of [
    "/",
    "/islandshesten",
    "/hestene",
    "/hestene/freja",
    "/hestene/stormur",
    "/hestene/luna",
    "/quiz",
    "/rideture",
    "/om",
    "/kontakt",
    "/privatliv",
    "/ukendt",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
test("quiz afsluttes med korrekt score, låste svar og genstart", async ({
  page,
}) => {
  await page.goto("/quiz");
  await page.getByRole("button", { name: "Start quizzen" }).click();
  for (let i = 0; i < questions.length; i++) {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      questions[i].question,
    );
    await expect(page.getByRole("status")).toHaveCount(0);
    await page.locator(".answer").nth(questions[i].correct).click();
    await expect(page.getByRole("status")).toContainText("Helt rigtigt.");
    for (const answer of await page.locator(".answer").all())
      await expect(answer).toBeDisabled();
    await page
      .getByRole("button", {
        name:
          i === questions.length - 1 ? "Se dit resultat" : "Næste spørgsmål",
      })
      .click();
  }
  await expect(page.locator(".result-score")).toHaveText("15af 15 rigtige");
  await page.getByRole("button", { name: "Prøv igen" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    questions[0].question,
  );
  await page.locator(".answer").nth(1).click();
  await expect(page.getByRole("status")).toContainText("Et godt forsøg.");
});
test("booking validerer felter, opdaterer beløb og afslutter ærligt uden netværk", async ({
  page,
}) => {
  await page.goto("/rideture?tur=nature");
  await expect(page.locator(".booking-summary h3")).toHaveText(
    "Ud i det grønne",
  );
  await page.getByRole("button", { name: "Fortsæt", exact: true }).click();
  await page.getByRole("button", { name: "Fortsæt", exact: true }).click();
  await expect(page.getByLabel("Ønsket dato")).toBeVisible();
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const future = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  await page.getByLabel("Ønsket dato").fill(future);
  await page.getByLabel("Eksempeltidspunkt").selectOption("13:00");
  await page.getByLabel("Antal deltagere").selectOption("2");
  await expect(page.locator(".summary-total")).toContainText("1.100");
  await page.getByRole("button", { name: "Fortsæt", exact: true }).click();
  await page.getByLabel("Navn", { exact: true }).fill("Demo Anna");
  await page.getByLabel("E-mail", { exact: true }).fill("ugyldig");
  await page.getByRole("button", { name: "Fortsæt", exact: true }).click();
  await expect(page.getByLabel("E-mail", { exact: true })).toBeVisible();
  await page.getByLabel("E-mail", { exact: true }).fill("anna@example.com");
  await page.getByRole("button", { name: "Fortsæt", exact: true }).click();
  await expect(page.locator(".review-list")).toContainText("Demo Anna");
  const sent: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") sent.push(r.url());
  });
  await page.getByRole("button", { name: "Afslut demonstration" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Der er ikke foretaget en reservation.",
  );
  expect(sent).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  await page.getByRole("button", { name: "Prøv forfra" }).click();
  await expect(
    page.getByRole("heading", { name: "Hvilken oplevelse drømmer du om?" }),
  ).toBeVisible();
});
test("kontakt validerer og sender ingen besked", async ({ page }) => {
  await page.goto("/kontakt");
  await page.getByRole("button", { name: "Afprøv formular" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Navn", { exact: true }).fill("Demo");
  await page.getByLabel("E-mail", { exact: true }).fill("demo@example.com");
  await page.getByLabel("Emne", { exact: true }).fill("En prøvetur");
  await page.getByLabel("Din besked").fill("Dette er kun en testbesked.");
  await page.getByRole("button", { name: "Afprøv formular" }).click();
  await expect(page.getByRole("status")).toContainText(
    "din besked er ikke sendt",
  );
});
test("fakta og gangarter fungerer med tastatur", async ({ page }) => {
  await page.goto("/islandshesten");
  await page.locator(".fact summary").first().click();
  await expect(page.locator(".fact").first()).toHaveAttribute("open", "");
  await page.getByRole("tab", { name: "04 Tölt" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Tölt er en jævn");
  await page.getByRole("tab", { name: "04 Tölt" }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: "05 Pas" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
test("navigation åbner sider og mobilmenu kan lukkes med Escape", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Åbn menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobilnavigation" })
      .getByRole("link", { name: "Mød hestene" })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Små heste. Store personligheder.",
    );
    await page.getByRole("button", { name: "Åbn menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Åbn menu" })).toBeFocused();
  } else {
    await page
      .getByRole("navigation", { name: "Hovednavigation" })
      .getByRole("link", { name: "Mød hestene" })
      .click();
  }
  await page.locator(".horse-card").first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Freja");
});
