import { SelectionHelper } from "./src/helpers/selection.helper";
import fs from 'fs';

class App {
    constructor() {
        // const csv = new CSV();
        // console.log(csv.ReadCSV('./data/random_levels.csv'));
        const selection = new SelectionHelper().convertCsvToSelection('./data/testcases.csv');
        console.log(selection);

        // console.log(new Selection());

//         const fileContent = fs.readFileSync('./data/testcase.json', "utf-8");

// // 2. Parse JSON → object
// const data = JSON.parse(fileContent);

//         console.log(JSON.stringify(data));
    }
}

new App();