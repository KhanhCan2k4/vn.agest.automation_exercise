import { writeFileSync } from "fs";
import { join } from "path";

export class FileHelper {
  private baseFolder: string;

  constructor(baseFolder: string) {
    this.baseFolder = baseFolder;
  }

  private getFilePath(fileName: string): string {
    return join(process.cwd(), this.baseFolder, fileName);
  }

  writeToFile(fileName: string, data: any | Array<Array<any>>) {
    const fileType = fileName.split(".").pop();
    const filePath = this.getFilePath(fileName);

    switch (fileType) {
      case "json":
        this.writeToJsonFile(filePath, data);
        break;
      case "csv":
        this.writeToCSVFile(filePath, data as Array<Array<any>>);
        break;
      default:
        throw new Error("File type is not supported");
    }
  }

  private writeToJsonFile(filePath: string, data: any): boolean {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      writeFileSync(filePath, jsonString, "utf8");
      return true;
    } catch (error) {
      console.error("Error writing JSON to file:", error);
      return false;
    }
  }

  private writeToCSVFile(filePath: string, data: Array<Array<any>>): boolean {
    try {
      let csvString = data
        .map((row) => {
          return row.join(";") + "\n";
        })
        .join("");

      writeFileSync(filePath, csvString, "utf8");
      return true;
    } catch (error) {
      console.error("Error writing CSV to file:", error);
      return false;
    }
  }


}
