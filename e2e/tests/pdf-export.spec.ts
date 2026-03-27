import { test, expect } from "@playwright/test";
import { seedResumes } from "../fixtures/seed-localstorage";
import { TEST_RESUME, EXPECTED } from "../fixtures/test-resume";
import { extractTextFromDownload } from "../helpers/pdf-extractor";
import { assertResumeContent } from "../helpers/content-assertions";

test.describe("PDF Export", () => {
  test.beforeEach(async ({ page }) => {
    await seedResumes(page, [TEST_RESUME]);
    await page.goto(`/editor/${TEST_RESUME.id}`);
    await page.waitForSelector(`text=${EXPECTED.fullName}`, { timeout: 15_000 });
  });

  test("downloads a PDF file with the correct filename", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe("Test_Resume.pdf");
  });

  test("PDF contains the full name", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;

    const pdfText = await extractTextFromDownload(download);
    expect(pdfText.toLowerCase()).toContain(EXPECTED.fullName.toLowerCase());
  });

  test("PDF contains all experience entries", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;

    const pdfText = await extractTextFromDownload(download);
    for (const company of EXPECTED.companies) {
      expect(pdfText.toLowerCase()).toContain(company.toLowerCase());
    }
  });

  test("PDF contains education", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;

    const pdfText = await extractTextFromDownload(download);
    for (const school of EXPECTED.schools) {
      expect(pdfText.toLowerCase()).toContain(school.toLowerCase());
    }
  });

  test("PDF contains skills", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;

    const pdfText = await extractTextFromDownload(download);
    for (const skill of EXPECTED.skills) {
      expect(pdfText.toLowerCase()).toContain(skill.toLowerCase());
    }
  });

  test("PDF contains all expected content (comprehensive check)", async ({
    page,
  }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export/i }).click();
    const download = await downloadPromise;

    const pdfText = await extractTextFromDownload(download);
    assertResumeContent(pdfText, EXPECTED, "PDF");
  });
});
