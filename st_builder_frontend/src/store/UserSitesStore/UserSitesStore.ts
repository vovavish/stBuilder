import ApiUserSitesController from "@/api/ApiUserSitesController";
import { UserSiteByIdResponse, UserSiteResponse } from "@/types/response/UserSiteResponse";
import { makeAutoObservable, runInAction } from "mobx";

export class UserSitesStore {
  private _userSites: UserSiteResponse[] = [];
  private _userSiteById: UserSiteByIdResponse | null = null;

  private _isLoading = false;
  
  constructor() {
    makeAutoObservable(this);
  }

  get userSites() {
    return this._userSites;
  }

  get userSiteById() {
    return this._userSiteById;
  }

  get isLoading() {
    return this._isLoading;
  }

  async getUserSites() {
    this._isLoading = true;
    try {
      const userSites = await ApiUserSitesController.getUserSites();
      runInAction(() => {
        this._userSites = userSites;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      })
    }
  }
  
  async getUserSiteById(id: string) {
    this._isLoading = true;
    try {
      const userSite = await ApiUserSitesController.getUserSiteById(id);
      runInAction(() => {
        this._userSiteById = userSite;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      })
    }
  }

  async createSite(site_name: string, site_data: string, site_address?: string) {
    try {
      this._isLoading = true;
      await ApiUserSitesController.createSite(site_name, site_data, site_address);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      })
    }
  }

  async updateSiteById(id: string, site_name?: string, site_data?: string, site_address?: string) {
    try {
      this._isLoading = true;
      const userSite = await ApiUserSitesController.updateSiteById(id, site_name, site_data, site_address);
      runInAction(() => {
        this._userSiteById = userSite;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      })
    }
  }

  async updateSiteDataById(id: string, site_data: string) {
    try {
      await ApiUserSitesController.updateSiteById(id, undefined, site_data, undefined);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSiteById(id: string) {
    try {
      this._isLoading = true;
      await ApiUserSitesController.deleteSiteById(id);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      })
    }
  }
}
