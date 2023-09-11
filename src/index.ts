import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";

//Router
import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";
import TodoRoutes from "./routers/TodoRoutes";
import CakadesRoutes from "./routers/CakadesRouter";
import DesaRoutes from "./routers/DesaRoutes";
import TimsesRoutes from "./routers/TimsesRoutes";
import RelawanRoutes from "./routers/RelawanRoutes";
import SimpatisanRoutes from "./routers/SimpatisanRoutes";
import HasilPemilihanRoutes from "./routers/HasilPemilihanRoutes";
import DashboardRouter from "./routers/DashboardRouter";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route("/").get((req, res) => {
            res.send("ini route menggunakan TypeScript");
        });

        this.app.route("/users").post((req, res) => {
            res.send(req.body);
        });

        this.app.use("/api/v1/users", UserRoutes);
        this.app.use("/api/v1/auth", AuthRoutes);
        this.app.use("/api/v1/todos", TodoRoutes);
        this.app.use("/api/v1/cakades", CakadesRoutes);
        this.app.use("/api/v1/desa", DesaRoutes);
        this.app.use("/api/v1/timses", TimsesRoutes);
        this.app.use("/api/v1/relawan", RelawanRoutes);
        this.app.use("/api/v1/simpatisan", SimpatisanRoutes);
        this.app.use("/api/v1/hasil", HasilPemilihanRoutes);
        this.app.use("/api/v1/dashboard", DashboardRouter);
    }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log("Aplikasi ini berjalan di port " + port);

    console.log(process.env.DB_USER);
});