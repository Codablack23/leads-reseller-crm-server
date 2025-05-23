import {Request} from "express"
import { DefaultQuery, FtdQuery, PaginatedQuery, QueryCleanerHandler, QueryRequest } from "src/types";

class Query {
  public extractQuery<T = DefaultQuery>(
    req: Request,// Full Express Request
    handleQuery?: QueryCleanerHandler<T>
  ): T {
    const typedQuery = req.query as unknown as T;
    return handleQuery ? handleQuery({ ...req, query: typedQuery } as QueryRequest<T>) : typedQuery;
  }

  public usePagination(req:Request) {
    const { page = 1, limit = 10 } = this.extractQuery<PaginatedQuery>(req);
    return {
      page: Number(page),
      limit: Number(limit),
    };
  }

  public useFtdQuery(req: Request) {
    return this.extractQuery<FtdQuery>(req);
  }
}

const QueryProvider = new Query();
export default QueryProvider;