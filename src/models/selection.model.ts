export class Selection {
    private testcaseId: string;
    private levelName: string;
    private isChecked: boolean;
    
    constructor(testcaseId: string, levelName: string, isChecked: boolean) {
        this.testcaseId = testcaseId;
        this.levelName = levelName;
        this.isChecked = isChecked;
    }

    public get testcaseID(): string {
        return this.testcaseId;
    }

    public get level(): string {
        return this.levelName;
    }

    public get isSelected(): boolean {
        return this.isChecked;
    }
}