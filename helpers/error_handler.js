"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = void 0;
const error_handler = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "The user is not authorized" });
    }
    if (err.name === "ValidationError") {
        return res.status(401).json({ message: err });
    }
    next();
    return res.status(500).json(err);
};
exports.error_handler = error_handler;
