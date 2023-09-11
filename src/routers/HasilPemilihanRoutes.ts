import HasilPemilihanController from "../controllers/HasilPemilihanController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class HasilPemilihanRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", HasilPemilihanController.getHasilPemilihan);
        this.router.get("/report", HasilPemilihanController.getReport);
        this.router.get("/report2", HasilPemilihanController.getReport2);
        this.router.get("/report3", HasilPemilihanController.getDetailedReports);
        this.router.post("/tambah", HasilPemilihanController.createHasilPemilihan);
        this.router.get("/:id", HasilPemilihanController.getHasilPemilihanById);
        this.router.put("/:id/ubah", HasilPemilihanController.updateHasilPemilihan);
        this.router.delete("/:id/hapus", HasilPemilihanController.deleteHasilPemilihan);
    }
}

export default new HasilPemilihanRoutes().router;