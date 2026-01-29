# MeetingStack

**MeetingStack** is a simple, effective meeting management tool designed to help you organize notes, track action items, and stay productive.

Created by **PS Technologies**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **Authentication**: Secure Sign Up, Login, and Password Recovery.
- **Meeting Management**: Create meetings, take rich notes, and organize your schedule.
- **Action Items**: Built-in to-do list for every meeting. Track what needs to get done.
- **Smart Dashboard**: Filter meetings by title and see your schedule at a glance.
- **Security**: "One Change Per Month" restriction on critical profile updates.
- **Dark Mode**: Sleek, modern interface designed for focus.

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data & Auth**: Supabase
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Supabase account

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YOUR_USERNAME/meeting-stack.git
    cd meeting-stack
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup:**
    Run the SQL scripts provided in the `sql/` folder (or copy from the project root if available) in your Supabase SQL Editor to set up the tables and RLS policies.

5.  **Run Locally:**
    ```bash
    npm run dev
    ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

© 2026 PS Technologies. All rights reserved.
