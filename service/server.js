"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.middlewares();
        this.routes();
    }
    config() {
        this.app.set('PORT', process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
    }
    routes() {
    }
    start() {
        const PORT = this.app.get('PORT');
        this.app.listen(PORT, () => {
            console.log(`BeerBaron on ${PORT}`);
        });
    }
}
exports.Server = Server;
