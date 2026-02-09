import { API_PATHS } from '@/config/api.config';

import { axiosClassic } from '@/api/axios';

import { transformProject } from '@/lib/transformers';
import { Project } from '@/types/project.types';
import { WPCategory, WPProject } from '@/types/wp.types';

class ProjectService {
	private _posts = API_PATHS.POSTS;
	private _categories = '/categories';

	/**
	 * Получает ID категории по её слагу
	 */
	async getCategoryIdBySlug(slug: string): Promise<number | null> {
		try {
			const { data } = await axiosClassic.get<WPCategory[]>(this._categories, {
				params: { slug }
			});
			return data.length > 0 ? data[0].id : null;
		} catch (error) {
			console.error(`Error fetching category with slug "${slug}":`, error);
			return null;
		}
	}

	/**
	 * Получает проекты (посты) с фильтрацией по слагу категории
	 * @param categorySlug Слаг категории (по умолчанию 'project')
	 * @param limit Количество постов (опционально)
	 * @param fields Список полей для выборки (опционально, для оптимизации)
	 */
	async getProjectsByCategory(
		categorySlug: string = 'project',
		limit?: number,
		fields?: string
	): Promise<Project[]> {
		const categoryId = await this.getCategoryIdBySlug(categorySlug);

		if (!categoryId) {
			console.warn(`Category "${categorySlug}" not found. Returning empty list.`);
			return [];
		}

		try {
			// Добавляем _embed для получения картинок и связей
			const { data } = await axiosClassic.get<WPProject[]>(this._posts, {
				params: {
					categories: categoryId,
					_embed: true,
					...(limit && { per_page: limit }),
					...(fields && { _fields: fields })
				}
			});

			return data.map(transformProject);
		} catch (error) {
			console.error('Error fetching projects:', error);
			return [];
		}
	}

	/**
	 * Получает проекты для главной страницы (алиас для getProjectsByCategory)
	 * @param limit Количество постов (опционально)
	 */
	async getHomePageProjects(limit?: number) {
		// Оптимизация: запрашиваем только необходимые поля для карточек
		const fields = 'slug,title,acf,featured_media';
		return this.getProjectsByCategory('project', limit, fields);
	}
}

export const projectService = new ProjectService();
