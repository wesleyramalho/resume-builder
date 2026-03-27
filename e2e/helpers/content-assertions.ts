import { expect } from "@playwright/test";
import { normalizeText } from "./pdf-extractor";

interface ExpectedContent {
  fullName: string;
  companies: string[];
  schools: string[];
  skills: string[];
  projectNames?: string[];
}

/**
 * Asserts that a text blob (from preview innerText or PDF extraction)
 * contains all expected resume content.
 */
export function assertResumeContent(
  rawText: string,
  expected: ExpectedContent,
  label: string,
): void {
  const text = normalizeText(rawText);

  expect(text, `${label}: should contain full name`).toContain(
    expected.fullName.toLowerCase(),
  );

  for (const company of expected.companies) {
    expect(text, `${label}: should contain company "${company}"`).toContain(
      company.toLowerCase(),
    );
  }

  for (const school of expected.schools) {
    expect(text, `${label}: should contain school "${school}"`).toContain(
      school.toLowerCase(),
    );
  }

  for (const skill of expected.skills) {
    expect(text, `${label}: should contain skill "${skill}"`).toContain(
      skill.toLowerCase(),
    );
  }

  if (expected.projectNames) {
    for (const project of expected.projectNames) {
      expect(text, `${label}: should contain project "${project}"`).toContain(
        project.toLowerCase(),
      );
    }
  }
}
