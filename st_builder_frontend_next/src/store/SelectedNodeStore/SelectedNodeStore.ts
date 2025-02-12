import { makeAutoObservable } from "mobx";
type selectedNode = {
  id: string;
  name: string;
  settings: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
  isDeletable: boolean;
} | undefined

export class SelectedNodeStore {
  private _selectedNode: selectedNode = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedNode() {
    return this._selectedNode;
  }

  set selectedNode(selectedNode: selectedNode) {
    this._selectedNode = selectedNode;
  }
}
