"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const secretKey = "Gabriel";
const api = "/api/v1";
const authJwt = (0, express_jwt_1.expressjwt)({
    secret: secretKey,
    algorithms: ['HS256'],
}).unless({
    path: [
        { url: /\/api\/v1\/product(.*)/, methods: ['GET', 'OPTIONS'] },
        `${api}/user/login`,
        `${api}/user/register`
    ]
});
exports.default = authJwt;
