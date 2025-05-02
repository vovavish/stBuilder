import { useState } from 'react';
import { ROOT_NODE, useEditor } from '@craftjs/core';
import { Text_001, Text_001DefaultProps } from '@/components/user-blocks/Text/text-001/text-001';
import { Header_001 } from '../user-blocks/Headers/header-001/header-001';
import { Title_001, Title_001DefaultProps } from '../user-blocks/Titels/title-001/title-001';
import { Advantages_001, Advantages_001DefaultProps } from '../user-blocks/Advantages/advantages-001/advantages-001';
import { Model_3D_001 } from '../user-blocks/3D-Models/3d-model-001/3d-model-001';
import { DXF_001 } from '../user-blocks/CAD/DXF/dxf-001/dxf-001';
import { DXF_002 } from '../user-blocks/CAD/DXF/dxf-002/dxf-002';
import { DXF_003 } from '../user-blocks/CAD/DXF/dxf-003/dxf-003';
import { Gallery_001 } from '../user-blocks/Gallery/gallery-001/gallery-001';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './toolbox.scss';

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

type AccordionSection = {
  title: string;
  components: {
    name: string;
    component: React.ComponentType<any>;
    props: any;
  }[];
};

export const Toolbox = () => {
  const { connectors, actions, query } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Текстовые блоки': true,
    Шапки: true,
    '3D Модели': false,
    'CAD Модели': false,
  });

  const handleClick = <T extends React.ComponentType<any>>(
    Component: T,
    props: ComponentProps<T>,
  ) => {
    const nodeTree = query.parseReactElement(<Component {...props} />).toNodeTree();
    actions.addNodeTree(nodeTree, ROOT_NODE);
  };

  const toggleToolbox = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections: AccordionSection[] = [
    {
      title: 'Текстовые блоки',
      components: [
        {
          name: 'Тектовый блок (text_001)',
          component: Text_001,
          props: Text_001DefaultProps,
        },
        {
          name: 'Блок заголовка (Title_001)',
          component: Title_001,
          props: Title_001DefaultProps,
        },
        {
          name: 'Блок достижений (Advantages_001)',
          component: Advantages_001,
          props: Advantages_001DefaultProps,
        },
      ],
    },
    {
      title: 'Шапки',
      components: [
        {
          name: 'Шапка (Header_001)',
          component: Header_001,
          props: {
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
          },
        },
      ],
    },
    {
      title: '3D Модели',
      components: [
        {
          name: '3D модель (Model_3D_001)',
          component: Model_3D_001,
          props: {
            modelUrl: '',
            mtlUrl: '',
            textureUrl: '',
            modelType: 'stl',
            height: '500px',
            backgroundColor: '#f0f0f0',
            ambientLightIntensity: 0.5,
            directionalLightIntensity: 1.0,
            cameraX: 0,
            cameraY: 0,
            cameraZ: 5,
          },
        },
      ],
    },
    {
      title: 'CAD Модели',
      components: [
        {
          name: 'DXF чертеж (DXF_001)',
          component: DXF_001,
          props: {
            dxfUrl: '',
            backgroundColor: '#ffffff',
            width: '800px',
            height: '600px',
          },
        },
        {
          name: 'DXF чертеж с текстом (DXF_002)',
          component: DXF_002,
          props: {
            dxfUrl: '',
            backgroundColor: '#ffffff',
            width: '800px',
            height: '600px',
            text: 'Description here',
            fontSize: 20,
            textAlign: 'left',
            maxWidth: 400,
          },
        },
        {
          name: 'DXF чертеж с текстом (DXF_003)',
          component: DXF_003,
          props: {
            dxfUrl: '',
            backgroundColor: '#ffffff',
            width: '800px',
            height: '600px',
            text: 'Description here',
            fontSize: 20,
            textAlign: 'left',
            maxWidth: 400,
          },
        },
      ],
    },
    {
      title: 'Изображения',
      components: [
        {
          name: 'Галлерея (Gallery_001)',
          component: Gallery_001,
          props: {
            image: '',
            imageRatio: '1:1',
            borderRadius: 8,
            showCaption: false,
            caption: '',
          },
        },
      ],
    },
  ];

  return (
    <>
      <button
        onClick={toggleToolbox}
        className="toolbox-toggle"
        style={{
          position: 'fixed',
          left: isOpen ? '270px' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1001,
          padding: '10px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isOpen ? 'Скрыть' : 'Открыть'}
      </button>
      <div className={`toolbox ${isOpen ? 'toolbox--open' : 'toolbox--closed'}`}>
        <h3 className="toolbox__title">Библиотека блоков</h3>
        <div className="toolbox__list">
          {sections.map((section, index) => (
            <div key={index} className="toolbox__section">
              <button
                className="toolbox__section-header"
                onClick={() => toggleSection(section.title)}
              >
                {expandedSections[section.title] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <span>{section.title}</span>
              </button>
              {expandedSections[section.title] && (
                <div className="toolbox__section-content">
                  {section.components.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleClick(item.component, item.props)}
                      ref={(ref) => {
                        if (ref) connectors.create(ref, <item.component {...item.props} />);
                      }}
                      className="toolbox__button"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
