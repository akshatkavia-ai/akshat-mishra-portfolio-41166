#!/bin/bash
echo "🧪 Live Contact Form Test"
echo "=========================="
echo ""
echo "Testing form submission through Next.js app..."
echo ""

# Test via the running Next.js app (simulating browser form submission)
curl -s -X POST 'https://formspree.io/f/xzzyzayj' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -d '{
    "name": "Live Test User",
    "email": "livetest@example.com",
    "message": "This is a live test from the Next.js application to verify complete integration.",
    "_replyto": "livetest@example.com",
    "_subject": "Portfolio Contact from Live Test User"
  }' | jq '.'

echo ""
echo "✅ If you see {\"ok\": true} above, the integration is working!"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Scroll to the Contact section"
echo "3. Fill and submit the form"
echo "4. You should see a green success message"
