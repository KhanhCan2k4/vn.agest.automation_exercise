export class TestCase {
  private _id: string;
  private _name: string;
  private _content: string;

  constructor() {
    this._id = "";
    this._name = "";
    this._content = "";
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
}
