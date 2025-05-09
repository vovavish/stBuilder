import axios from 'axios';
import { api } from './api';
import { PostPublishPageResponse, PublishPageResponse, PublishPagesBySiteIdResponse } from '@/types/response/PublishPageResponse';
import { PageResponse } from '@/types/response/PageResponse';
import { CreatePageDto } from '@/types/dto/CreatePageDto';

export default class ApiPublishedUserPagesController {
  static async createPage(siteId: number, createPageDto: CreatePageDto): Promise<PageResponse> {
    return api
      .post<PageResponse>(`/pages/create/${siteId}`, createPageDto)
      .then((res) => res.data);
  }

  static async getPages(siteId: number): Promise<PageResponse[]> {
    return api
      .get<PageResponse[]>(`/pages/getPages/${siteId}`)
      .then((res) => res.data);
  }

  static async getPageById(pageId: number): Promise<PageResponse> {
    return api
      .get<PageResponse>(`/pages/getPage/${pageId}`)
      .then((res) => res.data);
  }

  static async updatePage(pageId: number, updatePageDto: CreatePageDto): Promise<PageResponse> {
    return api
      .patch<PageResponse>(`/pages/updatePage/${pageId}`, updatePageDto)
      .then((res) => res.data);
  }

  static async deletePage(pageId: number): Promise<void> {
    return api
      .delete<void>(`/pages/deletePage/${pageId}`)
      .then((res) => res.data);
  }

  static async publishPage(pageId: number): Promise<PostPublishPageResponse> {
    return api
      .post<PostPublishPageResponse>(`/pages/publish/${pageId}`)
      .then((res) => res.data);
  }

  static async getPublishedPage(siteName: string, pageSlug: string): Promise<PublishPageResponse> {
    return axios
      .get<PublishPageResponse>(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/pages/getPublishedPage/${siteName}/${pageSlug}`)
      .then((res) => res.data);
  }

  static async getPublishedPagesBySiteId(siteId: number): Promise<PublishPagesBySiteIdResponse[]> {
    return api
      .get<PublishPagesBySiteIdResponse[]>(`pages/getPublishedPages/${siteId}`)
      .then((res) => res.data);
  }
}