import { Element, ROOT_NODE, useEditor } from '@craftjs/core';
import { Text } from '@/components/user-blocks/Text';
import { Card } from '@/components/user-blocks/Card';
import { Container } from '@/components/user-blocks/Container';
import { Header_001 } from './user-blocks/Headers/header-001/header-001';

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

export const Toolbox = () => {
  const { connectors, actions, query } = useEditor();
  
  const handleClick = <T extends React.ComponentType<any>>(Component: T, props: ComponentProps<T>) => {
    const nodeTree = query.parseReactElement(<Component {...props} />).toNodeTree();
    console.log(nodeTree);
    actions.addNodeTree(nodeTree, ROOT_NODE);
  }

  return (
    <div className="p-2 flex flex-col items-center">
      <div className="flex gap-4">
        <div>
          <button
            onClick={() => handleClick(Text, {
              text: `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
              fontSize: 20,
              paggingY: 100,
              textAlign: "center",
              maxWidth: 500
            })}
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
            onClick={() => handleClick(Header_001, {
              text_company_name: `Company Name`,
              text_company_slogan: `Bring your business to the next level`,
              text_company_additional: `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
              textSize: 20,
              textColor: "#000",
              backgroundColor: "#999"
            })}
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Header_001
                    text_company_name={`Company Name`}
                    text_company_slogan={`Bring your business to the next level`}
                    text_company_additional={`lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                    textSize={20}
                    textColor="#000"
                    backgroundColor="#999"
                  />,
                );
            }}
          >
            Header-001
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
