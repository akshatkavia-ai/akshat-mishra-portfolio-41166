/**
 * Test script to verify Formspree endpoint configuration
 * Run with: node test-formspree.js
 */

const https = require('https');

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzyzayj';

const testPayload = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message from the contact form verification script.',
  _replyto: 'test@example.com',
  _subject: 'Portfolio Contact from Test User'
};

console.log('🧪 Testing Formspree endpoint...');
console.log('Endpoint:', FORMSPREE_ENDPOINT);
console.log('Payload:', JSON.stringify(testPayload, null, 2));
console.log('');

const url = new URL(FORMSPREE_ENDPOINT);
const postData = JSON.stringify(testPayload);

const options = {
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log('✅ Response Status:', res.statusCode);
  console.log('📋 Response Headers:', JSON.stringify(res.headers, null, 2));
  console.log('');

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📦 Raw Response:', data);
    console.log('');

    try {
      const parsed = JSON.parse(data);
      console.log('📊 Parsed Response:', JSON.stringify(parsed, null, 2));
      console.log('');

      if (res.statusCode >= 200 && res.statusCode < 300) {
        if (parsed.ok === true || parsed.success === true) {
          console.log('✅ SUCCESS: Formspree endpoint is working correctly!');
          console.log('   - Response indicates success (ok or success = true)');
        } else {
          console.log('⚠️  WARNING: Got 2xx status but no ok/success flag');
          console.log('   - This might still work, check the response format');
        }
      } else {
        console.log('❌ ERROR: Request failed with status', res.statusCode);
        if (parsed.error) {
          console.log('   Error message:', parsed.error);
        }
      }
    } catch (err) {
      console.log('⚠️  Response is not JSON:', data);
    }

    console.log('');
    console.log('🔍 Diagnosis:');
    console.log('1. ✅ Endpoint reachable');
    console.log('2. ✅ POST method accepted');
    console.log('3. ✅ JSON payload sent');
    console.log('4.', res.statusCode >= 200 && res.statusCode < 300 ? '✅' : '❌', 'Status code is', res.statusCode);
  });
});

req.on('error', (err) => {
  console.error('❌ Request failed:', err.message);
  console.log('');
  console.log('Possible issues:');
  console.log('- Network connectivity problem');
  console.log('- DNS resolution failure');
  console.log('- SSL/TLS certificate issue');
  process.exit(1);
});

req.write(postData);
req.end();
