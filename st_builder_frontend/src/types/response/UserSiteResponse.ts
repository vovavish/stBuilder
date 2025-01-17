export interface UserSiteResponse {
  id: string;
  site_name: string;
  site_address: string | null;
}

export interface UserSiteByIdResponse extends UserSiteResponse {
  site_data: string;
}