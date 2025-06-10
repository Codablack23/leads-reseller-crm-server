"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    extractQuery(req, // Full Express Request
    handleQuery) {
        const typedQuery = req.query;
        return handleQuery ? handleQuery(Object.assign(Object.assign({}, req), { query: typedQuery })) : typedQuery;
    }
    usePagination(req) {
        const { page = 1, limit = 10 } = this.extractQuery(req);
        return {
            page: Number(page),
            limit: Number(limit),
        };
    }
    useFtdQuery(req) {
        return this.extractQuery(req);
    }
}
const QueryProvider = new Query();
exports.default = QueryProvider;
