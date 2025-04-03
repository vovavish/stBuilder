import axios from 'axios';
import { api } from './api';
import { PublishUserSiteResponse } from '@/types/response/PublishUserSiteResponse';

export default class ApiPublishedUserSitesController {
  static async publishSite(
    userSiteId: number,
    siteAddress: string
  ): Promise<PublishUserSiteResponse> {
    return api
      .post<PublishUserSiteResponse>('/published-sites/publish', {
        userSiteId,
        siteAddress
      })
      .then((res) => res.data);
  }

  static async getPublishedSiteByAddress(
    siteAddress: string
  ): Promise<PublishUserSiteResponse> {
    return axios
      .get<PublishUserSiteResponse>(`http://localhost:3000/published-sites/${siteAddress}`)
      .then((res) => res.data);
  }
}