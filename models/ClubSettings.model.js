// ============================================
// CLUB SETTINGS MODEL
// ============================================

import mongoose from "mongoose"

const clubSettingsSchema = new mongoose.Schema(
  {
    // Club Info
    clubName: {
      type: String,
      required: true,
      default: "Rotaract Club of AIHT",
    },
    parentClubName: {
      type: String,
      default: "Rotary Club of Chennai chennai silk city",
    },
    collegeName: {
      type: String,
      default: "Anand Institute of Higher Technology",
    },
    rid: {
      type: String,
      default: "3233",
    },

    // Current Year
    currentRotaractYear: {
      type: String,
      required: true,
    },
    yearStartDate: Date,
    yearEndDate: Date,

    // Logos
    clubLogo: String,
    rotaractLogo: String,
    parentClubLogo: String,
    collegeLogo: String,

    // Theme
    themeOfYear: String,
    primaryColor: {
      type: String,
      default: "#0066cc",
    },
    secondaryColor: {
      type: String,
      default: "#ff9800",
    },

    // Content
    aboutRotaract: String,
    missionStatement: String,
    visionStatement: String,
    clubHistory: String,

    // Contact
    contactEmail: String,
    contactPhone: String,
    address: String,

    // Social Media
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String,
      linkedin: String,
      youtube: String,
      website: String,
    },

    // Feature Flags
    features: {
      enableTwoFactor: { type: Boolean, default: false },
      enableEmailNotifications: { type: Boolean, default: true },
      enablePublicGallery: { type: Boolean, default: true },
      maintenanceMode: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
)

// Ensure only one settings document exists
clubSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne()
  if (!settings) {
    settings = await this.create({
      currentRotaractYear: "2025-2026",
    })
  }
  return settings
}

const ClubSettings = mongoose.model("ClubSettings", clubSettingsSchema)

export default ClubSettings
