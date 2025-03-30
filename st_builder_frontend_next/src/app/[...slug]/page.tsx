import React from 'react';
import lz from 'lzutf8';

import { Container_public } from '@/components/user-blocks/Container_public';
import { Model_3D_001_public } from '@/components/user-blocks/3D-Models/3d-model-001/3d-model-001_public';
import { Title_001_public } from '@/components/user-blocks/Titels/title-001/title-001_public';
import { Text_001_public } from '@/components/user-blocks/Text/text-001/text-001_public';
import { Header_001_public } from '@/components/user-blocks/Headers/header-001/header-001_public';
import { Advantages_001_public } from '@/components/user-blocks/Advantages/advantages-001/advantages-001_public';

import './global.css';

interface CraftNode {
  type: { resolvedName: string };
  props: Record<string, any>;
  nodes?: string[];
}

interface SiteData {
  site_data: string;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  Text_001: Text_001_public,
  Container: Container_public,
  Advantages_001: Advantages_001_public,
  Title_001: Title_001_public,
  Header_001: Header_001_public,
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
  console.log(`Rendering ${type} with props:`, props, 'and children:', children);
  return React.createElement(Component, props, ...children);
}

export default async function SubdomainPage({ params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  const siteId = resolvedParams.slug[0];
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