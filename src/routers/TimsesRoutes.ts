import TimsesController from "../controllers/TimsesController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class TimsesRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", TimsesController.getTimses);
        this.router.post("/tambah", TimsesController.createTimses);
        this.router.get("/:id", TimsesController.getTimsesById);
        this.router.put("/:id/ubah", TimsesController.updateTimses);
        this.router.delete("/:id/hapus", TimsesController.deleteTimses);
    }
}

export default new TimsesRoutes().router;