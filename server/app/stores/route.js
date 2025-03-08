"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter = (0, express_1.Router)();
productRouter.get("/", (req, res) => {
    res.json({
        url: req.url,
    });
});
exports.default = productRouter;
