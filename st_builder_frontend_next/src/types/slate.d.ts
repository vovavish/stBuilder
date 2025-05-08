// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { BaseElement } from 'slate';

declare module 'slate' {
  interface CustomElement {
    type: string;
    children: Descendant[];
  }

  interface CustomTypes {
    Element: CustomElement;
  }
}