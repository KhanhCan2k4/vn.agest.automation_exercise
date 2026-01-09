import {readFileSync} from 'fs';
import { Selection } from "../models/selection.model";
import inputData from "../../data/input-data.json";
import { TestCase } from '../models/testcase.model';

export class SelectionHelper {

    convertCsvToSelection(filePath: string): Selection[] {

        const fileContent = readFileSync(filePath, "utf-8");
        const selections: Selection[] = [];
        const csvRows = fileContent.split('\n');
        const headers = csvRows[0];

        csvRows.forEach((row, index) => {
            if (index != 0){
                headers.split(',').forEach((header, index) =>{
                    if (index != 0 && row.split(',')[0]){
                        selections.push(new Selection(
                            row.split(',')[0],
                            header,
                            row.split(',')[index] == inputData.selectSymbol
                        ));
                    }
                });
            }
        });
        
        return selections;
    }

    getCheckedSelectionsByLevel(selections: Selection[], levelName: string): Selection[] {
        return selections.filter((selection) =>
            selection.levelName === levelName && selection.isSelected
        );
    }

    getTestcaseByLevel(testcases: TestCase[],selections: Selection[], levelName: string): TestCase[] {
        const checkedSelections = this.getCheckedSelectionsByLevel(selections, levelName);
        const testcaseIds = checkedSelections.map(selection => selection.testcaseID);
        return testcases.filter(testcase =>
            testcaseIds.includes(testcase.id)
        );
    }
}


