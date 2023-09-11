import DashboardController from "../controllers/DashboardController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";

class DashboardRoutes extends BaseRoutes {

    public routes(): void {
        // this.router.get("/", DashboardController.getDashboard);
        this.router.get("/report", DashboardController.getReport);
        // this.router.get("/report2", DashboardController.getReport2);
        // this.router.get("/report3", DashboardController.getDetailedReports);
        // this.router.post("/tambah", DashboardController.createDashboard);
        // this.router.get("/:id", DashboardController.getDashboardById);
        // this.router.put("/:id/ubah", DashboardController.updateDashboard);
        // this.router.delete("/:id/hapus", DashboardController.deleteDashboard);
    }
}

export default new DashboardRoutes().router;