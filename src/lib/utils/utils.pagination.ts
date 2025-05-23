class Pagination {
  getPaginationMetaData(count: number, limit: number, page: number) {
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(Math.max(page, 1), totalPages); // clamp page between 1 and totalPages

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    const offset = (currentPage - 1) * limit;

    return {
      totalItems: count,
      limit,
      totalPages,
      currentPage,
      offset,
      hasPrev,
      hasNext,
      prevPage: hasPrev ? currentPage - 1 : null,
      nextPage: hasNext ? currentPage + 1 : null,
    };
  }
}

const PaginationUtility = new Pagination()
export default PaginationUtility;