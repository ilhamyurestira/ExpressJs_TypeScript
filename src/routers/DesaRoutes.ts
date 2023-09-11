import DesaController from "../controllers/DesaController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class DesaRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", DesaController.getDesa);
        this.router.post("/tambah", DesaController.createDesa);
        this.router.get("/:id", DesaController.getDesaById);
        this.router.put("/:id/ubah", DesaController.updateDesa);
        this.router.delete("/:id/hapus", DesaController.deleteDesa);
    }
}

export default new DesaRoutes().router;