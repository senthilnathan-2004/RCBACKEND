// ============================================
// PUBLIC ROUTES (No Auth Required)
// ============================================

import express from "express"
import {
  getHomepage,
  getAboutRotaract,
  getAboutClub,
  getGallery,
  getEventDetails,
  getContact,
  getCurrentBoardPublic,
} from "../controllers/public.controller.js"

const router = express.Router()

router.get("/homepage", getHomepage)
router.get("/about-rotaract", getAboutRotaract)
router.get("/about-club", getAboutClub)
router.get("/gallery", getGallery)
router.get("/events/:id", getEventDetails)
router.get("/contact", getContact)
router.get("/board", getCurrentBoardPublic)

export default router
