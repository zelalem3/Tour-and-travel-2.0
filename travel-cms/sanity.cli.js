import { defineCliConfig } from 'sanity/cli'
require('dotenv').config();

// Now you can access variables via process.env


export default defineCliConfig({
  api: {
    projectId: process.env.PROJECT_ID, // Your project ID
    dataset: process.env.DATASET
  },
  // Add this new section here:
  deployment: {
    appId: process.env.APP_ID,
  }
})