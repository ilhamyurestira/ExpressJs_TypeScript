import SimpatisanController from "../controllers/SimpatisanController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class SimpatisanRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", SimpatisanController.getSimpatisan);
        this.router.post("/tambah", SimpatisanController.createSimpatisan);
        this.router.get("/:id", SimpatisanController.getSimpatisanById);
        this.router.put("/:id/ubah", SimpatisanController.updateSimpatisan);
        this.router.delete("/:id/hapus", SimpatisanController.deleteSimpatisan);
    }
}

export default new SimpatisanRoutes().router;