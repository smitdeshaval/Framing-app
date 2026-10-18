# 🌾 KisanConnect (किसान कनेक्ट)
### India's Farmer-to-Buyer Direct Agricultural Marketplace

> **Eliminating middlemen (arhtiyas & brokers) and delivering real-time Mandi price transparency to Indian agriculture.**

[![Node.js](https://img.shields.io/badge/Node.js-v24.19-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

---

## 📌 1. Project Overview & Socio-Economic Context

In India's conventional agricultural supply chain (**APMC Mandi System**), small and marginal farmers lose between **30% and 50%** of their potential revenue to non-value-adding intermediaries:
- **Arhtiyas & Commission Agents**: Charge 6%–12% informal auction cuts.
- **Weighment & Handling Leakages**: Unregulated grading and tare deductions.
- **Delayed Cash Settlement**: Farmers are often paid on credit while brokers profit immediately.

**KisanConnect** provides direct digital market access:
1. **Direct Trade**: Farmers sell directly to bulk buyers (retail chains, wholesalers, food processors, consumers) with **0% commission**.
2. **Price Transparency**: Every crop listing is automatically cross-referenced against the official **Agmarknet Mandi Modal Price** for that region.
3. **Immediate Communication**: Direct Phone & WhatsApp connect links enable quick negotiations without platform lock-in.

---

## 🏗️ 2. System Architecture

```
[ Frontend: React + Tailwind CSS + Lucide Icons (Port 5173) ]
                              │
                  (REST API via JSON / Multipart)
                              ▼
        [ Backend: Node.js + Express.js API (Port 5000) ]
        ┌─────────────────────┴─────────────────────┐
        ▼                                           ▼
[ Auth & Core Controllers ]             [ Mandi Intelligence Engine ]
  • JWT Authentication                   • Agmarknet Reference Dataset
  • Farmer/Buyer Roles                   • Price Deviation Calculator
  • Crop Listings CRUD                   • Fair-Price Advisory Model
  • Inquiry Negotiation Inbox            • Middleman Savings Engine
        │                                           │
        └─────────────────────┬─────────────────────┘
                              ▼
  [ Zero-Config Hybrid Persistence Layer: MongoDB / Embedded Store ]
```

---

## 📂 3. Folder & File Structure

```text
Antigravity/
├── backend/                        # Node.js + Express REST API
│   ├── config/
│   │   └── db.js                   # Zero-config hybrid DB (Mongo + JSON datastore)
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, JWT verification
│   │   ├── listingController.js    # Crop CRUD, Mandi comparison calculation
│   │   ├── inquiryController.js    # Buyer purchase requests & farmer inbox
│   │   └── mandiController.js      # Mandi directory & Smart Advisory model
│   ├── data/
│   │   ├── mandiPrices.json        # Reference Agmarknet prices across Indian hubs
│   │   └── store.json              # Local persistent datastore (auto-seeded)
│   ├── middleware/
│   │   ├── auth.js                 # JWT auth & role-based guards
│   │   └── upload.js               # Multer photo upload handling
│   ├── models/
│   │   ├── User.js                 # User schema (farmer/buyer)
│   │   ├── Listing.js              # Produce listing schema
│   │   ├── Inquiry.js              # Buyer inquiry schema
│   │   └── MandiPrice.js           # Mandi price reference schema
│   ├── routes/                     # API route declarations
│   ├── scripts/
│   │   └── seed.js                 # Database seeder with realistic demo data
│   ├── uploads/                    # Local storage directory for crop photos
│   ├── server.js                   # Express server entry point
│   └── package.json
│
├── frontend/                       # React.js Single Page Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Role-aware responsive navigation bar
│   │   │   ├── Footer.jsx          # Educational capstone footer & helplines
│   │   │   ├── CropCard.jsx        # Produce card with price & mandi badges
│   │   │   └── MandiBadge.jsx      # Visual flags (Below/At/Above Mandi rate)
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # User session & role management
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Hero, ticker, middleman savings calculator
│   │   │   ├── BrowsePage.jsx      # Filter by crop, state, district & price
│   │   │   ├── ListingDetailPage.jsx # Full crop specs, WhatsApp & inquiry modal
│   │   │   ├── FarmerDashboard.jsx # Crop manager, sold toggles, buyer inbox
│   │   │   ├── MandiTrackerPage.jsx# Market prices table & predictive advisory
│   │   │   ├── BuyerInquiriesPage.jsx # Inquiries sent tracker
│   │   │   └── AuthPage.jsx        # Login/Signup with 1-click viva demo buttons
│   │   ├── services/
│   │   │   └── api.js              # Centralized API client with JWT handling
│   │   ├── App.jsx                 # Master application controller
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js          # Agricultural theme styling
│   └── package.json
│
└── README.md
```

---

## 🚀 4. How to Run Locally

### Prerequisites
- Node.js (v18 or newer recommended, tested on v24)
- npm (v9 or newer)

### Step 1: Start Backend Server
```powershell
cd d:\Antigravity\backend
npm install
npm run seed      # (Optional) Populates sample Indian crops and accounts
npm start         # Runs API on http://localhost:5000
```

### Step 2: Start Frontend Application
Open a second terminal window:
```powershell
cd d:\Antigravity\frontend
npm install
npm run dev       # Runs Vite on http://localhost:5173
```
Open **http://localhost:5173** in your browser.

---

## 🔑 5. Pre-Configured Demo Accounts (Viva / Evaluation)

For rapid demonstration during presentations, one-click demo buttons are provided on the Login page:

| Role | Name | Phone / Login | Password | Location |
| :--- | :--- | :--- | :--- | :--- |
| **Farmer** | Ramesh Patel | `9876543210` | `password123` | Sehore, Madhya Pradesh |
| **Farmer** | Harpreet Singh | `9812345678` | `password123` | Ludhiana, Punjab |
| **Buyer (Wholesale)** | Rajesh Gupta | `9988776655` | `password123` | Delhi Terminal |
| **Buyer (Retailer)** | Pooja Verma | `9123456789` | `password123` | Indore, Madhya Pradesh |

---

## 💡 6. Viva & Interview Questions Guide

### Q1: How does the Mandi Price Transparency Engine work?
> **Answer**: When a farmer enters their price per unit, the backend normalizes the unit (e.g. quintals, kg, or tons) and queries the nearest APMC Mandi modal benchmark (from Agmarknet reference records). The algorithm calculates:
> $$\text{Price Diff} = \text{Farmer Price} - \text{Mandi Modal Price}$$
> If $\text{Price Diff} < -₹50$, the system awards a 🟢 **"Below Mandi Rate"** badge, signaling to buyers that they are receiving an auction-level deal without commission cuts.

### Q2: How is zero-downtime persistence achieved without a live MongoDB daemon?
> **Answer**: The data access layer in [`backend/config/db.js`](file:///d:/Antigravity/backend/config/db.js) implements a hybrid adapter. If a MongoDB connection string (`MONGODB_URI`) is reachable, it delegates queries to Mongoose. If MongoDB is absent or offline, it gracefully falls back to an ACID-safe JSON datastore (`backend/data/store.json`). This ensures that examiners can evaluate the project offline without setting up database clusters.

### Q3: How do buyers and farmers communicate securely?
> **Answer**: Buyers can either send an in-app structured inquiry (quantity, offered price, delivery terms) or initiate direct communication via click-to-call (`tel:`) or encrypted direct WhatsApp messaging with pre-formatted purchase text.

---

## 📜 7. License
Developed under the MIT License for educational capstone, portfolio, and hackathon presentation.
