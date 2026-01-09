export class TestCase {
  private _id: string;
  private _name: string;
  private _content: string;

  constructor(object: any) {
    this._id = object.id ?? "";
    this._name = object.name ?? "";
    this._content = object.content ?? "";
  }

  public set id(value: string) {
    this._id = value;
  }

  public get id() {
    return this._id;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set content(value: string) {
    this._content = value;
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      content: this._content,
    };
  }

  public toString(): string {
    return `--------------------------------------------------------------------------------------------------------------\n
| Test Case ID:\t\t${this._id}\n
| Test Name:\t\t${this._name}\n
| Steps:\n
${this._content}
--------------------------------------------------------------------------------------------------------------
    `;
  }
}
