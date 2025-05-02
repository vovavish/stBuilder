import { Descendant, BaseElement, BaseText } from 'slate';
import { CSSProperties } from 'react';

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type CustomElement = {
  type: 'paragraph' | 'heading';
  children: CustomText[];
};

interface RenderSlateProps {
  value: Descendant[];
  style?: CSSProperties;
}

export function renderSlateToReact({ value, style }: RenderSlateProps): React.ReactNode {
  return value.map((node, i) => renderNode(node as CustomElement, i, style));
}

function renderNode(node: CustomElement, key: number, style?: CSSProperties): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} style={{ ...style }}>
          {node.children.map((n, i) => renderLeaf(n, i))}
        </p>
      );
    case 'heading':
      return (
        <h2 key={key} style={{ ...style }}>
          {node.children.map((n, i) => renderLeaf(n, i))}
        </h2>
      );
    default:
      return (
        <div key={key} style={{ ...style }}>
          {node.children.map((n, i) => renderLeaf(n, i))}
        </div>
      );
  }
}

function renderLeaf(leaf: CustomText, key: number) {
  if (!leaf.text || leaf.text === '' || leaf.text.trim() === '') {
    return <br key={key} />;
  }

  let content = <span key={key}>{leaf.text}</span>;

  if (leaf.bold) content = <strong key={key}>{content}</strong>;
  if (leaf.italic) content = <em key={key}>{content}</em>;
  if (leaf.underline) content = <u key={key}>{content}</u>;

  return content;
}