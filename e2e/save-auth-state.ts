/**
 * Helper script to capture auth state from the running MCP browser session.
 * Run with: npx tsx e2e/save-auth-state.ts
 *
 * For first-time setup or when session expires, use the headed auth setup instead:
 *   npx playwright test --project=setup --headed
 */
import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, ".auth", "user.json");

async function saveAuthState() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:3000/login");

  console.log("Please complete Google OAuth login in the browser window...");
  console.log("Waiting for redirect to homepage (timeout: 2 min)...");

  await page.waitForURL("http://localhost:3000/", { timeout: 120_000 });

  console.log("Login successful! Saving auth state...");

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await context.storageState({ path: authFile });

  console.log(`Auth state saved to: ${authFile}`);

  await browser.close();
}

saveAuthState().catch(console.error);
