export class Selection {
    private _testcaseId: string;
    private _levelName: string;
    private _isChecked: boolean;
    
    constructor(testcaseId: string, levelName: string, isChecked: boolean) {
        this._testcaseId = testcaseId;
        this._levelName = levelName;
        this._isChecked = isChecked;
    }

    public get testcaseID(): string {
        return this._testcaseId;
    }

    public get level(): string {
        return this._levelName;
    }

    public get isSelected(): boolean {
        return this._isChecked;
    }

    public set testcaseID(value: string) {
        this._testcaseId = value;
    }

    public set level(value: string) {
        this._levelName = value;
    }

    public set isSelected(value: boolean) {
        this._isChecked = value;
    }
}