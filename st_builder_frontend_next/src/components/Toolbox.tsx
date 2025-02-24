import { ROOT_NODE, useEditor } from '@craftjs/core';
import { Text } from '@/components/user-blocks/Text';
import { Header_001 } from './user-blocks/Headers/header-001/header-001';
import { Title_001 } from './user-blocks/Titels/title-001/title-001';
import { Advantages_001 } from './user-blocks/Advantages/advantages-001/advantages-001';
import { Model_3D_001 } from './user-blocks/3D-Models/3d-model-001/3d-model-001';

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

export const Toolbox = () => {
  const { connectors, actions, query } = useEditor();

  const handleClick = <T extends React.ComponentType<any>>(
    Component: T,
    props: ComponentProps<T>,
  ) => {
    const nodeTree = query.parseReactElement(<Component {...props} />).toNodeTree();
    console.log(nodeTree);
    actions.addNodeTree(nodeTree, ROOT_NODE);
  };

  return (
    <div className="p-2 flex flex-col items-center">
      <div className="flex gap-4">
        <div>
          <button
            onClick={() =>
              handleClick(Text, {
                text: `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                fontSize: 20,
                paggingY: 100,
                textAlign: 'center',
                maxWidth: 500,
              })
            }
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
            onClick={() =>
              handleClick(Header_001, {
                text_company_name: 'Company Name',
                text_company_slogan: 'Your Slogan Here',
                text_company_additional: 'Additional information',
                backgroundColor: '#282c34',
                textColor: '#ffffff',
                textSize: 40,
                topTextMarginBottom: 20,
                bottomTextMarginTop: 20,
                backgroundImage: '',
                backgroundOpacity: 1,
                backgroundPosition: 'center',
                overlayColor: '#000000',
                overlayOpacity: 0.3,
              })
            }
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Header_001
                    text_company_name={'Company Name'}
                    text_company_slogan={'Your Slogan Here'}
                    text_company_additional={'Additional information'}
                    backgroundColor={'#282c34'}
                    textColor={'#ffffff'}
                    textSize={40}
                    topTextMarginBottom={20}
                    bottomTextMarginTop={20}
                    backgroundImage={''}
                    backgroundOpacity={1}
                    backgroundPosition={'center'}
                    overlayColor={'#000000'}
                    overlayOpacity={0.3}
                  />,
                );
            }}
          >
            Header-001
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(Title_001, {
                titleText: 'Your Title Here',
                contentText: 'Your content text goes here. Add some description or information.',
                titleColor: '#000000',
                textColor: '#333333',
                titleSize: 36,
                textSize: 16,
                backgroundColor: 'transparent',
                padding: 20,
                textAlign: 'center',
              })
            }
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Title_001
                    titleText={'Your Title Here'}
                    contentText={
                      'Your content text goes here. Add some description or information.'
                    }
                    titleColor={'#000000'}
                    textColor={'#333333'}
                    titleSize={36}
                    textSize={16}
                    backgroundColor={'transparent'}
                    padding={20}
                    textAlign={'center'}
                  />,
                );
            }}
          >
            Title-001
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(Advantages_001, {
                title: 'Преимущества',
                description: 'Узнайте, почему стоит выбрать именно нас',
                advantages: [
                  'Высокое качество услуг',
                  'Профессиональная команда',
                  'Индивидуальный подход',
                ],
                titleColor: '#000000',
                textColor: '#333333',
                titleSize: 36,
                textSize: 16,
                backgroundColor: '#f8f8f8',
                padding: 40,
                listStyle: 'disc',
              })
            }
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Advantages_001
                    title={'Преимущества'}
                    description={'Узнайте, почему стоит выбрать именно нас'}
                    advantages={[
                      'Высокое качество услуг',
                      'Профессиональная команда',
                      'Индивидуальный подход',
                    ]}
                    titleColor={'#000000'}
                    textColor={'#333333'}
                    titleSize={36}
                    textSize={16}
                    backgroundColor={'#f8f8f8'}
                    padding={40}
                    listStyle={'disc'}
                  />,
                );
            }}
          >
            Advantages_001
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(Model_3D_001, {
                modelUrl: '',
                mtlUrl: '',
                textureUrl: '',
                modelType: 'stl',
                height: '500px',
                backgroundColor: '#f0f0f0',
                ambientLightIntensity: 0.5,
                directionalLightIntensity: 1.0,
              })
            }
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Model_3D_001
                  modelUrl={''}
                  mtlUrl={''}
                  textureUrl={''}
                  modelType={'stl'}
                  height={'500px'}
                  backgroundColor={'#f0f0f0'}
                  ambientLightIntensity={0.5}
                  directionalLightIntensity={1.0}
                  />,
                );
            }}
          >
            Model_3D_001
          </button>
        </div>
      </div>
    </div>
  );
};
