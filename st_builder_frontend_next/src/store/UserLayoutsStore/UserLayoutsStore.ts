import ApiUserLayoutsController from "@/lib/ApiUserLayoutsController";

import { UserLayoutByIdAdminResponse, UserLayoutByIdResponse, UserLayoutForAdminResponse, UserLayoutResponse } from "@/types/response/UserLayoutResponse";
import { makeAutoObservable, runInAction } from "mobx";

export class UserLayoutsStore {
  private _userLayouts: UserLayoutResponse[] = [];
  private _userLayoutByIdAdmin: UserLayoutByIdAdminResponse | null = null;
  private _userLayoutsAdmin: UserLayoutForAdminResponse[] = [];
  private _userLayoutById: UserLayoutByIdResponse | null = null;

  private _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get userLayouts() {
    return this._userLayouts;
  }

  get userLayoutsAdmin() {
    return this._userLayoutsAdmin;
  }

  get userLayoutByIdAdmin() {
    return this._userLayoutByIdAdmin;
  }

  get userLayoutById() {
    return this._userLayoutById;
  }

  get isLoading() {
    return this._isLoading;
  }

  async getUserLayouts() {
    this._isLoading = true;
    try {
      const userLayouts = await ApiUserLayoutsController.getUserLayouts();
      runInAction(() => {
        this._userLayouts = userLayouts;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async getAllUserLayoutsAdmin() {
    this._isLoading = true;
    try {
      const userLayoutsAdmin = await ApiUserLayoutsController.getAllUserLayoutsAdmin();
      runInAction(() => {
        this._userLayoutsAdmin = userLayoutsAdmin;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async getUserLayoutById(layout_id: string) {
    this._isLoading = true;
    try {
      const userLayout = await ApiUserLayoutsController.getUserLayoutById(layout_id);
      runInAction(() => {
        this._userLayoutById = userLayout;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async getUserLayoutByIdAdmin(layout_id: string) {
    this._isLoading = true;
    try {
      const userLayout = await ApiUserLayoutsController.getUserLayoutByIdAdmin(layout_id);
      runInAction(() => {
        this._userLayoutByIdAdmin = userLayout;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async createUserLayout(layout_name: string, description: string, path_to_image: string, layout_data?: string) {
    this._isLoading = true;
    try {
      const createdLayout = await ApiUserLayoutsController.createUserLayout(layout_name, description, path_to_image, layout_data);
      await this.getUserLayouts();
      runInAction(() => {
        this._userLayoutById = createdLayout;
      })
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async updateUserLayoutById(
    layout_id: string,
    name?: string,
    layout_data?: string,
    description?: string,
    path_to_image?: string,
    isPublished?: boolean,
  ) {
    this._isLoading = true;
    try {
      const updatedLayout = await ApiUserLayoutsController.updateUserLayoutById(
        layout_id,
        name,
        layout_data,
        description,
        path_to_image,
        isPublished,
      );
      runInAction(() => {
        this._userLayoutById = updatedLayout;
      });
      await this.getUserLayouts();
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async updateUserLayoutDataById(
    layout_id: string,
    layout_data?: string,
  ) {
    this._isLoading = true;
    try {
      const updatedLayout = await ApiUserLayoutsController.updateUserLayoutById(
        layout_id,
        undefined,
        layout_data,
        undefined,
        undefined,
      );
      runInAction(() => {
        this._userLayoutById = updatedLayout;
      });
      await this.getUserLayouts(); // Обновляем список после обновления
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async deleteUserLayoutById(layout_id: string) {
    this._isLoading = true;
    try {
      await ApiUserLayoutsController.deleteUserLayoutById(layout_id);
      await this.getUserLayouts(); // Обновляем список после удаления
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}
