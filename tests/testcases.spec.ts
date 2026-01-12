import test, { expect } from "playwright/test";
import inputData from "../data/input-data.json";
import { TestCasesPage } from "../src/pages/testcases.page";
import { FileHelper } from "../src/helpers/file.helper";

for (let i = 0; i < 5; i++) {
  test(`Track testcases (${i + 1})`, async ({ page }) => {
    const testCasePage = new TestCasesPage(page);
    await testCasePage.goto();

    const testCaseList = await testCasePage.getTestCaseList();

    const fileHelper = new FileHelper(inputData.targetFolder);

    fileHelper.writeToFile(
      inputData.targetTestCaseFileName + ".json",
      testCaseList
    );

    fileHelper.writeToFile(inputData.targetTestCaseFileName + ".csv", [
      [inputData.mainTitle, ...inputData.levels],
      ...testCaseList.map((tc) => [tc.id]),
    ]);

    expect(testCaseList.length).toBeGreaterThan(0);
  });
}
