import { Locator, Page } from "@playwright/test";
import { TestCase } from "../models/testcase.model";

export class TestCasesPage {
  private static ROUTE = "/test_cases";
  private page: Page;
  private panelGroupsLocator: Locator;
  private testcaseLinkLocator: Locator;
  private stepListLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.panelGroupsLocator = page.locator(
      "//div[contains(@class, 'panel-group')]"
    );
    this.testcaseLinkLocator = page
      .getByRole("link")
      .filter({ hasText: /Test Case \d*/ });
    this.stepListLocator = page.locator("//ul[contains(@class, 'list-group')]");
  }

  async goto() {
    await this.page.goto(TestCasesPage.ROUTE);
  }

  async getTestCaseList(): Promise<TestCase[]> {
    const testCases: TestCase[] = [];

    const panelGroups = await this.panelGroupsLocator.all();

    for (const panelGroup of panelGroups) {
      const link = panelGroup.locator(this.testcaseLinkLocator);

      if ((await link.count()) > 0) {
        const _testCase = await link.evaluate((link) => {
          const [longId, name] = link.textContent.split(": ");
          const id = longId.replace("Test Case ", "TC").trim();
          return { id, name };
        });

        const content = await panelGroup
          .locator(this.stepListLocator)
          .evaluate((panel) =>
            panel.textContent.replace(/\t/g, "").replace(/ +/g, " ").trim()
          );

        const testCase = new TestCase();
        testCase.id = _testCase.id;
        testCase.name = _testCase.name;
        testCase.content = content;

        testCases.push(testCase);
      }
    }

    return testCases;
  }
}
