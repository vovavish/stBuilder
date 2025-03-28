import lz from 'lzutf8';
import React from 'react';

import './global.css';
import { Model_3D_001_public } from '@/components/user-blocks/3D-Models/3d-model-001/3d-model-001_public.tsx';

export interface Advantages_001Props {
  title: string;
  description: string;
  advantages: string[];
  titleColor: string;
  textColor: string;
  titleSize: number;
  textSize: number;
  backgroundColor: string;
  padding: number;
  listStyle: string;
}

export const Advantages_001: React.FC<Advantages_001Props> = ({
  title = 'Преимущества',
  description = 'Узнайте, почему стоит выбрать именно нас',
  advantages = [
    'Высокое качество услуг',
    'Профессиональная команда',
    'Индивидуальный подход',
  ],
  titleColor = '#000000',
  textColor = '#333333',
  titleSize = 36,
  textSize = 16,
  backgroundColor = '#f8f8f8',
  padding = 40,
  listStyle = 'disc',
}) => {
  console.log('Rendering Advantages_001 with:', { title, description, advantages });

  return (
    <section
      style={{
        backgroundColor,
        padding: `${padding}px`,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            color: titleColor,
            fontSize: `${titleSize}px`,
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: textColor,
            fontSize: `${textSize}px`,
            lineHeight: 1.6,
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ul
            style={{
              color: textColor,
              fontSize: `${textSize}px`,
              listStyleType: listStyle,
              paddingLeft: listStyle === 'none' ? '0' : '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              gap: '20px',
            }}
          >
            {advantages.map((advantage, index) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export interface Title_001Props {
  titleText: string;
  contentText: string;
  titleColor: string;
  textColor: string;
  titleSize: number;
  textSize: number;
  backgroundColor: string;
  padding: number;
  textAlign: string;
}

export const Title_001: React.FC<Title_001Props> = ({
  titleText = 'Your Title Here',
  contentText = 'Your content text goes here. Add some description or information.',
  titleColor = '#000000',
  textColor = '#333333',
  titleSize = 36,
  textSize = 16,
  backgroundColor = 'transparent',
  padding = 20,
  textAlign = 'center',
}) => {
  console.log('Rendering Title_001 with:', { titleText, contentText });

  return (
    <section
      style={{
        backgroundColor,
        padding: `${padding}px`,
        textAlign: textAlign as any,
      }}
    >
      <h2
        style={{
          color: titleColor,
          fontSize: `${titleSize}px`,
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        {titleText}
      </h2>
      <p
        style={{
          color: textColor,
          fontSize: `${textSize}px`,
          lineHeight: 1.6,
        }}
      >
        {contentText}
      </p>
    </section>
  );
};

export interface Header_001Props {
  text_company_name: string;
  text_company_slogan: string;
  text_company_additional: string;
  textColor: string;
  textSize: number;
  topTextMarginBottom: number;
  bottomTextMarginTop: number;
  backgroundColor: string;
  backgroundImage: string;
  backgroundOpacity: number;
  backgroundPosition: string;
  overlayColor: string;
  overlayOpacity: number;
}

export const Header_001: React.FC<Header_001Props> = ({
  text_company_name = 'Company Name',
  text_company_slogan = 'Your Slogan Here',
  text_company_additional = 'Additional information',
  textColor = '#ffffff',
  textSize = 40,
  topTextMarginBottom = 0, // Default added
  bottomTextMarginTop = 0, // Default added
  backgroundColor = '#282c34',
  backgroundImage = '',
  backgroundOpacity = 1,
  backgroundPosition = 'center',
  overlayColor = '#000000',
  overlayOpacity = 0.3,
}) => {
  console.log('Rendering Header_001 with:', { text_company_name, text_company_slogan, text_company_additional });

  return (
    <header
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition,
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        color: textColor,
        textAlign: 'center',
        padding: '20px',
        position: 'relative',
        opacity: backgroundOpacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1
          style={{
            fontSize: `${textSize}px`,
            fontWeight: 'bold',
            marginBottom: `${topTextMarginBottom}px`,
          }}
        >
          {text_company_name}
        </h1>
        <h2
          style={{
            fontSize: `${textSize * 0.75}px`,
            fontWeight: 'bold',
          }}
        >
          {text_company_slogan}
        </h2>
        <p
          style={{
            fontSize: `${textSize * 0.5}px`,
            marginTop: `${bottomTextMarginTop}px`,
          }}
        >
          {text_company_additional}
        </p>
      </div>
    </header>
  );
};

export const Text: React.FC<{ text?: string }> = ({ text }) => {
  console.log('Rendering Text with:', text);
  return <p>{text || 'Default Text'}</p>;
};

export const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  console.log('Rendering Container');
  return <div>{children}</div>;
};

interface CraftNode {
  type: { resolvedName: string };
  props: Record<string, any>;
  nodes?: string[];
}

interface SiteData {
  site_data: string;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  Text,
  Container,
  Advantages_001,
  Title_001,
  Header_001,
  Model_3D_001: Model_3D_001_public,
};

async function getSiteData(siteId: string): Promise<SiteData | null> {
  const site_data = await fetch('http://localhost:3000/published-sites/' + siteId).then((res) => res.json());
  console.log(site_data);
  return site_data;
}

function renderNode(nodeData: CraftNode, nodes: Record<string, CraftNode>): React.ReactNode {
  const { type, props, nodes: childNodeIds } = nodeData;
  const Component = componentMap[type.resolvedName];
  if (!Component) {
    console.log(`Component not found: ${type}`);
    return <div>Component "{type.resolvedName}" not implemented</div>;
  }

  const children = childNodeIds?.map((childId) => renderNode(nodes[childId], nodes)) || [];
  console.log(`Rendering ${type} with props:`, props, 'and children:', children); // Отладка
  return React.createElement(Component, props, ...children);
}

export default async function SubdomainPage({ params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  const siteId = resolvedParams.slug[0]; // Берем первый элемент slug как siteId
  console.log('SubdomainPage - siteId:', siteId);

  const site = await getSiteData(siteId);
  if (!site || !site.site_data) {
    return <div>Сайт не найден</div>;
  }

  const decompressed = lz.decompress(lz.decodeBase64(site.site_data));
  if (!decompressed) return <div>Ошибка загрузки данных сайта</div>;
  const jsonData: Record<string, CraftNode> = JSON.parse(decompressed);
  console.log('JSON data:', jsonData);

  const rootNode = jsonData['ROOT'];
  const renderedContent = renderNode(rootNode, jsonData);

  return <>{renderedContent}</>;
}

export const dynamic = 'force-dynamic';