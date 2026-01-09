import {readFileSync} from 'fs';
import { parse } from "csv-parse/sync";
import { Selection } from "../models/selection.model";
import inputData from "../../data/input-data.json";
import { TestCase } from '../models/testcase.model';

export class SelectionHelper {

    convertCsvToSelection(filePath: string): Selection[] {

        const fileContent = readFileSync(filePath, "utf-8");

        const csvRows = parse<any>(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        const selections: Selection[] = [];

        for (const row of csvRows) {
            const testcaseId: string = row[inputData.mainTitle];

            for (const [levelName, isChecked] of Object.entries(row)) {
                if (levelName !== inputData.mainTitle){
                    selections.push(
                        new Selection(
                            testcaseId,
                            levelName,
                            isChecked == inputData.selectSymbol
                        )
                    );
                }
                
            }
        }
        return selections;
    }

    getCheckedSelectionsByLevel(selections: Selection[], levelName: string): Selection[] {
        return selections.filter((selection) =>
            selection.level === levelName && selection.isSelected
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


