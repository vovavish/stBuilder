// import { promises as fs } from 'fs';
// import path from 'path';
// import { renderToStaticMarkup } from 'react-dom/server';
// import lz from 'lzutf8';
// import React from 'react';

// // Импортируем компоненты (предполагаем, что они экспортированы как React-компоненты)
// import { Text, Header_001, Title_001, Advantages_001, Model_3D_001, Container } from '../../../../components/user-blocks';

// // Тип для структуры узла Craft.js
// interface CraftNode {
//   type: string;
//   props: Record<string, any>;
//   nodes?: string[];
// }

// // Тип для данных сайта из базы
// interface SiteData {
//   site_data: string;
// }

// // Тип для маппинга компонентов
// type ComponentMap = {
//   [key: string]: React.ComponentType<any>;
// };

// // Функция для получения данных из базы
// async function getSiteData(siteId: number): Promise<SiteData> {
//   // Ваш код для базы данных
//   return {
//     site_data: lz.encodeBase64(
//       lz.compress('{"ROOT":{"type":"Container","props":{},"nodes":["node1"]},"node1":{"type":"Text","props":{"text":"Hello World"}}}')
//     ),
//   };
// }

// // Маппинг компонентов
// const componentMap: ComponentMap = {
//   Text,
//   Header_001,
//   Title_001,
//   Advantages_001,
//   Model_3D_001,
//   Container,
// };

// // Рекурсивный рендеринг узлов
// function renderNode(nodeData: CraftNode, nodes: Record<string, CraftNode>): React.ReactNode {
//   const { type, props, nodes: childNodeIds } = nodeData;
//   const Component = componentMap[type];
//   if (!Component) return null;

//   const children = childNodeIds?.map((childId) => renderNode(nodes[childId], nodes)) || [];
//   return React.createElement(Component, props, ...children);
// }

// // Тип для параметров API
// interface RouteParams {
//   siteId: string;
// }

// export async function POST(req: Request, { params }: { params: RouteParams }) {
//   const { siteId } = params;

//   try {
//     // 1. Получаем данные сайта
//     const site = await getSiteData(parseInt(siteId, 10));
//     if (!site || !site.site_data) {
//       return new Response(JSON.stringify({ error: 'Site not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // 2. Декодируем site_data
//     const decompressed = lz.decompress(lz.decodeBase64(site.site_data));
//     if (!decompressed) throw new Error('Failed to decompress site data');
//     const jsonData: Record<string, CraftNode> = JSON.parse(decompressed);

//     // 3. Генерируем React-структуру
//     const rootNode = jsonData['ROOT'];
//     const renderedComponent = renderNode(rootNode, jsonData);

//     // 4. Преобразуем в HTML
//     const htmlContent = renderToStaticMarkup(renderedComponent);

//     // 5. Создаем полный HTML
//     const fullHtml = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>User Site</title>
//       </head>
//       <body>
//         ${htmlContent}
//       </body>
//       </html>
//     `;

//     // 6. Сохраняем файл
//     const filePath = path.join(process.cwd(), 'public', 'sites', `${siteId}.html`);
//     await fs.mkdir(path.dirname(filePath), { recursive: true });
//     await fs.writeFile(filePath, fullHtml);

//     // 7. Возвращаем ответ
//     return new Response(JSON.stringify({ message: 'Site published', url: `/public/${siteId}` }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Failed to publish site' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }