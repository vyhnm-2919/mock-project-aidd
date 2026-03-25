import { test, expect } from "@playwright/test";

test.describe("Floating Action Button (FAB)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for FAB to be visible (collapsed state)
    await page.waitForSelector('[aria-haspopup="true"]', { state: "visible" });
  });

  test("T028: click FAB trigger expands menu with 3 buttons", async ({
    page,
  }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    // Verify expanded state
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Verify 3 action elements are visible: Thể lệ, Viết KUDOS, Close
    const theLe = page.getByRole("link", { name: /Thể lệ|Rules/ });
    const vietKudos = page.getByRole("link", { name: /Viết KUDOS|Write KUDOS/ });
    const closeBtn = page.getByRole("button", { name: /Đóng|Close/ });

    await expect(theLe).toBeVisible();
    await expect(vietKudos).toBeVisible();
    await expect(closeBtn).toBeVisible();
  });

  test("T029: click Thể lệ navigates to /rules", async ({ page }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    const theLe = page.getByRole("link", { name: /Thể lệ|Rules/ });
    await theLe.click();

    await expect(page).toHaveURL(/\/rules/);
  });

  test("T030: click Viết KUDOS navigates to /kudos/write", async ({
    page,
  }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    const vietKudos = page.getByRole("link", { name: /Viết KUDOS|Write KUDOS/ });
    await vietKudos.click();

    await expect(page).toHaveURL(/\/kudos\/write/);
  });

  test("T031: click close button collapses FAB", async ({ page }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    const closeBtn = page.getByRole("button", { name: /Đóng|Close/ });
    await closeBtn.click();

    // Trigger should be visible again (collapsed state)
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    // Close button should not be interactable
    await expect(closeBtn).not.toBeVisible();
  });

  test("T032: click outside FAB auto-closes", async ({ page }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    // Verify expanded
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Click outside the FAB container
    await page.locator("body").click({ position: { x: 10, y: 10 } });

    // Should collapse
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("T033: Escape key closes FAB and returns focus to trigger", async ({
    page,
  }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    // Verify expanded
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Press Escape
    await page.keyboard.press("Escape");

    // Should collapse
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Focus should return to trigger button
    await expect(trigger).toBeFocused();
  });

  test("T034: route change auto-closes FAB", async ({ page }) => {
    const trigger = page.locator('[aria-haspopup="true"]');
    await trigger.click();

    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Navigate to a different page
    await page.goto("/rules");
    await page.waitForLoadState("networkidle");

    // FAB should be in collapsed state on the new page
    const newTrigger = page.locator('[aria-haspopup="true"]');
    await expect(newTrigger).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("FAB Visual Verification (T027)", () => {
  const viewports = [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1024, height: 768 },
    { name: "xl", width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`screenshot at ${vp.name} (${vp.width}px) — collapsed`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.waitForSelector('[aria-haspopup="true"]', {
        state: "visible",
      });

      const fab = page.locator('[role="group"]');
      await expect(fab).toHaveScreenshot(`fab-collapsed-${vp.name}.png`);
    });

    test(`screenshot at ${vp.name} (${vp.width}px) — expanded`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      const trigger = page.locator('[aria-haspopup="true"]');
      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");

      // Wait for animation to complete
      await page.waitForTimeout(300);

      const fab = page.locator('[role="group"]');
      await expect(fab).toHaveScreenshot(`fab-expanded-${vp.name}.png`);
    });
  }
});
