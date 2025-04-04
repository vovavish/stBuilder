export interface PageResponse {
  id: number;
  page_name: string;
  page_slug: string;
  page_data: string;
  createdAt: string;
  updatedAt: string;
  publishedPages?: {
    published_data: string;
    publishedAt: string;
  } | null;
}