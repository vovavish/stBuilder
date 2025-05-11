import ApiPublishedUserPagesController from '@/lib/ApiPublishUserPagesController';
import { PublishPageResponse, PublishPagesBySiteIdResponse } from '@/types/response/PublishPageResponse';
import { PageResponse } from '@/types/response/PageResponse';
import { CreatePageDto } from '@/types/dto/CreatePageDto';
import { makeAutoObservable, runInAction } from 'mobx';

export class UserPagesStore {
  private _userPages: PageResponse[] = []; // Список страниц сайта
  private _userPublishedPagesBySiteId: PublishPagesBySiteIdResponse[] = [];
  private _userPageById: PageResponse | null = null; // Страница по ID
  private _publishedPage: PublishPageResponse | null = null; // Опубликованная страница
  private _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get userPages() {
    return this._userPages;
  }

  get userPublishedPagesBySiteId() {
    return this._userPublishedPagesBySiteId;
  }

  get userPageById() {
    return this._userPageById;
  }

  get publishedPage() {
    return this._publishedPage;
  }

  get isLoading() {
    return this._isLoading;
  }

  // Получение всех страниц сайта
  async getPages(siteId: number) {
    this._isLoading = true;
    try {
      const pages = await ApiPublishedUserPagesController.getPages(siteId);
      runInAction(() => {
        this._userPages = pages;
      });
    } catch (error) {
      console.error('Ошибка при получении страниц:', error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async getPublishedPagesBySiteId(siteId: number) {
    this._isLoading = true;
    try {
      const pages = await ApiPublishedUserPagesController.getPublishedPagesBySiteId(siteId);
      runInAction(() => {
        this._userPublishedPagesBySiteId = pages;
      });
    } catch (error) {
      console.error('Ошибка при получении страниц:', error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  // Получение страницы по ID
  async getPageById(pageId: number) {
    this._isLoading = true;
    try {
      const page = await ApiPublishedUserPagesController.getPageById(pageId);
      runInAction(() => {
        this._userPageById = page;
      });
    } catch (error) {
      console.error('Ошибка при получении страницы:', error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  // Создание новой страницы
  async createPage(siteId: number, page_name: string, page_slug: string, page_data: string) {
    this._isLoading = true;
    try {
      const createPageDto: CreatePageDto = { page_name, page_slug, page_data };
      const newPage = await ApiPublishedUserPagesController.createPage(siteId, createPageDto);
      runInAction(() => {
        this._userPages.push(newPage);
      });
      return newPage;
    } catch (error) {
      console.error('Ошибка при создании страницы:', error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  // Обновление страницы по ID
  async updatePage(pageId: number, page_name?: string, page_slug?: string, page_data?: string) {
    try {
      const updatePageDto: CreatePageDto = {
        page_name: page_name || this._userPageById?.page_name || '',
        page_slug: page_slug || this._userPageById?.page_slug || '',
        page_data: page_data || this._userPageById?.page_data || '',
      };
      const updatedPage = await ApiPublishedUserPagesController.updatePage(pageId, updatePageDto);
      runInAction(() => {
        const index = this._userPages.findIndex((page) => page.id === pageId);
        if (index !== -1) {
          this._userPages[index] = updatedPage;
        }
      });
      return updatedPage;
    } catch (error) {
      console.error('Ошибка при обновлении страницы:', error);
      throw error;
    } finally {
      runInAction(() => {
      });
    }
  }

  // Удаление страницы по ID
  async deletePage(pageId: number) {
    this._isLoading = true;
    try {
      await ApiPublishedUserPagesController.deletePage(pageId);
      runInAction(() => {
        this._userPages = this._userPages.filter((page) => page.id !== pageId);
        if (this._userPageById?.id === pageId) {
          this._userPageById = null;
        }
      });
    } catch (error) {
      console.error('Ошибка при удалении страницы:', error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  // Публикация страницы
  async publishPage(pageId: number) {
    this._isLoading = true;
    try {
      const publishedPage = await ApiPublishedUserPagesController.publishPage(pageId);
      return publishedPage;
    } catch (error) {
      console.error('Ошибка при публикации страницы:', error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  // Получение опубликованной страницы по site_name и page_slug
  async getPublishedPage(siteName: string, pageSlug: string) {
    this._isLoading = true;
    try {
      const publishedPage = await ApiPublishedUserPagesController.getPublishedPage(siteName, pageSlug);
      runInAction(() => {
        this._publishedPage = publishedPage;
      });
      return publishedPage;
    } catch (error) {
      console.error('Ошибка при получении опубликованной страницы:', error);
      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  // Очистка данных
  clear() {
    runInAction(() => {
      this._userPages = [];
      this._userPageById = null;
      this._publishedPage = null;
    });
  }
}