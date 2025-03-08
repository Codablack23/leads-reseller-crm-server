"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAYS_OF_THE_WEEK = exports.MB = exports.SIX_MONTHS = exports.whitelist = void 0;
exports.whitelist = [
    "http://localhost:5503",
    "http://localhost:5505",
    "http://localhost:3006",
    "http://localhost:3005",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://leads-reseller-crm.vercel.app",
];
exports.SIX_MONTHS = 1000 * 60 * 60 * 24 * 30 * 6;
exports.MB = 1024 * 1024;
exports.DAYS_OF_THE_WEEK = [
    {
        label: "Monday",
        slug: "mon"
    },
    {
        label: "Tuesday",
        slug: "tue"
    },
    {
        label: "Wednessday",
        slug: "wed"
    },
    {
        label: "Thursday",
        slug: "thu"
    },
    {
        label: "Friday",
        slug: "fri"
    },
    {
        label: "Saturday",
        slug: "sat"
    },
    {
        label: "Sunday",
        slug: "sun"
    },
];
