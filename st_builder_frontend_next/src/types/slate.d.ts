import { BaseElement } from 'slate';

declare module 'slate' {
  interface CustomElement {
    type: string;
    children: Descendant[];
  }

  interface CustomTypes {
    Element: CustomElement;
  }
}