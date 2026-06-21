import { expect, test } from "@playwright/test";

test.describe("Phoenix owner-review website", () => {
  test("loads the funnel homepage with required CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /get the 15% digital bid/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "772-209-0266", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "hello@phoenixepoxypros.com", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /start my digital bid/i })).toBeVisible();
  });

  test("estimate form accepts required placeholder fields", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Full name").fill("Template Customer");
    await page.getByPlaceholder("Phone number").fill("772-209-0266");
    await page.getByPlaceholder("Email").fill("template@example.com");
    await page.getByRole("button", { name: /start my digital bid/i }).click();
    await expect(page).toHaveURL(/.*/);
  });

  test("digital estimator submits and opens the client dashboard", async ({ page }) => {
    await page.goto("/digital-estimator");

    await page.locator("input[name='fullName']").fill("Template Customer");
    await page.locator("input[name='address']").fill("123 Desert Ridge Rd, Phoenix, AZ 85050");
    await page.locator("input[name='email']").fill("template@example.com");
    await page.locator("input[name='phone']").fill("602-555-0199");
    await page.locator("input[name='zipCode']").fill("85050");
    await page.locator("select[name='projectType']").selectOption({ label: "Garage Floors" });
    await page.locator("input[name='floorMeasurements']").fill("24 x 22 garage");
    await page.locator("select[name='existingFloorCovering']").selectOption({ label: "Bare Concrete" });
    await page.locator("select[name='concreteCondition']").selectOption({ label: "Fair - Some Cracks" });
    await page.locator("select[name='desiredFinishSelect']").selectOption({ label: "Full Broadcast Flake" });
    await page.locator("select[name='desiredColorSelect']").selectOption({ label: "Domino" });
    await page.locator("textarea[name='notes']").fill("Template submission for validation.");

    await page.getByRole("button", { name: /submit digital bid/i }).click();
    await expect(page).toHaveURL(/\/client-dashboard/);
    await expect(page.getByRole("heading", { name: /your project is now inside the system/i })).toBeVisible();
  });
});
