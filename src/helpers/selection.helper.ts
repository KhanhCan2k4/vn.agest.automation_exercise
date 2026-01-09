import { readFileSync } from "fs";
import { Selection } from "../models/selection.model";
import inputData from "../../data/input-data.json";
import { TestCase } from "../models/testcase.model";
import inputTestCases from "../../data/testcases.json";

export class SelectionHelper {
  convertCsvToSelection(filePath: string): Selection[] {
    const fileContent = readFileSync(filePath, "utf-8");
    const selections: Selection[] = [];
    const csvRows = fileContent.split("\n");
    const headers = csvRows[0];

    csvRows.forEach((row, index) => {
      if (index != 0) {
        headers.split(",").forEach((header, index) => {
          if (index != 0 && row.split(",")[0]) {
            selections.push(
              new Selection(
                row.split(",")[0],
                header,
                row.split(",")[index] == inputData.selectSymbol
              )
            );
          }
        });
      }
    });

    return selections;
  }

  getCheckedSelections(selections: Selection[]): Selection[] {
    return selections.filter((selection) => selection.isSelected);
  }

  getTestcaseByLevel(selections: Selection[], levelName: string): TestCase[] {
    selections = this.getCheckedSelections(selections);
    const filter = selections.filter(
      (selection) => selection.level === levelName
    );
    const testcases = inputTestCases.map((testcase) => new TestCase(testcase));

    const result: TestCase[] = [];

    for (const item of filter) {
      const testcaseData = testcases.find(
        (tc: TestCase) => tc.id === item.testcaseID
      );
      if (testcaseData) {
        result.push(testcaseData);
      }
    }

    return result;
  }
}
