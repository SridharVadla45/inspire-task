# InspireTask PWA

**InspireTask** is a Progressive Web Application (PWA) designed to keep you motivated and focused. It combines a daily motivational quote generator with a robust to-do list manager, all fully functional offline.

## Features

- **Motivational Quotes**: Fetches fresh quotes from an API and caches them for offline inspiration.
- **Smart To-Do List**:
  - Add tasks with deadlines.
  - **Color-Coded Indicators**: 
    - 🔴 Red: Overdue
    - 🟠 Orange: Due within 3 days
    - 🟡 Yellow: Due within 7 days
    - 🟢 Green: Compelted/Safe
- **Offline Support**: Installs as a native app, caches resources via Service Worker, and stores data locally.
- **Data Persistence**: Uses IndexedDB for reliable local storage of tasks.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (CSS Variables, Glassmorphism)
- **Storage**: IndexedDB (Native implementation, no external libraries)
- **PWA**: Custom Service Worker & Web App Manifest

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd inspire-task
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npx preview
   ```

## Offline Testing

1. Open the app in Chrome.
2. Open DevTools (F12) -> **Application** tab.
3. Go to **Service Workers** and check "Offline".
4. Refresh the page. The app should load, serve cached quotes, and allow adding/viewing tasks.

## Assumptions & Credits

- Uses [Quotable API](https://github.com/lukePeavey/quotable) for quotes.
- Icons are placeholders for demonstration purposes.
