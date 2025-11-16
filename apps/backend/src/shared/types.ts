
/**
 * @title PaginationQueryDto
 * @description Параметры для пагинации.
 */
export type TPageQuery = {
  /**
   * Размер страницы (количество элементов на странице).
   * @minimum 1
   * @maximum 100
   * @default 20
   */
  size?: number;

  /**
   * Номер страницы (начинается с 1).
   * @minimum 1
   * @default 1
   */
  page?: number;
}