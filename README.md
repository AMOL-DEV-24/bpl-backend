# BPL Backend 
# 🏏 BPL Official Backend API

A production-ready backend system for the **BPL Official Cricket Platform**, built using **Node.js, Express, TypeScript, and MongoDB Atlas**.

This backend powers the entire BPL ecosystem including:
- Player registration system
- Match management
- Points table & statistics
- Payment system (Razorpay)
- Image uploads (Cloudinary)
- Authentication & security
- Background jobs & notifications

---

# 🚀 Live Features

✔ Player Registration System  
✔ Match Scheduling & Management  
✔ Live Match Data Support  
✔ Points Table Calculation  
✔ Secure Payment Integration (Razorpay)  
✔ Player Stats Tracking  
✔ Image Upload System (Cloudinary)  
✔ Email & SMS Notifications  
✔ Role-based Authentication  
✔ Scalable Modular Architecture  

---

# ⚙️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas + Mongoose
- Razorpay API
- Cloudinary API
- JWT Authentication
- Multer (File Uploads)
- Nodemailer (Email Service)
- Helmet (Security)
- CORS (API Security)
- Morgan (Logging)

---

# 📁 Project Architecture
src/
├── app.ts
├── server.ts
├── config/
├── api/
├── modules/
│ ├── player/
│ ├── match/
│ ├── pointsTable/
│ ├── payment/
│ ├── stats/
│ ├── upload/
├── shared/
│ ├── middlewares/
│ ├── utils/
│ ├── constants/
│ ├── types/
├── database/
├── jobs/
├── queue/
├── health/
├── docs/


---

# 🚀 Getting Started (Local Setup)

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/bpl-backend.git
cd bpl-backend

2. Install Dependencies
npm install
3. Setup Environment Variables

PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

4. Run Development Server
npm run dev

Server runs at:

http://localhost:5000
5. Build Project (TypeScript → JavaScript)
npm run build

Output:

dist/server.js
6. Run Production Build
npm start