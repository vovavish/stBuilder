export interface PublishPageResponse {
  page: {
    page_slug: string;
    page_name: string;
    userSite: {
      site_address: string;
    }
  }
  site_name: string;
  published_data: string;
  publishedAt?: string;
}

export interface PublishPagesBySiteIdResponse {
  id: number;
  publishedAt: string;
}