# sWerve PH

**Avail Services with Ease — sWerve PH is your go-to platform for discovering, booking, and managing services conveniently in the Philippines.**

## 🚀 Live Demo

🔗 [[https://swerve-teal.vercel.app](https://swerve-teal.vercel.app/))

> ⚠️ Note: Google login works locally. Production login requires correct Supabase OAuth setup and domain whitelisting.

---

## 📆 Tech Stack

* ⚛️ **React** + **TypeScript**
* ⚡️ **Vite** — lightning-fast frontend tooling
* 💅 **shadcn/ui** — accessible, stylish components
* 🌬 **Tailwind CSS** — utility-first styling
* 🔐 **Supabase** — authentication, database, and storage
* ☁️ **Vercel** — fast and easy deployment

---

## ✅ Features

* 🔐 Google Sign-In via Supabase (local setup working)
* 🛙 Product creation and deletion
* ✏️ Edit profile picture and user details
* 🔍 Real-time item search
* 🧱 Category filter functionality
* 🚪 Log out functionality
* Pagination

---

## 🔧 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone [https://github.com/yourusername/swerve-ph.git
   cd swerve-ph](https://github.com/Apoll000000/sWerve.git)
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Check environment variables**

   Create a `.env.local` file:

   ```env
   VITE_SUPABASE_URL=https://hnwlbmmhsusegprhqvpr.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhud2xibW1oc3VzZWdwcmhxdnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NzQ2OTAsImV4cCI6MjA2MDA1MDY5MH0.LjnDvLXEcdoUlehRDxQ6WgLbnslCieW29bYxjO2MXsM
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

---
## 📁 Project Structure

```
public                # Images and static files
src/
├── components/       # Reusable UI components
     ├── ui/          # shadcn reusables
├── lib/              # Supabase client, helpers
├── App.tsx           # Root app structure
└── main.tsx          # Vite entry point
```

---

## 🔍 SEO & Meta Tags

Set in `index.html`:

* Title: `sWerve PH | Avail Services with Ease`
* Meta description & keywords
* Open Graph (social media sharing) tags
* Favicon

---

## 🧹 UI Notes

* Uses **shadcn/ui** components styled with **Tailwind CSS**
* Includes a responsive **carousel** (coming soon or already included)
* Fonts powered by **Google Fonts (Nunito Sans)**

---

## 🛠 To-Do / Roadmap

* ✅ Search, category filters
* ✅ Profile editing
* 📋 Service bookings
* 💬 In-app messaging
* ⭐️ Ratings & reviews
* 🔒 Supabase role-based access control

---

## 🤝 Contributing

Feel free to submit issues, create pull requests, or suggest features!

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact

* **sWerve PH Team**
* Email: leonenpatrickpaul@gmail.com
