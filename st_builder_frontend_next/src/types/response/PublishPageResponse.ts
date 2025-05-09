export interface PublishPageResponse {
  site_name: string;
  page_name: string;
  page_slug: string;
  published_data: string;
  publishedAt?: string;
}

export interface PublishPagesBySiteIdResponse {
  id: number;
  publishedAt: string;
}

export interface PostPublishPageResponse {
  page: {
    page_name: string,
    page_slug: string,
    userSite: {
      site_address: string,
    },
  }
}