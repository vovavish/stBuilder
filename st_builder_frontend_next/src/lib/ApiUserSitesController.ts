import { api } from './api';

import { UserSiteByIdResponse, UserSiteResponse } from '@/types/response/UserSiteResponse';

export default class ApiUserSitesController {
  static async getUserSites(): Promise<UserSiteResponse[]> {
    return api.get<UserSiteResponse[]>('/user-sites/getSites').then((res) => res.data);
  }

  static async getUserSiteById(id: string): Promise<UserSiteByIdResponse> {
    return api.get<UserSiteByIdResponse>(`/user-sites/getSiteById/${id}`).then((res) => res.data);
  }

  static async createSite(
    site_name: string,
    site_data: string,
    site_address?: string,
  ): Promise<UserSiteByIdResponse> {
    return api
      .post<UserSiteByIdResponse>('/user-sites/create', { site_name, site_data, site_address })
      .then((res) => res.data);
  }

  static async updateSiteById(
    id: string,
    site_name?: string,
    site_data?: string,
    site_address?: string,
  ): Promise<UserSiteByIdResponse> {
    return api
      .patch<UserSiteByIdResponse>(`/user-sites/updateSiteById/${id}`, {
        site_name,
        site_data,
        site_address,
      })
      .then((res) => res.data);
  }

  static async deleteSiteById(id: string): Promise<UserSiteByIdResponse> {
    return api
      .delete<UserSiteByIdResponse>(`/user-sites/deleteSiteById/${id}`)
      .then((res) => res.data);
  }
}
