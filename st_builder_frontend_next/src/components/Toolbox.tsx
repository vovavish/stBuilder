import { Element, ROOT_NODE, useEditor } from '@craftjs/core';
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
          <button
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
          >
            Текст
          </button>
        </div>
        <div>
          <button
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Element is={Container} paddingY={20} background="#999" canvas />,
                );
            }}
          >
            Контейнер
          </button>
        </div>
        <div>
          <button
            ref={(ref) => {
              if (ref) connectors.create(ref, <Card background="#999" />);
            }}
          >
            Карточка
          </button>
        </div>
      </div>
    </div>
  );
};
