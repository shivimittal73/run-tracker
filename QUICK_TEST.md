# Quick Onboarding Test Guide

## How to Test

1. Open `jp-custom-trainer.html` in your browser
2. Open Developer Console (F12 or Cmd+Option+I on Mac)
3. Follow the manual testing steps below

---

## Manual Testing Steps

### Step 1: Welcome Screen ✓
- **Check:** Days countdown shows correct number (96 days from Jan 10, 2026)
- **Action:** Click "Create My Training Plan"
- **Expected:** Goes to Screen 2 (Your Details)

### Step 2: Your Details ✓
- **Action:** Click "Next" without entering name
- **Expected:** Alert says "Please enter your name"
- **Action:** Enter name "Test User" and click "Next"
- **Expected:** Goes to Screen 3
- **Verify in console:**
  ```javascript
  JSON.parse(localStorage.getItem('onboarding_data')).name
  // Should show: "Test User"
  ```

### Step 3: Running Experience ✓
- **Action:** Click "Next" without selection
- **Expected:** Alert says "Please select an option"
- **Action:** Click "Yes" card
- **Expected:** Card turns blue, previous time section appears
- **Action:** Click "No" card
- **Expected:** Card turns blue, "Yes" deselects, previous time section hidden
- **Action:** Click "Yes" again, enter 32 min 30 sec, click "Next"
- **Expected:** Goes to Screen 4

### Step 4: Your Goal ✓
- **Action:** Without entering anything, check Next button
- **Expected:** Button is disabled
- **Action:** Enter 30 min 0 sec in finish time
- **Expected:**
  - Feedback shows "That's 5:21/km"
  - Shows training paces
  - Next button enabled
- **Action:** Click "Target Pace" button
- **Expected:** Input switches to pace mode
- **Action:** Enter 5 min 30 sec per km
- **Expected:** Shows "Finish time: 30:48"
- **Action:** Click "Next"
- **Expected:** Goes to Screen 5

### Step 5: Your Weekly Schedule ✓
- **Action:** Click "Next" without selections
- **Expected:** Nothing happens (button disabled)
- **Action:** Click Monday
- **Expected:** Card turns blue, counter shows "1 / 3"
- **Action:** Click Wednesday and Sunday
- **Expected:** Counter shows "3 / 3", other days dimmed, Next enabled
- **Action:** Try clicking Friday
- **Expected:** Nothing happens (4th day can't be selected)
- **Action:** Click Monday again
- **Expected:** Deselects, counter shows "2 / 3", Next disabled
- **Action:** Click Monday again, then "Next"
- **Expected:** Goes to Screen 6, calendar appears

### Step 6: Travel Dates ✓
- **Check:** Calendar shows current month through April 2026
- **Check:** Past dates are grayed out
- **Action:** Click future date (e.g., Feb 14)
- **Expected:** Date turns blue, appears in list below
- **Action:** Click Feb 15, Feb 16
- **Expected:** All dates show in list as chips
- **Action:** Click "×" on Feb 15 chip
- **Expected:** Removes from list, calendar updates
- **Action:** Click "Skip - I have no travel planned"
- **Expected:** Goes to Screen 7 (OR click Next with dates selected)

### Step 7: Plan Preview ✓
- **Check:** Plan summary shows:
  - Training period (e.g., "13 weeks")
  - Total workouts (e.g., "39 runs")
  - Training days match your selection
  - Target pace matches your input
- **Check:** "Understanding Your Training Paces" section visible
- **Check:** First 2 weeks preview shows 3 workouts per week
- **Check:** Workouts are on your selected days (Mon, Wed, Sun)
- **Check:** Data persistence message visible
- **Action:** Click "Start Training"
- **Expected:** Alert shows congratulations message

---

## Console Tests

### After completing onboarding, run these in console:

```javascript
// 1. Check onboarding data
const onboarding = JSON.parse(localStorage.getItem('onboarding_data'));
console.log('Onboarding completed:', onboarding.completed); // Should be true
console.log('Name:', onboarding.name); // Should show your name
console.log('Training days:', onboarding.trainingDays); // Should show 3 days

// 2. Check generated plan
const plan = JSON.parse(localStorage.getItem('generated_plan'));
console.log('Total weeks:', plan.weeksTotal); // Should be 8-14
console.log('Pace zones:', plan.paceZones); // Should show easy, tempo, interval, race
console.log('First week:', plan.plan[1]); // Should show 3 workouts

// 3. Verify plan structure
let workoutCount = 0;
for (let week in plan.plan) {
  workoutCount += plan.plan[week].length;
}
console.log('Total workouts:', workoutCount); // Should be close to weeks * 3

// 4. Check dates are in future
const firstWorkout = plan.plan[1][0];
console.log('First workout date:', firstWorkout.date); // Should be future date
console.log('First workout day:', firstWorkout.day); // Should match your selected day

// 5. Check pace calculations (if target was 30:00)
console.log('Race pace target:', plan.paceZones.race.target); // Should be 321 seconds
console.log('Easy pace range:', plan.paceZones.easy); // Should be 381-411 seconds
```

---

## Known Issues Fixed

✅ **Bug #1:** Experience screen event handling
- Fixed: Now passes `this` element correctly

---

## Common Issues

### Issue: Calendar doesn't appear on Screen 6
- **Solution:** Wait 100ms after screen loads, or scroll down

### Issue: Next button stays disabled
- **Cause:** JavaScript error occurred
- **Check:** Open console and look for error messages
- **Common causes:**
  - Element ID mismatch
  - Function not defined
  - localStorage quota exceeded (unlikely)

### Issue: Plan preview shows wrong dates
- **Cause:** Computer clock is wrong
- **Check:** Verify today's date in browser
- **Expected:** Plan starts next Monday after today

### Issue: Training days don't match in preview
- **Cause:** Bug in mapToUserDays function
- **Check:** Console log `onboardingData.trainingDays` and compare with preview

---

## Quick Reset

To start over from scratch:

```javascript
// Clear all data
localStorage.clear();

// Reload page
location.reload();
```

---

## Success Criteria

✅ All 7 screens accessible
✅ No console errors
✅ Data persists in localStorage
✅ Plan generates with correct structure
✅ Paces calculate correctly
✅ Travel dates excluded from plan
✅ Training days match selection
✅ Countdown shows correct days

---

## If You Find Bugs

Document here:

**Bug:** [Description]
**Screen:** [Which screen]
**Steps:** [How to reproduce]
**Console Error:** [If any]
**Severity:** Critical / High / Medium / Low
