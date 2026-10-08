import { describe, expect, it } from "vitest";
import { canDownloadDocument, completionDate, contactMailto, courses, documents, projects, profile } from "../lib/portfolio-data";

describe("portfolio source requirements", () => {
  it("uses Phumlani's exact full name", () => {
    expect(profile.name).toBe("Phumlani Khensani Nkuna");
  });
  it("records the supplied completion date", () => {
    expect(completionDate).toBe("October 6, 2026");
  });
  it("contains exactly the five supplied Google AI courses", () => {
    expect(courses.map(course => course.name)).toEqual(["Introduction to AI", "Maximize Productivity With AI Tools", "Discover the Art of Prompting", "Use AI Responsibly", "Stay Ahead of the AI Curve"]);
  });
  it("provides at least three project placeholders", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });
  it("contains the CV and all six certificate document entries", () => {
    expect(documents).toHaveLength(7);
    expect(documents[0]?.filename).toBe("CV RENEW PK NKUNA.docx");
  });
  it("does not allow downloads without an actual supplied file", () => {
    expect(canDownloadDocument({ name: "CV", filename: "CV.docx", kind: "cv" })).toBe(false);
    expect(canDownloadDocument({ name: "CV", filename: "CV.docx", kind: "cv", url: "/documents/cv.docx" })).toBe(true);
  });
  it("does not invent a contact recipient", () => {
    expect(contactMailto("", "Visitor", "visitor@example.com", "Opportunity", "Hello")).toBeNull();
  });
  it("encodes contact messages for the verified email recipient", () => {
    expect(contactMailto("owner@example.com", "Visitor", "visitor@example.com", "ICT & AI", "Hello")).toContain("mailto:owner@example.com?subject=ICT%20%26%20AI&body=Hello");
  });
});