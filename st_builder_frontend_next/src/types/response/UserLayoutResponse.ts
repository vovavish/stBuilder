export interface UserLayoutResponse {
  id: string;
  name: string;
  description: string;
  path_to_image: string;
}

export interface UserLayoutByIdResponse extends UserLayoutResponse {
  layout_data: string;
}

export interface UserLayoutForAdminResponse extends UserLayoutResponse {
  isPublished: boolean;
}

export interface UserLayoutByIdAdminResponse extends UserLayoutForAdminResponse {
  layout_data: string;
}