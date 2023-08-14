"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jwt_1 = __importDefault(require("./helpers/jwt"));
const error_handler_1 = require("./helpers/error_handler");
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const api = "/api/v1";
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
app.use(jwt_1.default);
app.use(error_handler_1.error_handler);
app.use(`${api}/product`, product_1.default);
app.use(`${api}/user`, user_1.default);
mongoose_1.default.connect('mongodb://root:example@localhost:27017/', {
    dbName: 'MERN_SHOP',
})
    .then(() => {
    console.log("Database connection is ready...");
})
    .catch((err) => {
    console.log(err);
});
app.listen(3000, () => {
    console.log(`The server was running in port ${3000}`);
});
