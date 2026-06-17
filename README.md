# 🌍 Tour & Travel 2.0

### Immersive E-Commerce & AI Travel Ecosystem

An advanced full-stack tourism platform designed to automate travel discovery, booking workflows, and intelligent travel consulting across East Africa.

Built as an evolution of **Tour & Travel 1.0**, this version introduces:

* 🤖 Context-aware AI travel assistance
* 🗂️ Modular content delivery with Sanity CMS
* 💾 Fault-tolerant MongoDB persistence
* 🌐 Scalable Express API architecture
* 🎨 Fully immersive dark-themed AI concierge interface

---

# 🏗️ System Architecture

The platform follows a decoupled architecture optimized for scalability, maintainability, and resilient service recovery.

```text
       ┌────────────────────────────────────────────┐
       │            Client Application              │
       │         React + Vite + Tailwind CSS        │
       └────────────────────┬───────────────────────┘
                            │
                            ▼
       ┌────────────────────────────────────────────┐
       │            Express API Gateway             │
       │              Port 5000 + CORS              │
       └────────────────────┬───────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
 ┌─────────────────────┐         ┌─────────────────────┐
 │     Persistence     │         │  Intelligence Core  │
 │                     │         │                     │
 │  • MongoDB          │         │  • Gemini 2.5 Flash │
 │  • Sanity CMS       │         │  • Context Engine   │
 │                     │         │  • Response Cache   │
 └─────────────────────┘         └─────────────────────┘
```

---

# 🚀 Technology Stack

## Frontend

* ⚛️ React
* ⚡ Vite
* 🎨 Tailwind CSS
* 📝 React Markdown

Features include:

* Responsive single-page architecture
* Authentication flows
* Booking interfaces
* Real-time AI chat experience
* Dark mode UI

---

## Backend

* Node.js
* Express.js
* REST APIs
* CORS protection
* Request validation

Responsible for:

* Route handling
* Booking processing
* AI orchestration
* User management
* Error isolation

---

## Content Layer

### Sanity CMS

Provides dynamic:

* Destination packages
* Seasonal pricing
* Travel media assets
* Regional experiences

---

## Database Layer

### MongoDB

Stores:

* User accounts
* Booking records
* Chat history
* Inquiry logs

Schema validation ensures data integrity across the application.

---

## AI Layer

Powered by:

### Google Gemini 2.5 Flash

The AI engine injects live CMS context into prompts to ensure recommendations are based on actual package inventory.

Capabilities include:

* Personalized itineraries
* Destination guidance
* Seasonal recommendations
* Travel logistics
* Hallucination reduction through contextual grounding

---

# ⚡ Key Features

---

## 🛒 Tour Booking System

Inherited and improved from Version 1.0.

### Features

* Interactive package catalog
* Historical routes
* Trekking experiences
* Dynamic pricing
* Traveler management
* Special requests
* Date selection workflows

---

## 🔐 Authentication & Profiles

Secure user flows supporting:

* Registration
* Login
* Profile management
* Booking history
* Saved itineraries

---

## 📊 Admin Dashboard

Operational views enable administrators to:

* Manage bookings
* Review inquiries
* Monitor engagement
* Track customer activity

---

# 🤖 AI Concierge System (New in V2.0)

## 🔍 Context-Aware Package Retrieval

Customer queries are enriched using live Sanity CMS inventory data, ensuring that AI recommendations correspond to actual bookable experiences.

---

## 🛡️ Fault-Tolerant Logging

Database failures are isolated from the AI pipeline.

Examples:

* DNS lookup failures
* Network latency
* Temporary MongoDB outages

Even when persistence fails, AI responses remain available.

---

## 🎨 Markdown Rendering Engine

Custom markdown containers provide:

* Safe rendering
* Structured formatting
* Typography consistency

while avoiding common compatibility issues.

---

# ⚙️ Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000

MONGO_URI="mongodb+srv://<username>:<password>@cluster0.hm9pg1p.mongodb.net/tour_and_travel"

GEMINI_API_KEY="AIzaSyYourKey..."

SANITY_PROJECT_ID="your_sanity_project_id"

JWT_SECRET="your_secure_authentication_token_hash"
```

> ⚠️ Never commit secrets to version control.

Ensure `.env` is included in:

```gitignore
.env
```

---

# 💻 Installation

## Prerequisites

* Node.js 18+
* MongoDB Atlas or Local MongoDB
* Sanity CMS Project
* Gemini API Key

---

## Backend Setup

```bash
cd server
npm install
```

---

## Frontend Setup

```bash
cd client
npm install
```

---

# 🚀 Running the Application

### Start Backend

```bash
cd server
node index.js
```

Runs on:

```text
http://localhost:5000
```

---

### Start Frontend

```bash
cd client
npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

# 🛠 API Reference

---

## POST `/api/ai/chat`

Main AI endpoint for customer interactions.

### Request

```json
{
  "userQuery": "Recommend a 7-day Northern circuit"
}
```

### Response

```json
{
  "success": true,
  "response": "### Itinerary..."
}
```

---

## POST `/api/bookings`

Creates a booking record.

### Request

```json
{
  "destinationId": "sanity_id_123",
  "travelersCount": 3,
  "departureDate": "2026-11-12"
}
```

### Response

```json
{
  "success": true,
  "bookingId": "64ef..."
}
```

---

## GET `/api/ai/test`

Development endpoint used to verify:

* Gemini connectivity
* Sanity integration
* AI response pipeline

---

# 🌟 Highlights

* ⚛️ React + Vite Frontend
* 🚀 Express REST API
* 🗂️ Sanity CMS Integration
* 💾 MongoDB Persistence
* 🤖 Google Gemini 2.5 Flash
* 🔐 JWT Authentication
* 📊 Admin Dashboard
* 🛒 E-Commerce Booking System
* 🌍 AI Travel Concierge
* 🎨 Markdown Rendering
* 🛡️ Fault-Tolerant Architecture
* 🌙 Immersive Dark UI

---

## Version

**Tour & Travel 2.0**

Built to deliver intelligent, scalable, and immersive travel experiences across East Africa.
