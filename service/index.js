"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server");
class Main {
    constructor() {
        dotenv_1.default.config();
        this.server = new server_1.Server();
        this.start();
    }
    start() {
        this.server.start();
    }
}
new Main();
