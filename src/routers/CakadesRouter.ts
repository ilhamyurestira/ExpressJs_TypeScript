import CakadesController from "../controllers/CakadesController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class CakadesRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", CakadesController.getCakades);
        this.router.post("/tambah", CakadesController.createCakades);
        this.router.get("/:id", CakadesController.getCakadesById);
        this.router.put("/:id/ubah", CakadesController.updateCakades);
        this.router.delete("/:id/hapus", CakadesController.deleteCakades);
    }
}

export default new CakadesRoutes().router;