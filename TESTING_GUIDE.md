# Complete Testing Guide - JP Morgan 5.6K Training App

## Testing Date: 2026-01-11
## All Enhancements & Bug Fixes Ready for Testing

---

## ✅ What's Been Fixed & Enhanced

### Critical & High Priority Bugs Fixed (8):
1. **Missing `toggleInputMode()` function** - Fixed
2. **Duplicate DOMContentLoaded listeners** - Fixed
3. **Conflicting initialization logic** - Fixed
4. **Event object dependency in `filterHistory()`** - Fixed
5. **Missing input validation in goal screen** - Fixed
6. **Calendar color inconsistency** - Fixed
7. **Beginner suggestion persistence** - Fixed
8. **Goal next button validation** - Fixed

### Medium Priority Issues Fixed (5):
9. **localStorage error handling** - Added safe helpers
10. **Previous time validation** - Added range checks
11. **Null checks in `calculatePaceZones()`** - Added
12. **Minimum weeks validation** - Added (4-week minimum)
13. **Clear previous time on experience change** - Fixed

### Enhancements Added:
- **Loading states**: Spinner animation during plan generation
- **Debounced inputs**: 300ms debounce on goal feedback
- **Enhanced analytics**: New weekly volume graph with gradient colors
- **Screen transitions**: Smooth slide animations
- **Micro-interactions**: Button hover, press effects, choice card animations

---

## 🧪 How to Test

### Prerequisites
1. Open `jp-custom-trainer.html` in Chrome
2. Open Developer Console (F12 or Cmd+Option+I on Mac)
3. Clear localStorage: Run `localStorage.clear()` in console
4. Refresh the page

---

## Test 1: Complete Onboarding Flow (New User)

### Step 1: Welcome Screen ✓
- **Check**: Days countdown shows correct number (96 days from today)
- **Check**: Race date displays: "April 16, 2026 • 5:00 PM"
- **Check**: Typography looks clean and consistent
- **Action**: Click "Create My Training Plan"
- **Expected**: Smooth slide animation to Screen 2

### Step 2: Your Details ✓
- **Check**: Screen slides in from right
- **Action**: Leave name empty, click "Next"
- **Expected**: Alert says "Please enter your name"
- **Action**: Enter name "Test Runner" and click "Next"
- **Expected**: Smooth transition to Screen 3
- **Verify in console**:
  ```javascript
  JSON.parse(localStorage.getItem('onboarding_data')).name
  // Should show: "Test Runner"
  ```

### Step 3: Running Experience ✓
- **Test Beginner Flow:**
  - Click "No" card
  - **Expected**: Card highlights with scale animation
  - **Expected**: Previous time section stays hidden
  - Click "Next"
  - **Expected**: Transition to Screen 4

- **Test on Screen 4 (Beginner):**
  - **Check**: Yellow beginner suggestion card appears
  - **Check**: 37:00 pre-filled in target time
  - **Check**: Feedback shows "That's 6:36/km"
  - **Go back to Screen 3**

- **Test Experienced Flow:**
  - Click "Yes" card
  - **Expected**: Previous time section appears
  - **Expected**: Previous time inputs are empty (cleared from earlier)
  - Enter 32 min, 30 sec
  - Click "Next"

- **Test on Screen 4 (Experienced):**
  - **Check**: Beginner suggestion is hidden
  - **Check**: Target time fields are empty

### Step 4: Your Goal (Input Validation) ✓
- **Test Time Mode:**
  - Enter 30 min, 0 sec
  - **Expected**: Debounced feedback update (300ms delay)
  - **Expected**: Shows "That's 5:21/km"
  - **Expected**: Next button becomes enabled
  - **Check**: Button hover effect (lifts up slightly)

- **Test Invalid Inputs:**
  - Try entering 10 min (too fast)
  - **Expected**: Feedback doesn't show, button stays disabled
  - Try entering 100 min (too slow)
  - **Expected**: Feedback doesn't show, button stays disabled
  - Enter valid time: 30 min, 0 sec
  - **Expected**: Validation passes

- **Test Pace Mode:**
  - Click "Target Pace" button
  - **Check**: Button press animation
  - **Expected**: Input switches to pace mode
  - Enter 5 min, 30 sec per km
  - **Expected**: Shows "Finish time: 30:48"
  - Click "Next"
  - **Expected**: Smooth transition

### Step 5: Your Weekly Schedule ✓
- **Test Day Selection:**
  - Click Monday
  - **Expected**: Card highlights with scale-in animation
  - **Expected**: Counter shows "1 / 3"
  - Click Wednesday and Sunday
  - **Expected**: Counter shows "3 / 3"
  - **Expected**: Other days become dimmed
  - Try clicking Friday (4th day)
  - **Expected**: Nothing happens (can't select 4th)
  - Click Monday to deselect
  - **Expected**: Counter shows "2 / 3", button disables
  - Click Monday again
  - **Expected**: Button re-enables
  - Click "Next"

### Step 6: Travel Dates ✓
- **Check Calendar Rendering:**
  - **Check**: Calendar renders within 100ms
  - **Check**: Past dates are grayed out
  - **Check**: Future dates have light background with dark text

- **Test Date Selection:**
  - Click Feb 14
  - **Expected**: Turns pink (#FF2D55) - no more color inconsistency
  - **Expected**: Appears in chips list below
  - Click Feb 15, Feb 16
  - **Expected**: All dates show pink consistently
  - Click "×" on Feb 15 chip
  - **Expected**: Removes from list, calendar updates
  - Click "Next"

### Step 7: Plan Preview & Loading State ✓
- **Check Loading State:**
  - **Expected**: Loading overlay appears with spinner
  - **Expected**: Text says "Generating your training plan..."
  - **Expected**: Overlay disappears after <1 second

- **Check Plan Summary:**
  - **Check**: Shows training period (e.g., "13 weeks")
  - **Check**: Shows total workouts (e.g., "39 runs")
  - **Check**: Shows your 3 training days
  - **Check**: Shows all 4 pace types: Race, Easy, Tempo, Interval
  - **Check**: Typography uses CSS variables (clean, consistent)

- **Check First 2 Weeks Preview:**
  - **Check**: Workouts display on correct days
  - **Check**: Dates are in the future
  - **Check**: Travel dates (Feb 14, 16) are excluded

- **Data Validation:**
  ```javascript
  const plan = JSON.parse(localStorage.getItem('generated_plan'));
  console.log('Weeks:', plan.weeksTotal); // Should be ~13
  console.log('Pace Zones:', plan.paceZones);
  console.log('Has Race Pace:', plan.paceZones.race); // Should exist
  console.log('First Week:', plan.plan[1]); // Should have 3 workouts
  ```

- **Click "Start Training"**
  - **Expected**: Alert with congratulations
  - **Expected**: Transition to main app

---

## Test 2: Main App Functionality

### Dashboard Screen ✓
- **Check**: Current week calculation is correct
- **Check**: Days until race is accurate
- **Check**: Progress bar shows correct percentage
- **Check**: Stats display properly
- **Check**: Typography is consistent

### Plan Screen ✓
- **Check**: Accordion opens/closes smoothly
- **Check**: Shows workouts for your 3 selected days only
- **Check**: Week numbers are correct
- **Check**: Pace information displays properly

### Log Screen ✓
- **Test Adding a Run:**
  - Select today's date
  - Mark as completed
  - Enter 5.6 km distance
  - Enter 30 min duration
  - Select "Great!" feeling
  - Add notes
  - Click "Save Run"
  - **Expected**: Button press animation
  - **Expected**: Success alert
  - **Expected**: Dashboard updates

- **Verify localStorage:**
  ```javascript
  const runs = JSON.parse(localStorage.getItem('runs'));
  console.log('Total runs:', runs.length); // Should be 1
  console.log('Latest run:', runs[runs.length - 1]);
  ```

### Analytics Screen ✓
- **Check New Weekly Volume Graph:**
  - **Check**: Summary stats at top (Total, Avg/Week)
  - **Check**: Gradient colored bars (pink to purple)
  - **Check**: Current week marked with pulsing dot
  - **Check**: Bar labels show km values
  - **Check**: Legend at bottom
  - **Check**: Smooth bar animations

- **Check Pace Progress:**
  - **Check**: Line chart displays
  - **Check**: Shows pace trend
  - **Check**: Target pace line visible

### History Screen ✓
- **Test Week Filtering:**
  - Click "Week 1" button
  - **Expected**: Button press animation
  - **Expected**: Filters to week 1 runs only
  - Click "All" button
  - **Expected**: Shows all runs

### Reflect Screen ✓
- **Test Adding Reflection:**
  - Select week 1
  - Fill in "almost stopped" moment
  - Fill in "worked well" section
  - Rate week 1-5
  - Click "Save Reflection"
  - **Expected**: Success message

### Settings Screen ✓
- **Test Edit Plan:**
  - Click "Edit My Plan"
  - **Expected**: Confirmation dialog
  - Confirm
  - **Expected**: Returns to Screen 4 (Goal)
  - **Check**: Previous values pre-filled
  - Change target to 28:00
  - Complete through to preview
  - **Expected**: New plan generated with updated pace

---

## Test 3: Bug Fixes Verification

### ✅ Test Fix #1: Input Validation
- Go to Goal screen
- Try entering 5 min (too fast)
- **Expected**: Feedback doesn't show, button disabled
- Enter 30 min
- **Expected**: Validation passes

### ✅ Test Fix #2: Event Handling
- Go to History screen
- Click week filter buttons
- **Expected**: No console errors
- **Expected**: Active button highlights correctly

### ✅ Test Fix #3: localStorage Safety
- Open console
- Run: `localStorage.setItem('test', 'x'.repeat(10000000))`
- **Expected**: If quota exceeded, see error alert
- **Expected**: App continues to function

### ✅ Test Fix #4: Calendar Colors
- Go to Travel screen
- Select multiple dates
- **Expected**: All use consistent pink color (#FF2D55)
- **Expected**: No blue dates

### ✅ Test Fix #5: Beginner Suggestion
- Start new onboarding
- Select "Yes" on experience
- Go to Goal screen
- **Expected**: No beginner suggestion visible
- Go back, select "No"
- Go to Goal screen
- **Expected**: Beginner suggestion appears with pre-fill

### ✅ Test Fix #6: Previous Time Clearing
- On Experience screen
- Select "Yes", enter 32:30
- Switch to "No"
- Switch back to "Yes"
- **Expected**: Time inputs are cleared

---

## Test 4: Animations & Interactions

### Screen Transitions ✓
- Navigate between onboarding screens
- **Expected**: Smooth slide-in animations (400ms)
- **Expected**: No jank or lag
- **Expected**: Consistent timing

### Button Micro-Interactions ✓
- Hover over primary buttons
- **Expected**: Lifts up (-1px translateY)
- **Expected**: Shadow enhances
- Click button
- **Expected**: Scale down animation (0.98)
- **Expected**: Subtle press effect

### Choice Card Interactions ✓
- Hover over choice cards
- **Expected**: Card lifts up (-4px)
- **Expected**: Border glows pink
- Click to select
- **Expected**: Scale-in animation
- **Expected**: Gradient background appears

### Loading States ✓
- Trigger plan generation
- **Expected**: Spinner appears immediately
- **Expected**: Smooth fade-in
- **Expected**: Hides after completion
- **Expected**: No screen flicker

---

## Test 5: Data Persistence

### Test 1: Refresh After Onboarding
1. Complete onboarding
2. Refresh page (Cmd+R)
3. **Expected**: Shows main app, not welcome screen
4. **Expected**: All data persists
5. Check console:
   ```javascript
   localStorage.getItem('onboarding_data') !== null // true
   localStorage.getItem('generated_plan') !== null // true
   ```

### Test 2: Close and Reopen
1. Close browser tab
2. Reopen `jp-custom-trainer.html`
3. **Expected**: App state restored
4. **Expected**: Logged runs still present

### Test 3: Clear Specific Data
1. Run: `localStorage.removeItem('runs')`
2. Refresh
3. **Expected**: No runs in history
4. **Expected**: Plan still exists

---

## 🐛 Known Issues to Watch For

### Critical (Should be Fixed):
- ✅ All critical issues resolved

### If You Find New Bugs:
Document here:

**Bug #**:
**Screen**:
**Steps to Reproduce**:
1.
2.

**Expected**:
**Actual**:
**Console Error** (if any):
**Severity**: Critical / High / Medium / Low

---

## ✨ Success Criteria

- [ ] All onboarding screens accessible and functional
- [ ] All 8 bug fixes verified working
- [ ] Analytics graph displays with new gradient design
- [ ] Loading spinner appears during plan generation
- [ ] Screen transitions are smooth
- [ ] Button animations work on hover/press
- [ ] Choice cards animate on selection
- [ ] Data persists across sessions
- [ ] No console errors during entire flow
- [ ] App feels fast and responsive

---

## 📊 Final Checklist

After completing all tests:

- [ ] Onboarding flow: **PASS** / FAIL
- [ ] Main app screens: **PASS** / FAIL
- [ ] Bug fixes verified: **PASS** / FAIL
- [ ] Animations smooth: **PASS** / FAIL
- [ ] Data persistence: **PASS** / FAIL
- [ ] Performance: **PASS** / FAIL

---

## 🎉 Ready for Use

Once all tests pass, the app is ready for production use!

**Next Steps:**
1. Test on actual mobile device (iPhone/Android)
2. Share with 2-3 beta users for feedback
3. Monitor for any edge cases
4. Iterate based on user feedback

**Deployment Note:**
App is a single HTML file - just upload `jp-custom-trainer.html` to any web server or open directly in browser.
