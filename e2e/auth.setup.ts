import { test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, ".auth", "user.json");

setup("authenticate", async ({ page }) => {
  // Check if auth state already exists and is recent
  const fs = await import("fs");
  if (fs.existsSync(authFile)) {
    const stat = fs.statSync(authFile);
    const ageMs = Date.now() - stat.mtimeMs;
    const oneHour = 60 * 60 * 1000;
    if (ageMs < oneHour) {
      // Reuse existing auth state (less than 1 hour old)
      return;
    }
  }

  // Navigate to login page and wait for manual Google OAuth login
  await page.goto("/login");

  // Wait for successful redirect to homepage after login
  // This gives the tester time to complete Google OAuth manually
  await page.waitForURL("/", { timeout: 120_000 });

  // Save authenticated state
  await page.context().storageState({ path: authFile });
});
