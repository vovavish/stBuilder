import { api } from './index';

import { UserLayoutResponse, UserLayoutByIdResponse } from '@/types/response/UserLayoutResponse';

export default class ApiUserLayoutsController {
  static async getUserLayouts(): Promise<UserLayoutResponse[]> {
    return api.get<UserLayoutResponse[]>('/user-layouts/').then((res) => res.data);
  }

  static async getUserLayoutById(layout_id: string): Promise<UserLayoutByIdResponse> {
    return api.get<UserLayoutByIdResponse>(`/user-layouts/${layout_id}`).then((res) => res.data);
  }

  static async createUserLayout(
    name: string,
    layout_data: string,
    description: string,
    path_to_image: string,
  ): Promise<UserLayoutByIdResponse> {
    return api
      .post<UserLayoutByIdResponse>('/user-layouts/', { name, layout_data, description, path_to_image })
      .then((res) => res.data);
  }

  static async updateUserLayoutById(
    layout_id: string,
    name?: string,
    layout_data?: string,
    description?: string,
    path_to_image?: string,
  ): Promise<UserLayoutByIdResponse> {
    return api
      .patch<UserLayoutByIdResponse>(`/user-layouts/${layout_id}`, {
        name,
        layout_data,
        description,
        path_to_image,
      })
      .then((res) => res.data);
  }

  static async deleteUserLayoutById(layout_id: string): Promise<UserLayoutByIdResponse> {
    return api.delete<UserLayoutByIdResponse>(`/user-layouts/${layout_id}`).then((res) => res.data);
  }
}
