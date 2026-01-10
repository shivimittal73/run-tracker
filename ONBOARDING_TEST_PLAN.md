# Onboarding Flow Test Plan

## Test Date: 2026-01-10
## Tester: Manual testing required

---

## Pre-Test Setup
- [ ] Open `jp-custom-trainer.html` in Chrome
- [ ] Open browser console (F12) to check for errors
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Verify screen shows correctly on mobile size (400px width)

---

## Screen 1: Welcome Screen

### Visual Checks
- [ ] App title displays: "🏃‍♂️ Wise Platform JP Morgan 5.6K Training"
- [ ] Countdown shows correct days until April 16, 2026
- [ ] Race date displays: "April 16, 2026 • 5:00 PM"
- [ ] Features list shows 5 checkmarks
- [ ] "Create My Training Plan" button visible
- [ ] Footer shows "Takes 3 minutes • 7 quick questions"
- [ ] Privacy note visible

### Functional Checks
- [ ] Click "Create My Training Plan" → goes to Screen 2

### Console Errors
- [ ] No JavaScript errors in console
- [ ] Service worker registration message appears

---

## Screen 2: Your Details

### Visual Checks
- [ ] Progress indicator shows "Step 2 of 7"
- [ ] Heading: "What's your name?"
- [ ] Help text visible
- [ ] Name input field visible
- [ ] Back button visible
- [ ] Next button visible

### Functional Checks
- [ ] Type name "Test User" → field accepts input
- [ ] Click Next without name → alert shows "Please enter your name"
- [ ] Type name "Test User" → click Next → goes to Screen 3
- [ ] Click Back → returns to Screen 1

### Data Persistence
- [ ] Check localStorage: `localStorage.getItem('onboarding_data')`
- [ ] Verify name is saved: `{"name":"Test User",...}`

---

## Screen 3: Running Experience

### Visual Checks
- [ ] Progress indicator shows "Step 3 of 7"
- [ ] Heading: "Have you run 5-6km before?"
- [ ] Two choice cards visible (Yes / No)
- [ ] Back and Next buttons visible

### Functional Checks
- [ ] Click Next without selection → alert shows "Please select an option"
- [ ] Click "Yes" card → card highlights (blue background)
- [ ] Previous time section appears when "Yes" selected
- [ ] Click "No" card → card highlights, previous time section hidden
- [ ] Switch between Yes/No → only one card selected at a time
- [ ] Enter previous time: 32 min, 30 sec
- [ ] Click Next → goes to Screen 4

### Edge Cases
- [ ] Enter invalid time (e.g., 999 minutes) → should still work (no validation required)
- [ ] Leave time blank when "Yes" selected → should still work

---

## Screen 4: Your Goal

### Visual Checks
- [ ] Progress indicator shows "Step 4 of 7"
- [ ] Heading: "What's your goal?"
- [ ] Two toggle buttons visible: "Finish Time" (primary) and "Target Pace"
- [ ] Time input section visible by default
- [ ] Pace input section hidden by default
- [ ] Feedback card shows: "Enter your goal to see your training paces"
- [ ] Next button disabled initially

### Functional Checks - Time Mode
- [ ] Enter 30 minutes, 0 seconds
- [ ] Feedback updates live showing:
  - "That's 5:21/km"
  - Easy runs: 6:21-6:51/km
  - Tempo runs: 4:56/km
  - Intervals: 4:41-5:01/km
- [ ] Next button becomes enabled

### Functional Checks - Pace Mode
- [ ] Click "Target Pace" button → button becomes primary, time input hidden
- [ ] Pace input section becomes visible
- [ ] Enter 5 min, 30 sec per km
- [ ] Feedback updates showing:
  - "Finish time: 30:48"
  - Training paces
- [ ] Next button enabled

### Edge Cases
- [ ] Enter 0 minutes → feedback shows default message, button disabled
- [ ] Switch between modes → previous input clears/persists correctly
- [ ] Enter very fast pace (3:00/km) → calculations work
- [ ] Enter very slow pace (10:00/km) → calculations work

### Data Validation
- [ ] Check pace calculation: 30:00 time = 321 sec/km = 5:21/km ✓
- [ ] Check easy pace: race + 60-90 sec = 6:21-6:51/km ✓

### Functional Checks - Navigation
- [ ] Click Next → goes to Screen 5
- [ ] Click Back → returns to Screen 3 (data preserved)
- [ ] Return to Screen 4 → previously entered goal still visible

---

## Screen 5: Your Weekly Schedule

### Visual Checks
- [ ] Progress indicator shows "Step 5 of 7"
- [ ] Heading: "Pick 3 days you'll train each week"
- [ ] 7 day cards visible (Mon-Sun)
- [ ] Selection counter shows "0 / 3 days selected"
- [ ] Tip card visible with suggestion
- [ ] Next button disabled initially

### Functional Checks
- [ ] Click Monday → card highlights, counter shows "1 / 3"
- [ ] Click Wednesday → highlights, counter shows "2 / 3"
- [ ] Click Sunday → highlights, counter shows "3 / 3"
- [ ] Next button becomes enabled
- [ ] Other day cards become dimmed/disabled
- [ ] Click Monday again → deselects, counter shows "2 / 3"
- [ ] Other cards become enabled again
- [ ] Try clicking 4th day when 3 selected → doesn't work (correct behavior)

### Edge Cases
- [ ] Select 3 days → click Next → deselect one → Next button disables
- [ ] Select non-consecutive days (Mon, Thu, Sat) → should work
- [ ] Select consecutive days (Mon, Tue, Wed) → should work

### Functional Checks - Navigation
- [ ] Click Next with 3 days selected → goes to Screen 6
- [ ] Click Back → returns to Screen 4
- [ ] Return to Screen 5 → previously selected days still highlighted

---

## Screen 6: Travel Dates

### Visual Checks
- [ ] Progress indicator shows "Step 6 of 7"
- [ ] Heading: "Mark dates you'll be traveling"
- [ ] Calendar widget renders correctly
- [ ] Shows current month through April 2026
- [ ] Month headers visible (January 2026, February 2026, etc.)
- [ ] Day headers visible (Sun, Mon, Tue, etc.)
- [ ] Travel dates list shows "No travel dates selected"
- [ ] "Skip - I have no travel planned" button visible
- [ ] Next button visible

### Functional Checks - Calendar
- [ ] Past dates are grayed out and not clickable
- [ ] Current date and future dates have gray background
- [ ] Click a future date → turns blue with white text
- [ ] Travel dates list updates showing selected date
- [ ] Click same date again → deselects, returns to gray
- [ ] Select multiple dates (e.g., Feb 14-18)
- [ ] All selected dates show in list as chips

### Functional Checks - Date Chips
- [ ] Selected dates display as "Feb 14", "Feb 15", etc.
- [ ] Click "×" on a chip → removes from selection
- [ ] Calendar updates to show date as deselected
- [ ] List updates immediately

### Edge Cases
- [ ] Select 20+ dates → list should wrap and display correctly
- [ ] Select dates across multiple months → should work
- [ ] Click "Skip" button → clears any selections and goes to Screen 7
- [ ] Click Next with 0 dates → should work (travel is optional)
- [ ] Click Next with 5 dates → should work

### Functional Checks - Navigation
- [ ] Click Next → goes to Screen 7
- [ ] Preview generation happens (check console for errors)
- [ ] Click Back → returns to Screen 5
- [ ] Return to Screen 6 → calendar doesn't re-render (may need refresh)

---

## Screen 7: Plan Preview

### Visual Checks
- [ ] Progress indicator shows "Step 7 of 7"
- [ ] Heading: "Your Custom Training Plan"
- [ ] Plan Summary card shows:
  - Training Period (e.g., "13 weeks")
  - Total Workouts (e.g., "39 runs")
  - Training Days (e.g., "Monday, Wednesday, Sunday")
  - Target Pace (e.g., "5:21/km")
  - Easy Run Pace (e.g., "6:21-6:51/km")
- [ ] "Understanding Your Training Paces" card visible with 4 pace types
- [ ] "First 2 Weeks Preview" card shows workouts
- [ ] Disclaimer card visible
- [ ] Data persistence message visible: "📱 Your data stays local"
- [ ] "Start Training 🏃‍♂️" button visible
- [ ] "← Back to Edit" button visible
- [ ] Footer shows "Got feedback? Message Shivi" and update instructions

### Functional Checks - Plan Generation
- [ ] First 2 weeks display correctly
- [ ] Each workout shows: Day, Date, Workout description, Target pace
- [ ] Dates are in the future (starting from next Monday)
- [ ] Training days match user's selection
- [ ] Paces match calculated zones
- [ ] If travel dates were selected, check they're excluded from plan

### Data Validation
- [ ] Open console: `JSON.parse(localStorage.getItem('generated_plan'))`
- [ ] Verify plan structure:
  - `weeksTotal` is a number (8-14)
  - `paceZones` has easy, tempo, interval, race
  - `plan` object has numbered weeks (1, 2, 3...)
  - Each week has 3 workouts (or fewer if travel)
  - Each workout has: day, workout, targetPace, date

### Functional Checks - Pace Zone Explanations
- [ ] Easy pace explanation clear and readable
- [ ] Tempo pace explanation clear
- [ ] Interval pace explanation clear
- [ ] Race pace explanation clear

### Functional Checks - Navigation
- [ ] Click "← Back to Edit" → returns to Screen 6
- [ ] Return to Screen 7 → plan re-generates (may differ if today's date changed)
- [ ] Click "Start Training" → alert shows congratulations message with user's name

### Edge Cases
- [ ] Check plan with 14 weeks available → should use full template
- [ ] Check plan with 10 weeks available → should compress intelligently
- [ ] Check plan with travel dates → verify workouts skipped on those dates
- [ ] Check plan with different training days → verify workouts on correct days

---

## Data Persistence Tests

### After Completing Onboarding
- [ ] Check localStorage has both keys:
  - `onboarding_data` with `completed: true`
  - `generated_plan` with full plan object

### Refresh Browser
- [ ] Refresh page after completing onboarding
- [ ] Should show main app (or alert) instead of welcome screen
- [ ] Data should persist

### Clear Onboarding Only
- [ ] `localStorage.removeItem('onboarding_data')`
- [ ] Refresh page → should start onboarding from beginning
- [ ] `generated_plan` should still exist

---

## Algorithm Validation Tests

### Test 1: 14 Weeks Available (Today = Jan 10, 2026)
- [ ] 96 days until race = ~13 weeks
- [ ] Plan should have 13 weeks
- [ ] Verify first week starts next Monday

### Test 2: Different Start Dates
- [ ] Simulate Feb 1, 2026 start → ~10 weeks
- [ ] Simulate March 1, 2026 start → ~6 weeks
- [ ] Check if compression logic works

### Test 3: Travel Date Exclusion
- [ ] Select travel: Feb 14-17 (4 days)
- [ ] Check generated plan week ~5
- [ ] Verify workouts skipped on those dates
- [ ] Verify warning message if week has < 3 workouts

### Test 4: Pace Calculations
- [ ] Target: 25:00 → Race pace should be 4:28/km
- [ ] Target: 30:00 → Race pace should be 5:21/km
- [ ] Target: 35:00 → Race pace should be 6:15/km
- [ ] Target: 40:00 → Race pace should be 7:08/km
- [ ] Verify easy is always race + 60-90 sec
- [ ] Verify tempo is always race - 25 sec
- [ ] Verify interval is always race - 40 to -20 sec

---

## Browser Compatibility Tests

### Chrome (Desktop)
- [ ] All screens render correctly
- [ ] Interactions work smoothly
- [ ] Console has no errors

### Chrome (Mobile Emulation)
- [ ] Open DevTools → Toggle device toolbar
- [ ] Test on iPhone SE (375px) size
- [ ] Test on Pixel 5 (393px) size
- [ ] All elements fit on screen
- [ ] Touch interactions work

### Safari (iOS - if available)
- [ ] Open on actual iPhone or iPad
- [ ] Test entire flow
- [ ] Check for Safari-specific issues

---

## Known Issues to Check

### Potential Bugs Found During Code Review:

1. **Experience screen event issue**
   - Line 1337: Uses `event.target.closest('.choice-card')`
   - `event` might be undefined if onclick passes element directly
   - **Test:** Click choice cards and verify highlighting works

2. **Calendar re-render on back navigation**
   - Calendar renders with `setTimeout(renderCalendar, 100)` on entering screen
   - Might not re-render properly if user goes back
   - **Test:** Select dates → Back → Forward → Are dates still selected?

3. **Training days state reset**
   - `selectedDays` array is global
   - Might not reset if user goes back and changes
   - **Test:** Select 3 days → Back → Return → Are previous days pre-selected?

4. **Format time for pace mode**
   - Line 1439: `formatTime(finishSeconds / 60)`
   - Function exists but verify output format
   - **Test:** Enter pace 5:30/km → Should show "30:48" not decimal

5. **Service worker registration**
   - Points to `custom-sw.js`
   - **Test:** Check console for successful registration
   - Check Network tab → service worker active

---

## Performance Tests

- [ ] Load time < 2 seconds
- [ ] Screen transitions smooth (no lag)
- [ ] Calendar renders in < 500ms
- [ ] Preview generation < 100ms
- [ ] No memory leaks (check DevTools Memory)

---

## Accessibility Tests (Quick Check)

- [ ] Tab through form with keyboard
- [ ] Buttons are keyboard accessible
- [ ] Enter key submits forms where appropriate
- [ ] Color contrast sufficient (use DevTools Lighthouse)

---

## Final Checks

- [ ] Complete full flow start to finish without errors
- [ ] Complete flow again with different inputs
- [ ] Verify localStorage after completion
- [ ] Check generated plan structure is valid
- [ ] No console errors throughout entire flow

---

## Bug Report Template

If bugs found, document:

**Bug #X:**
- Screen: [Screen name]
- Steps to reproduce:
  1. [Step 1]
  2. [Step 2]
- Expected behavior: [What should happen]
- Actual behavior: [What actually happens]
- Console error: [If any]
- Severity: Critical / High / Medium / Low

---

## Test Results Summary

**Date:** [Fill in]
**Browser:** [Fill in]
**Pass Rate:** X / Y tests passed

**Bugs Found:**
- [ ] Bug #1: [Description]
- [ ] Bug #2: [Description]

**Ready for Production:** Yes / No
