import React from 'react';
import lz from 'lzutf8';

import { Container_public } from '@/components/user-blocks/Container_public';
import { Model_3D_001_public } from '@/components/user-blocks/3D-Models/3d-model-001/3d-model-001_public';
import { Title_001_public } from '@/components/user-blocks/Titels/title-001/title-001_public';
import { Text_001_public } from '@/components/user-blocks/Text/text-001/text-001_public';
import { Header_001_public } from '@/components/user-blocks/Headers/header-001/header-001_public';
import { Advantages_001_public } from '@/components/user-blocks/Advantages/advantages-001/advantages-001_public';

import ApiPublishedUserSitesController from '@/lib/ApiPublishUserPagesController';

import './global.css';
import { DXF_001_public } from '@/components/user-blocks/CAD/DXF/dxf-001/dxf-001_public';
import { DXF_002_public } from '@/components/user-blocks/CAD/DXF/dxf-002/dxf-002_public';
import { DXF_003_public } from '@/components/user-blocks/CAD/DXF/dxf-003/dxf-003_public';

import { Gallery_001_public } from '@/components/user-blocks/Gallery/gallery-001/gallery-001_public';
import { Link_001_public } from '@/components/user-blocks/Navigation/Link_001/link-001_public';
import { Link_002_public } from '@/components/user-blocks/Navigation/Link_002/Link_002_public';
import { Header_002_public } from '@/components/user-blocks/Headers/header-002/header-002_public';
import { Metadata, NextPage } from 'next';
import { PublishPageResponse } from '@/types/response/PublishPageResponse';

interface CraftNode {
  type: { resolvedName: string };
  props: Record<string, Record<string, string>>;
  nodes?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: { [key: string]: React.ComponentType<any> } = {
  Text_001: Text_001_public,
  Container: Container_public,
  Advantages_001: Advantages_001_public,
  Title_001: Title_001_public,
  Link_001: Link_001_public,
  Link_002: Link_002_public,
  Header_001: Header_001_public,
  Header_002: Header_002_public,
  Model_3D_001: Model_3D_001_public,
  DXF_001: DXF_001_public,
  DXF_002: DXF_002_public,
  DXF_003: DXF_003_public,
  Gallery_001: Gallery_001_public,
};

async function getSiteData(siteName: string, pageSlug: string): Promise<PublishPageResponse | null> {
  const site_data = await ApiPublishedUserSitesController.getPublishedPage(siteName, pageSlug);
  console.log(site_data);
  return site_data;
}

function renderNode(nodeData: CraftNode, nodes: Record<string, CraftNode>): React.ReactNode {
  const { type, props, nodes: childNodeIds } = nodeData;
  const Component = componentMap[type.resolvedName];
  if (!Component) {
    console.log(`Component not found: ${type}`);
    return <div>Component &quot;{type.resolvedName}&quot; not implemented</div>;
  }

  const children = childNodeIds?.map((childId) => renderNode(nodes[childId], nodes)) || [];
  return React.createElement(Component, props, ...children);
}

interface SubdomainPageProps {
  params: Promise<{ slug: string[] }>;
}

const SubdomainPage: NextPage<SubdomainPageProps> = async ({ params }) => {
  const resolvedParams = await params;

  const siteName = resolvedParams.slug[0];
  
  let pageSlug = '/';
  if (resolvedParams.slug.length > 1) {
    pageSlug = resolvedParams.slug.slice(1).join('/');
    
    pageSlug = pageSlug.replace(/\/+/g, '/');
    
    if (!pageSlug) pageSlug = '/';
  }

  console.log('SubdomainPage - siteName:', siteName, 'pageSlug:', pageSlug);

  try {
    const site = await getSiteData(siteName, pageSlug);
    if (!site || !site.published_data) {
      return <div>Сайт не найден</div>;
    }

    const decompressed = lz.decompress(lz.decodeBase64(site.published_data));
    if (!decompressed) return <div>Ошибка загрузки данных сайта</div>;
    const jsonData: Record<string, CraftNode> = JSON.parse(decompressed);

    const rootNode = jsonData['ROOT'];
    const renderedContent = renderNode(rootNode, jsonData);

    return <>{renderedContent}</>;
  } catch (error) {
    console.error('Error loading page:', error);
    return <div>Ошибка загрузки страницы</div>;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const siteName = resolvedParams.slug[0];

  let pageSlug = '/';
  if (resolvedParams.slug.length > 1) {
    pageSlug = resolvedParams.slug.slice(1).join('/');
    pageSlug = pageSlug.replace(/\/+/g, '/');
    if (!pageSlug) pageSlug = '/';
  }

  try {
    const site = await getSiteData(siteName, pageSlug);
    if (!site || !site.published_data) {
      return {
        title: siteName,
        description: siteName,
      };
    }

    return {
      title: site.site_name || siteName, // Use site_name from API or fallback to siteName
      description: site.page_name || siteName, // Use page_name from API or fallback to siteName
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: siteName,
      description: siteName,
    };
  }
}

export default SubdomainPage;

export const dynamic = 'force-dynamic';