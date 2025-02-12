import React, { FC } from "react";
import { useNode, Element, Node } from "@craftjs/core";

import { Text } from "./Text";
import { Container, ContainerDefaultProps, ContainerSettings } from "./Container";

interface CardTopProps {
  children: React.ReactNode;
}

interface CraftRules {
  canMoveIn?: (incomingNodes: Node[]) => boolean;
}

export const CardTop: FC<CardTopProps> & { craft?: { rules?: CraftRules } } = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div ref={ref => connect(ref as HTMLDivElement)} className="text-only">
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: Node[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
};

interface CardBottomProps {
  children: React.ReactNode;
}

export const CardBottom: FC<CardBottomProps> & { craft?: { rules?: CraftRules } } = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();

  return <div ref={(ref) => connect(ref as HTMLDivElement)}>{children}</div>;
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes: Node[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
};

interface CardProps {
  background: string;
  padding?: number;
}

export const Card: FC<CardProps> & { craft: { props: typeof ContainerDefaultProps, related: { settings: typeof ContainerSettings } } } = ({ background, padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} textAlign="center"/>
        <Text text="Subtitle" fontSize={15} textAlign="left"/>
      </Element>
    </Container>
  );
};

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
}