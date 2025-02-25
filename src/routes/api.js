import express from "express";
const router = express.Router();
import * as Controller from "../controllers/UserControllers.js"; // Assuming you have the right methods in your controllers
import AuthMiddleware from "../middlewares/AuthVerification.js"; // Assuming you have your auth middleware

// User Registration
router.post("/registration", Controller.registration);
//user Login with token cookie
router.post("/login", Controller.loginUser);
//user Logout Cookie deleted
router.get("/logout", AuthMiddleware, Controller.logoutUser);

router.post("/createPortfolio", AuthMiddleware, Controller.createPortfolio);
router.get("/getAllPortfolios", AuthMiddleware, Controller.getAllPortfolios);
router.post("/updatePortfolio/:id", AuthMiddleware, Controller.updatePortfolio);
router.get("/deletePortfolio/:id", AuthMiddleware, Controller.deletePortfolio);

export default router;
