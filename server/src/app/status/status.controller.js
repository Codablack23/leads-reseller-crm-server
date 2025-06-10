"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_service_1 = require("./status.service");
const providers_1 = require("../../common/providers");
const service_response_1 = __importDefault(require("../../common/services/service.response"));
class StatusMapController {
    constructor(statusMapService, statusListService) {
        this.statusMapService = statusMapService;
        this.statusListService = statusListService;
        /**
         * GET /leads
         * Retrieves all leads.
         */
        this.getStatusMap = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paginatedQuery = providers_1.QueryProvider.usePagination(req);
                const data = yield this.statusMapService.getStatusMap(paginatedQuery);
                return service_response_1.default.sendOkResponse(res, data);
            }
            catch (err) {
                next(err);
            }
        });
        /**
        * GET /leads
        * Retrieves all leads.
        */
        this.getUnmappedStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paginatedQuery = providers_1.QueryProvider.usePagination(req);
                const data = yield this.statusMapService.getUnmappedStatus(paginatedQuery);
                return service_response_1.default.sendOkResponse(res, data);
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * GET /leads/:id
         * Retrieves a single lead by ID.
         */
        this.getStatusMapById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const status_map = yield this.statusMapService.getStatusMapById(id);
                return service_response_1.default.sendOkResponse(res, { status_map });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * POST /leads
         * Creates a new lead.
         */
        this.addStatusMap = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const status_map = yield this.statusMapService.addStatusMap(req.body);
                return service_response_1.default.sendOkResponse(res, { status_map });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * PUT /leads/:id
         * Updates an existing lead by ID.
         */
        this.updateStatusMap = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const status_map = yield this.statusMapService.updateStatusMap(id, req.body);
                return service_response_1.default.sendOkResponse(res, { status_map });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * DELETE /leads/:id
         * Deletes a lead by ID.
         */
        this.deleteStatusMap = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.statusMapService.deleteStatusMap(id);
                service_response_1.default.sendOkResponse(res, { id }, "Stats deleted successfully");
            }
            catch (err) {
                next(err);
            }
        }); /**
         * GET /leads
         * Retrieves all leads.
         */
        this.getStatusList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paginatedQuery = providers_1.QueryProvider.usePagination(req);
                const data = yield this.statusListService.getStatusList(paginatedQuery);
                return service_response_1.default.sendOkResponse(res, data);
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * GET /leads/:id
         * Retrieves a single lead by ID.
         */
        this.getStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const status = yield this.statusListService.getStatus(id);
                return service_response_1.default.sendOkResponse(res, { status });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * POST /leads
         * Creates a new lead.
         */
        this.addStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const status_map = yield this.statusListService.addStatus(req.body);
                return service_response_1.default.sendOkResponse(res, { status_map });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * PUT /leads/:id
         * Updates an existing lead by ID.
         */
        this.updateStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const status_map = yield this.statusListService.updateStatus(id, req.body);
                return service_response_1.default.sendOkResponse(res, { status_map });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * DELETE /leads/:id
         * Deletes a lead by ID.
         */
        this.deleteStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.statusListService.deleteStatus(id);
                service_response_1.default.sendOkResponse(res, { id }, "Stats deleted successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new StatusMapController(new status_service_1.StatusMapService(), new status_service_1.StatusListService());
