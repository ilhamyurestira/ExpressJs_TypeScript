"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
//Router
const UserRoutes_1 = __importDefault(require("./routers/UserRoutes"));
const AuthRoutes_1 = __importDefault(require("./routers/AuthRoutes"));
const TodoRoutes_1 = __importDefault(require("./routers/TodoRoutes"));
const CakadesRouter_1 = __importDefault(require("./routers/CakadesRouter"));
const DesaRoutes_1 = __importDefault(require("./routers/DesaRoutes"));
const TimsesRoutes_1 = __importDefault(require("./routers/TimsesRoutes"));
const RelawanRoutes_1 = __importDefault(require("./routers/RelawanRoutes"));
const SimpatisanRoutes_1 = __importDefault(require("./routers/SimpatisanRoutes"));
const HasilPemilihanRoutes_1 = __importDefault(require("./routers/HasilPemilihanRoutes"));
const DashboardRouter_1 = __importDefault(require("./routers/DashboardRouter"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
        (0, dotenv_1.config)();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("ini route menggunakan TypeScript");
        });
        this.app.route("/users").post((req, res) => {
            res.send(req.body);
        });
        this.app.use("/api/v1/users", UserRoutes_1.default);
        this.app.use("/api/v1/auth", AuthRoutes_1.default);
        this.app.use("/api/v1/todos", TodoRoutes_1.default);
        this.app.use("/api/v1/cakades", CakadesRouter_1.default);
        this.app.use("/api/v1/desa", DesaRoutes_1.default);
        this.app.use("/api/v1/timses", TimsesRoutes_1.default);
        this.app.use("/api/v1/relawan", RelawanRoutes_1.default);
        this.app.use("/api/v1/simpatisan", SimpatisanRoutes_1.default);
        this.app.use("/api/v1/hasil", HasilPemilihanRoutes_1.default);
        this.app.use("/api/v1/dashboard", DashboardRouter_1.default);
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log("Aplikasi ini berjalan di port " + port);
    console.log(process.env.DB_USER);
});
