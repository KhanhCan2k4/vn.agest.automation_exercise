import { SelectionHelper } from "./src/helpers/selection.helper";
import inputData from "./data/input-data.json";
import { join } from "path";

const selectionHelper = new SelectionHelper();

const selectionPath = join(
  process.cwd(),
  inputData.targetFolder,
  inputData.targetTestCaseFileName + ".csv"
);

const selections = selectionHelper.convertCsvToSelection(selectionPath);

const checkedSelections = selectionHelper.getCheckedSelections(selections);

const testCases = selectionHelper.getTestcaseByLevel(
  checkedSelections,
  inputData.filterLevel
);

for (const testCase of testCases) {
  console.log(testCase.toString());
}
