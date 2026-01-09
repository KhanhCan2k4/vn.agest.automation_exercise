import { SelectionHelper } from "./src/helpers/selection.helper";

class App {
    constructor() {
        // const csv = new CSV();
        // console.log(csv.ReadCSV('./data/random_levels.csv'));
        const selection = new SelectionHelper().convertCsvToSelection('./data/testcases.csv');
        console.log(selection);
    }
}

new App();