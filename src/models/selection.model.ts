export class Selection {
    private _testcaseId: string;
    private _levelName: string;
    private _isSelected: boolean;
    
    constructor(testcaseId: string, levelName: string, isSelected: boolean) {
        this._testcaseId = testcaseId;
        this._levelName = levelName;
        this._isSelected = isSelected;
    }

    public get testcaseID(): string {
        return this._testcaseId;
    }

    public get levelName(): string {
        return this._levelName;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set testcaseID(value: string) {
        this._testcaseId = value;
    }

    public set levelName(value: string) {
        this._levelName = value;
    }

    public set isSelected(value: boolean) {
        this._isSelected = value;
    }

    public toJSON(): object {
        return {
        testcaseId: this._testcaseId,
        levelName: this._levelName,
        isSelected: this._isSelected,
        };
    }
}