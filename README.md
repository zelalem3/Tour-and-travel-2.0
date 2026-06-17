# Ethiopia Tour & Travel Platform

A full-stack, dynamic travel application designed to showcase Ethiopian tourism. This project leverages a headless CMS architecture to provide a seamless experience for both travelers and site administrators.

---

## 🚀 Features

* **Dynamic Tour Management:** Automated routing for Tour and Destination detail pages using slugs.
* **Headless Content Control:** Powered by Sanity.io for real-time updates to itineraries and travel guides.
* **Tailor-Made Inquiries:** Custom travel request system integrated with EmailJS for direct communication.
* **Advanced Data Fetching:** Optimized GROQ queries for high-performance content delivery.
* **Responsive & SEO Ready:** Mobile-first design with dynamic meta tags for search engine visibility.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, Vite |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity.io (Headless) |
| **Query Language** | GROQ |
| **Forms/Email** | EmailJS |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```text
├── client/   # React Application
│   ├── src/
│   │   ├── components/     # UI elements (Navbar, Cards, Footer)
│   │   ├── pages/          # Dynamic Detail & Listing pages
│   │   ├── lib/            # Sanity client & API config
│   └── ...
├── travel-cms/     # Sanity Studio (Backend)
│   ├── schemas/            # Data models (Tour, Destination, Post)
│   └── ...
```
## ⚙️ Setup and Installation
1. Backend (Sanity Studio)
```Bash

cd tour-travel-sanity
npm install
npm run dev
```
2. Frontend (React)
```Bash

cd tour-travel-frontend
npm install
npm run dev

```

3. Environment Variables
Create a .env file in the tour-travel-frontend root:

Code snippet

VITE_SANITY_PROJECT_ID=your_id_here
VITE_SANITY_DATASET=production
## 🔧 Data Models (Schemas)
The CMS is structured with the following primary schemas:

Tour: Handles pricing, duration, itineraries, and gallery.

Destination: Detailed information on specific regions and landmarks.

Post: For the travel guide and blog section.

TailorMade: Captures user-specific inquiry data.

## 🌐 Deployment
Frontend: Automatically deployed to Vercel via GitHub integration.

CMS: Content and Studio hosted on Sanity Cloud.


## 👤 Author
Zelalem Getnet - Lead Developer - Your GitHub Profile

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
