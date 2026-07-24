# 🎓 Nexus Academy — Premium EdTech Platform for GES & Cambridge Curriculums

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](#license)

**Nexus Academy** is a high-performance, full-stack educational technology platform engineered specifically for students, guardians, certified tutors, and academic administrators across West Africa and international Cambridge track schools. 

Combining **GES WASSCE** and **Cambridge IGCSE/A-Level** curriculum standards, Nexus Academy integrates real-time Google Meet virtual classrooms, Paystack MTN Mobile Money checkout, AI-powered diagnostic grade predictors, collaborative LaTeX whiteboards, and Hubtel WhatsApp/SMS dispatchers.

---

## 🌟 Key Features & Core Modules

### 1. 🛡️ Premium Brand Identity & Custom Emblem
* **Golden Crest Logo**: Features an abstract geometric shield and graduation cap rendered with golden gradients and dynamic shimmer light sweeps.
* **Kente Geometric Watermarks**: Styled with traditional Ghanaian *Kente* pattern accents (`opacity-0.03`) for authentic cultural elegance.
* **Dual-Currency & Timezone Engine**: Instant toggle between **Ghanaian Cedi (GH₵)** and **US Dollars ($)** alongside automatic GMT/WAT/EST timezone conversion.

---

### 2. 🧠 AI Diagnostic Assessment & WASSCE Score Predictor
* **Adaptive Evaluation**: 4-question diagnostic quiz tailored to GES Elective/Core Mathematics, Physics, and Integrated Science.
* **WASSCE Grade Forecasting**: Trajectory prediction models forecasting WAEC grades (**A1 Distinction to F9 Fail**) and Cambridge percentiles (**A* to C**).
* **Gemini AI Topic Breakdown**: Detailed strength/weakness analytics paired with direct tutor booking recommendations to bridge knowledge gaps.

```
       +-------------------------------------------------+
       |      Student Takes Adaptive Diagnostic Quiz     |
       +-------------------------------------------------+
                                |
                                v
       +-------------------------------------------------+
       |      Gemini AI Analyzes Response Patterns      |
       +-------------------------------------------------+
                                |
       +------------------------+------------------------+
       |                                                 |
       v                                                 v
+--------------------------------+             +-------------------+
| Predicted Trajectory: A1 (WAEC)|             | Weakness: Molarity|
+--------------------------------+             +-------------------+
                                                         |
                                                         v
                                               +-------------------+
                                               |  Recommended Tutor|
                                               +-------------------+
```

---

### 3. 🎨 Real-Time Collaborative Whiteboard & LaTeX Math Suite
* **Interactive Slate Canvas**: Dark slate grid board integrated directly inside the Google Meet modal for live tutor-student problem solving.
* **LaTeX Formula Suite**: One-click insertion of complex mathematical equations (Calculus integrals, Quadratic formulas, Einstein energy, Molarity equations).
* **Drawing Tools**: Freehand pen, eraser, multi-color palette (`Amber`, `Emerald`, `Sky`, `Rose`), and stroke adjustments with audio feedback.

---

### 4. 📲 Hubtel & Twilio SMS / WhatsApp Dispatcher
* **Automated Ghana (+233) Alerts**: Instant SMS and official WhatsApp notifications for Google Meet class reminders, payment receipts, and diagnostic scores.
* **Delivery Tracker**: Operations log with delivery reference numbers (`HUBTEL_WA_981204`) and 100% dispatch status tracking.

---

### 5. 💰 Tutor Payout Wallet & GRA Tax Analytics
* **Instant Cashout Portal**: Dedicated financial management tab for certified educators.
* **Ghana Payment Methods**: Supports instant withdrawal to **MTN Mobile Money (*170#)**, GCB Bank, and Ecobank Ghana.
* **Ghana Revenue Authority (GRA) Tax Compliance**: Automatic 5% withholding tax calculation with downloadable tax statements.

---

### 6. 👥 Student Study Groups & Past Paper Forums
* **Peer-to-Peer Communities**: Subject-categorized study rooms (e.g. *WASSCE 2026 Elective Math Distinction Squad*).
* **Past Paper Solutions**: Student questions, tutor-verified marking schemes, upvoting, and tag filtering (`#Calculus`, `#Trigonometry`).

---

### 7. 💳 Paystack MoMo & Google Meet Classroom Integration
* **MTN / Telecel / AT MoMo Gateway**: Simulates official Paystack checkout prompts with USSD PIN confirmation dialogs and realistic audio chimes.
* **Google Meet & Calendar Sync**: In-call messages, student video tiles, presenter controls, and Google Event ID tracking.

---

## 📱 User Roles & Viewports

| Role | Primary Capabilities |
| :--- | :--- |
| 🎓 **Student** | Browse tutors, book sessions, take AI diagnostics, join Google Meet, post in study forums. |
| 👨‍🏫 **Certified Tutor** | Manage hourly rates (GH₵ / $), set datetime availability, launch classes, cash out wallet earnings. |
| 🛡️ **Parent / Guardian** | Download Paystack payment receipts, monitor student attendance, review tutor background checks. |
| ⚙️ **Admin / Operations** | Review tutor credentials, verify certificates, dispatch WhatsApp/SMS notifications, monitor platform GTV. |

---

## 🖥️ Screen Previews & Visual Demos

### 1. Virtual Google Meet Classroom with LaTeX Whiteboard
> *Interactive video grid with dual-view switcher for live freehand whiteboard drawing and formula stamping.*

![Google Meet Whiteboard Preview](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80)

### 2. AI WASSCE Score Trajectory Predictor
> *Adaptive quiz interface displaying predicted WAEC grades (A1-F9) and AI topic breakdown.*

![AI Score Predictor Preview](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80)

### 3. Student Study Groups & Peer Forum
> *Collaborative discussion forum with past paper solutions and tutor marking scheme uploads.*

![Study Groups Forum Preview](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80)

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool & Bundler**: [Vite 5](https://vitejs.dev/)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
* **Animations**: [Motion](https://motion.dev/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Audio Synthesizer**: Custom Web Audio API Sound Engine (USSD keypads, whiteboard markers, payment chimes)

---

## 🚀 Quick Start & Installation

### Prerequisites
* Node.js `v18.0.0` or higher
* npm `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/nexus-academy.git
cd nexus-academy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will launch locally at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p center>
  Developed with ❤️ for Students and Educators across Africa & Abroad.
</p>
