# 🏃‍♂️ JP Morgan Run Training Tracker

A Progressive Web App (PWA) designed to track your 14-week training journey for the JP Morgan Corporate Challenge 5.6km race on April 16, 2026.

## Features

- **Home (Dashboard)**: Real-time race countdown, weekly progress tracking, and overall training statistics
- **Plan**: View all 14 weeks with scheduled runs, track progress against targets (X/56 completed)
- **Run Logging**: Easily log completed runs or missed workouts with notes
- **Analytics**: Pace trends chart, weekly volume chart, weekly run count, and summary statistics
- **History**: View all your training history with week-by-week filtering, delete incorrect runs
- **Weekly Reflections**: Track what's working and what's challenging
- **Offline Support**: Works completely offline after first load
- **No Account Required**: All data stored locally on your device (privacy-first)
- **Installable**: Add to your home screen for a native app experience

## Installation on Google Pixel

### Method 1: Deploy to Vercel (Recommended)

1. **Fork or clone this repository to your GitHub account**

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com/)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Select this repository
   - Click "Deploy" (no configuration needed)
   - Wait for deployment to complete
   - You'll get a URL like `https://your-app.vercel.app`

3. **Install on your Pixel:**
   - Open the Vercel URL in Chrome on your Pixel
   - Tap the menu (⋮) in the top right
   - Select "Install app" or "Add to Home Screen"
   - Tap "Install"
   - The app icon will appear on your home screen
   - Open it like any native app!

### Method 2: Deploy via GitHub Pages

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com/)
   - Click "New repository"
   - Name it "run-tracker" (or any name you like)
   - Make it public
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Initial commit: Run tracker PWA"
   git remote add origin https://github.com/YOUR_USERNAME/run-tracker.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Click "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at `https://YOUR_USERNAME.github.io/run-tracker/running-tracker.html`

4. **Install on your Pixel:**
   - Open the GitHub Pages URL in Chrome
   - Follow the same installation steps as Method 1

## How to Use

### Dashboard Screen
- View days remaining until race day
- Check your current week's progress (aim for 3-4 runs per week)
- See overall stats: total runs, kilometers, average pace, and streak
- Quick access to today's planned workout

### Plan Screen
- View all 14 weeks in accordion format (color-coded by training phase)
- See overall progress (X/56 runs completed) with visual progress bar
- Track per-week completion (X/4 runs per week)
- View scheduled runs with target paces
- See checkmarks (✅/❌) for completed/missed runs
- Compare actual pace vs target pace for each run
- Current week auto-expands on load

### Log Run Screen
- Select the date (defaults to today)
- Mark if you completed the run or missed it
- If completed: Enter duration, distance, how it felt, and optional notes
- If missed: Optionally note why (helps identify patterns)
- Pace is calculated automatically

### Analytics Screen
- **Pace Trend Chart**: Line chart showing your pace progression (last 10 runs)
- **Weekly Volume**: Bar chart showing total kilometers per week
- **Weekly Run Count**: Bar chart showing completed runs per week (X/4)
- **Summary Stats**: Fastest pace, slowest pace, total distance, total time
- All charts update in real-time as you log runs

### History Screen
- View all logged runs in chronological order
- Filter by week using the week buttons
- Green border = completed runs
- Red border = missed runs
- See your pace and notes for each run

### Reflections Screen
- Complete a weekly reflection every Sunday
- Track bedtime discipline
- Note what almost stopped you
- Note what worked well
- Rate your week (1-5 stars)
- View past reflections to see your progress

## Training Plan Overview

**Duration:** 14 weeks (January 13 - April 16, 2026)
**Training Days:** Monday, Wednesday, Friday, Sunday (4 days/week)
**Race:** 5.6km on April 16, 2026
**Target Time:** Sub-30 minutes (5:20/km pace)

### Training Phases

1. **Weeks 1-4:** Rebuild Your Base - Easy running to build aerobic fitness
2. **Weeks 5-9:** Build Endurance + Add Speed - Tempo runs and intervals introduced
3. **Weeks 10-13:** Race Sharpening - Practice race pace and faster
4. **Week 14:** Taper Week - Rest up for race day

## Success Framework

**Tier 1 Success (Most Important):**
- Complete 45+ of 56 scheduled runs (80% completion rate)
- Run 4x/week for at least 11 of 14 weeks
- Prove to yourself you can commit

**Tier 2 Success:**
- Finish the 5.6km race without walking
- Beat your 2024 equivalent pace

**Tier 3 Success (Bonus):**
- Sub-30 minute finish time

## Data & Privacy

- **100% Local Storage:** All data stays on your device
- **No Account Required:** No sign-up, no passwords
- **No Cloud Sync:** Privacy-first design
- **No Tracking:** No analytics or third-party scripts

**Important:** Your data is stored in your browser's LocalStorage. If you:
- Clear browser data
- Uninstall Chrome
- Switch devices

...your data will be lost. Consider taking periodic screenshots as backup!

## Technical Details

**Stack:**
- Pure HTML, CSS, JavaScript (no frameworks)
- Progressive Web App (PWA) with offline support
- LocalStorage for data persistence
- Service Worker for offline functionality

**Browser Compatibility:**
- Chrome/Edge (recommended)
- Safari
- Firefox

**Device Compatibility:**
- Android (Google Pixel optimized)
- iOS
- Desktop (works but mobile-optimized)

## Support

This is a personal training tracker with no external support system. All functionality is self-contained and documented here.

## Race Day Strategy

**Target Splits for Sub-30min:**
- Km 1: 5:25 (controlled start)
- Km 2: 5:20 (settle into rhythm)
- Km 3: 5:20 (mental focus)
- Km 4: 5:15 (start pushing)
- Km 5: 5:15 (maintain pressure)
- Last 600m: Give everything!

**Total Target:** ~29:45 (15-second buffer)

## Tips for Success

1. **Log runs immediately after completing them** - Don't wait or you'll forget details
2. **Complete Sunday reflections every week** - They help identify patterns
3. **Follow the 2-Day Rule** - Can skip 1 run, but never 2 consecutive ones
4. **Early mornings in Singapore** - Run before 7am to avoid heat/humidity
5. **Trust the process** - Consistency beats perfection

## Version

**Current Version:** 1.2
**Created:** January 10, 2026
**Last Updated:** January 10, 2026
**Race Date:** April 16, 2026
**First Training Run:** January 13, 2026

**Version History:**
- **v1.0:** Initial release with 5 core screens (Home, Plan, Log, History, Reflect)
- **v1.1:** Added delete functionality for logged runs with confirmation dialog
- **v1.2:** Added Analytics screen with pace trends, weekly volume charts, and summary stats; fixed PWA caching issue

---

**Remember:** The app is not the achievement. The 56 runs are the achievement. The app just makes them visible.

🏃‍♂️ Good luck! You've got this.
