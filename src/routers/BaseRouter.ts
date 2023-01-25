import { Router } from "express";

//Import Base Controller
import IRouter from "./Route_Interface";

abstract class BaseRoutes implements IRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();    
    }

    abstract routes(): void;
}

export default BaseRoutes;