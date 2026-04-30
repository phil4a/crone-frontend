import { API_PATHS } from '@/config/api.config';

import { axiosClassic } from '@/api/axios';

import { transformProject } from '@/lib/transformers';
import { Project } from '@/types/project.types';
import { WPCategory, WPProject, WPTag } from '@/types/wp.types';

class ProjectService {
	private _posts = API_PATHS.POSTS;
	private _categories = '/categories';
	private _tags = '/tags';

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
	async getProjectsPreview(limit?: number) {
		// Оптимизация: запрашиваем только необходимые поля для карточек
		// Важно: _embedded должен быть в списке, чтобы _embed работал корректно
		// Добавляем project_likes в список полей (требуется регистрация поля в WP)
		const fields = 'id,slug,title,acf,featured_media,_links,_embedded,project_likes';
		return this.getProjectsByCategory('project', limit, fields);
	}

	/**
	 * Получает список меток (тегов) для фильтрации проектов
	 * @param limit Лимит меток (по умолчанию 100)
	 */
	async getProjectTags(limit: number = 100): Promise<WPTag[]> {
		try {
			// Получаем метки, скрываем пустые.
			// Сортировка по количеству записей (count) по убыванию - чтобы показать самые популярные
			const { data } = await axiosClassic.get<WPTag[]>(this._tags, {
				params: {
					per_page: limit,
					hide_empty: true,
					orderby: 'count',
					order: 'desc'
				}
			});
			return data;
		} catch (error) {
			console.error('Error fetching tags:', error);
			return [];
		}
	}

	/**
	 * Переключает лайк для проекта (Custom REST API)
	 */
	async toggleLike(postId: number, type: 'like' | 'unlike'): Promise<{ likes: number } | null> {
		try {
			// Формируем URL для кастомного эндпоинта
			// API_URL = .../wp-json/wp/v2 -> Root = .../wp-json
			const rootApiUrl =
				process.env.NEXT_PUBLIC_API_URL?.replace('/wp/v2', '') ||
				'https://api.crone-group.ru/wp-json';
			const endpoint = `${rootApiUrl}/crone/v1/project/like`;

			const { data } = await axiosClassic.post<{ likes: number }>(endpoint, {
				post_id: postId,
				type
			});

			return data;
		} catch (error) {
			console.error('Error toggling like:', error);
			return null;
		}
	}
}

export const projectService = new ProjectService();
