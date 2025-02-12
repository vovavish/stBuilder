import { Element, ROOT_NODE, useEditor } from '@craftjs/core';
import { Button as ShadCNButton } from './ui/button';
import { Button } from '@/components/user-blocks/Button';
import { Text } from '@/components/user-blocks/Text';
import { Card } from '@/components/user-blocks/Card';
import { Container } from '@/components/user-blocks/Container';

export const Toolbox = () => {
  const { connectors, actions, query } = useEditor();
  
  const handleClick = () => {
    const nodeTree = query.parseReactElement(<Text
      text={`lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
      fontSize={20}
      paggingY={100}
      textAlign="center"
      maxWidth={500}
    />).toNodeTree();
    console.log(nodeTree)
    actions.addNodeTree(nodeTree, ROOT_NODE);
  }

  return (
    <div className="p-2 flex flex-col items-center">
      <div className="flex gap-4">
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref) connectors.create(ref, <Button size="sm">Click me</Button>);
            }}
            variant="default"
          >
            Кнопка
          </ShadCNButton>
        </div>
        <div>
          <ShadCNButton
            onClick={handleClick}
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Text
                    text={`lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                    fontSize={20}
                    paggingY={100}
                    textAlign="center"
                    maxWidth={500}
                  />,
                );
            }}
            variant="default"
          >
            Текст
          </ShadCNButton>
        </div>
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Element is={Container} paddingY={20} background="#999" canvas />,
                );
            }}
            variant="default"
          >
            Контейнер
          </ShadCNButton>
        </div>
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref) connectors.create(ref, <Card background="#999" />);
            }}
            variant="default"
          >
            Карточка
          </ShadCNButton>
        </div>
      </div>
    </div>
  );
};
