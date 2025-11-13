# Contact Form Integration Test Guide

## Quick Test via Browser Console

Open your browser's DevTools console at `http://localhost:3000` and run:

```javascript
// Test 1: Verify environment variable is loaded
console.log('NEXT_PUBLIC_API_BASE:', process.env.NEXT_PUBLIC_API_BASE);
// Expected: Should show the Formspree endpoint (may be undefined in browser)

// Test 2: Direct API call test
async function testFormspreeAPI() {
  console.log('🧪 Testing Formspree API...');
  
  const response = await fetch('https://formspree.io/f/xzzyzayj', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: 'Browser Test User',
      email: 'browsertest@example.com',
      message: 'This is a test from the browser console to verify Formspree integration.',
      _replyto: 'browsertest@example.com',
      _subject: 'Portfolio Contact from Browser Test User'
    })
  });
  
  const data = await response.json();
  
  console.log('✅ Status:', response.status);
  console.log('📦 Response:', data);
  
  if (data.ok === true || data.success === true) {
    console.log('✅ SUCCESS: Formspree is working!');
  } else {
    console.log('❌ UNEXPECTED: Response format:', data);
  }
  
  return data;
}

testFormspreeAPI();
```

## Manual UI Test Steps

### Test Case 1: Successful Submission
1. **Navigate** to `http://localhost:3000`
2. **Scroll** to the Contact section
3. **Fill in the form:**
   - Name: `John Doe`
   - Email: `john.doe@example.com`
   - Message: `This is a test message to verify the contact form works correctly.`
4. **Click** "Send Message" button
5. **Expected Results:**
   - Button changes to "Sending..." (disabled state)
   - After 1-2 seconds, green success message appears:
     > "Thank you! Your message has been sent successfully."
   - Form fields are cleared
   - Button returns to "Send Message" (enabled)

### Test Case 2: Validation - Empty Name
1. **Fill in:**
   - Name: `` (empty)
   - Email: `test@example.com`
   - Message: `Test message`
2. **Click** "Send Message"
3. **Expected:** Red error: "Please enter your name."

### Test Case 3: Validation - Invalid Email
1. **Fill in:**
   - Name: `Test User`
   - Email: `invalid-email`
   - Message: `Test message`
2. **Click** "Send Message"
3. **Expected:** Red error: "Please enter a valid email."

### Test Case 4: Validation - Short Message
1. **Fill in:**
   - Name: `Test User`
   - Email: `test@example.com`
   - Message: `Short` (less than 10 characters)
2. **Click** "Send Message"
3. **Expected:** Red error: "Please enter a message (min 10 characters)."

### Test Case 5: Network Error Simulation
1. **Open DevTools** → Network tab
2. **Enable** "Offline" mode
3. **Fill in** the form with valid data
4. **Click** "Send Message"
5. **Expected:** Red error: "Network error. Please check your connection and try again."

### Test Case 6: Honeypot (Spam Detection)
**Note:** This field is hidden and should not be filled by humans

To test programmatically:
```javascript
// In browser console
document.getElementById('_gotcha').value = 'spam-bot-filled-this';
// Then submit the form - should show spam detected error
```

## Automated Test with Puppeteer (Optional)

If you have Puppeteer installed:

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  
  // Scroll to contact section
  await page.evaluate(() => {
    document.querySelector('[id*="contact"]')?.scrollIntoView();
  });
  
  // Wait for form to be visible
  await page.waitForSelector('input[name="name"]');
  
  // Fill in the form
  await page.type('input[name="name"]', 'Puppeteer Test');
  await page.type('input[name="email"]', 'puppeteer@test.com');
  await page.type('textarea[name="message"]', 'This is an automated test message from Puppeteer.');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Wait for response
  await page.waitForSelector('[role="status"]', { timeout: 10000 });
  
  // Check for success message
  const statusMessage = await page.$eval('[role="status"]', el => el.textContent);
  
  console.log('Form submission result:', statusMessage);
  
  if (statusMessage.includes('sent successfully')) {
    console.log('✅ TEST PASSED');
  } else {
    console.log('❌ TEST FAILED:', statusMessage);
  }
  
  await browser.close();
})();
```

## Network Inspector Verification

### What to Look For:

1. **Request URL:** `https://formspree.io/f/xzzyzayj` (exact match, no extra paths)
2. **Request Method:** `POST`
3. **Request Headers:**
   ```
   Content-Type: application/json
   Accept: application/json
   ```
4. **Request Payload:**
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "message": "Test message...",
     "_replyto": "test@example.com",
     "_subject": "Portfolio Contact from Test User"
   }
   ```
5. **Response Status:** `200 OK`
6. **Response Headers:**
   ```
   access-control-allow-origin: *
   content-type: application/json
   ```
7. **Response Body:**
   ```json
   {
     "ok": true,
     "next": "/thanks"
   }
   ```

## Common Issues & Solutions

### Issue: Form shows configuration warning
**Debug:**
```bash
# Check .env file
cat .env | grep NEXT_PUBLIC_API_BASE

# Restart dev server
pkill -f "next dev" && npm run dev
```

### Issue: Form submits but shows error
**Debug:**
1. Open DevTools → Network tab
2. Find the Formspree request
3. Check:
   - Request URL (should not have /contact appended)
   - Request payload (should have _replyto and _subject)
   - Response status and body

### Issue: Success message shows but email not received
**Possible causes:**
1. Formspree form not confirmed (check Formspree email)
2. Email went to spam folder
3. Using free tier with rate limits exceeded
4. Formspree form ID incorrect

**Solution:** Check Formspree dashboard at https://formspree.io/forms/xzzyzayj/integration

## Success Checklist

Before considering the fix complete, verify:

- [ ] Form loads without configuration warning
- [ ] Can submit with valid data
- [ ] Success message appears on successful submission
- [ ] Form clears after successful submission
- [ ] Validation errors appear for invalid data
- [ ] Network errors are handled gracefully
- [ ] No console errors during submission
- [ ] Network request shows correct URL (no /contact appended)
- [ ] Request payload includes _replyto and _subject
- [ ] Response is 200 with {ok:true}

---

**Test Status:** Ready for validation
**Last Updated:** 2025-11-13
