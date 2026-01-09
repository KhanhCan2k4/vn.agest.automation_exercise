import {readFileSync} from 'fs';
import { parse } from "csv-parse/sync";
import { Selection } from "../models/selection.model";

export class CSV {
    constructor() {}

    convertCsvToSelection(filePath: string): Selection[] {

        const fileContent = readFileSync(filePath, "utf-8");

        const csvRows = parse<any>(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        const selections: Selection[] = [];

        for (const row of csvRows) {
            const testcaseId: string = row["id"];

            for (const [levelName, isChecked] of Object.entries(row)) {
                if (levelName === "id") continue;

                selections.push(
                    new Selection(
                        testcaseId,
                        levelName,
                        isChecked === "X"
                    )
                );
            }
        }
        return selections;
    }
}


