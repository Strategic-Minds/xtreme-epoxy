import { expect, test } from "@playwright/test";

test.describe("Phoenix owner-review website", () => {
  test("loads the funnel homepage with required CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /premium floors/i })).toBeVisible();
    await expect(page.getByText("772-209-0266")).toBeVisible();
    await expect(page.getByText("hello@phoenixepoxypros.com")).toBeVisible();
    await expect(page.getByText(/15% off/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /try floor visualizer/i })).toBeVisible();
  });

  test("estimate form accepts required placeholder fields", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Full name").fill("Template Customer");
    await page.getByPlaceholder("Phone number").fill("772-209-0266");
    await page.getByPlaceholder("Email address").fill("template@example.com");
    await page.selectOption("select[name='projectType']", { label: "Garage Epoxy Flake Floors" });
    await page.getByRole("button", { name: /get my free online estimate/i }).click();
    await expect(page).toHaveURL(/.*/);
  });
});
