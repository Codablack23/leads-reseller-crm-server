"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandRouter = (0, express_1.Router)();
brandRouter.get("/");
brandRouter.get("/profile");
brandRouter.post("/login");
brandRouter.post("/register");
brandRouter.post("/logout");
exports.default = {
    routeGroup: "/brands",
    routeHandler: brandRouter,
};
