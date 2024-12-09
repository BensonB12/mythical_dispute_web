import { describe, it, expect } from "vitest";
import { convertFileToFormData } from "../utils/converter/converter";
import { FormDataKeys } from "../utils/converter/FormDataKeys";

describe("convertFileToFormData", () => {
  it("should create FormData with the report key and value", () => {
    const report = "Test Report";
    const formData = convertFileToFormData(report);

    expect(formData.get(FormDataKeys.REPORT)).toBe(report);
  });

  it("should include the file in the FormData when a file is provided", () => {
    const report = "Test Report";
    const mockFile = new File(["test content"], "test.txt", {
      type: "text/plain",
    });

    const formData = convertFileToFormData(report, mockFile);

    expect(formData.get(FormDataKeys.REPORT)).toBe(report);
    expect(formData.get(FormDataKeys.FILE)).toBe(mockFile);
  });

  it("should not include the file in the FormData when no file is provided", () => {
    const report = "Test Report";
    const formData = convertFileToFormData(report);

    expect(formData.get(FormDataKeys.FILE)).toBeNull();
    expect(formData.get(FormDataKeys.REPORT)).toBe(report);
  });

  it("should handle empty report strings correctly", () => {
    const report = "";
    const formData = convertFileToFormData(report);

    expect(formData.get(FormDataKeys.REPORT)).toBe(report);
  });
});
