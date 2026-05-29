import { BadRequestException } from '@nestjs/common';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export function validatePagination(page: number, pageSize: number): void {
  if (page < 1) {
    throw new BadRequestException('page must be greater than or equal to 1');
  }

  if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
    throw new BadRequestException(
      `pageSize must be between 1 and ${MAX_PAGE_SIZE}`,
    );
  }
}
