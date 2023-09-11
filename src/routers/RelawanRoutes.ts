import RelawanController from "../controllers/RelawanController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class RelawanRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", RelawanController.getRelawan);
        this.router.post("/tambah", RelawanController.createRelawan);
        this.router.get("/:id", RelawanController.getRelawanById);
        this.router.put("/:id/ubah", RelawanController.updateRelawan);
        this.router.delete("/:id/hapus", RelawanController.deleteRelawan);
    }
}

export default new RelawanRoutes().router;