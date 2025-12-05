// ============================================
// AUTH ROUTES
// ============================================

import express from "express"
import {
  register,
  login,
  adminLogin,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  setup2FA,
  verify2FA,
  disable2FA,
  getMe,
  checkLoginStatus,
} from "../controllers/auth.controller.js"
import { protect, verifyRefreshToken } from "../middleware/auth.middleware.js"
import { userValidation } from "../middleware/validation.middleware.js"

const router = express.Router()

// Public routes
// Register route removed - admins add members manually
router.get("/check-login-status", checkLoginStatus)
router.post("/login", userValidation.login, login)
router.post("/admin-login", userValidation.adminLogin, adminLogin)
router.post("/forgot-password", forgotPassword)
router.put("/reset-password/:token", resetPassword)
router.post("/refresh-token", verifyRefreshToken, refreshToken)

// Protected routes
router.use(protect)
router.post("/logout", logout)
router.get("/me", getMe)
router.put("/change-password", userValidation.changePassword, changePassword)
router.post("/setup-2fa", setup2FA)
router.post("/verify-2fa", verify2FA)
router.post("/disable-2fa", disable2FA)

export default router
