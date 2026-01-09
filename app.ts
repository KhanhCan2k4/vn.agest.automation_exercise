import { SelectionHelper } from "./src/helpers/selection.helper";
import inputData from "./data/input-data.json";
import { join } from "path";
import testCases from "./data/testcases.json";
import { TestCase } from "./src/models/testcase.model";

const selectionHelper = new SelectionHelper();

const selectionPath = join(
  process.cwd(),
  inputData.targetFolder,
  inputData.targetTestCaseFileName + ".csv"
);
const selections = selectionHelper.convertCsvToSelection(
  "./data/select_testcase.csv"
);

const checkedSelections = selectionHelper.getCheckedSelectionsByLevel(
  selections,
  inputData.filterLevel
);

const _testCases = testCases.map((tc: any) => {
  const testCase = new TestCase();
  testCase.id = tc.id;
  testCase.name = tc.name;
  testCase.content = tc.content;
  return testCase;
});

for (const testCase of _testCases) {
  console.log(testCase.toString());
}
