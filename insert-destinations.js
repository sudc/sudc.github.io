#!/usr/bin/env node

/**
 * ONE-TIME DESTINATION DATA INSERTION SCRIPT
 * ==========================================
 * 
 * Usage:
 *   node insert-destinations.js
 * 
 * This script:
 * 1. Reads the full destination dataset
 * 2. Makes a POST request to /api/destinations/bulk-insert
 * 3. Populates MongoDB with all 156+ destinations
 * 4. Exits on success or error
 * 
 * IMPORTANT: Run this ONCE after backend deployment
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const DATA_FILE = path.join(__dirname, 'public/assets/data/destinations-full.json');

console.log('🚀 TripSaver Destinations – Bulk Insert Script');
console.log(`📍 Backend URL: ${BACKEND_URL}`);
console.log(`📁 Data file: ${DATA_FILE}\n`);

// Step 1: Read destination data
console.log('📖 Reading destination data...');
let data;
try {
  const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
  data = JSON.parse(fileContent);
} catch (err) {
  console.error('❌ Failed to read data file:', err.message);
  process.exit(1);
}

const destinations = data.destinations || [];
console.log(`✅ Loaded ${destinations.length} destinations\n`);

if (destinations.length === 0) {
  console.error('❌ No destinations found in data file');
  process.exit(1);
}

// Step 2: Prepare request
console.log('📤 Preparing bulk insert request...');
const payload = JSON.stringify({ destinations });
console.log(`   Payload size: ${(payload.length / 1024).toFixed(2)} KB\n`);

// Step 3: Make HTTP request
console.log('🔗 Connecting to backend...');
const apiUrl = new URL('/api/destinations/bulk-insert', BACKEND_URL);
const protocol = apiUrl.protocol === 'https:' ? https : http;

const options = {
  hostname: apiUrl.hostname,
  port: apiUrl.port || (apiUrl.protocol === 'https:' ? 443 : 80),
  path: apiUrl.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  },
  timeout: 30000
};

const req = protocol.request(options, (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log(`\n📊 Response Status: ${res.statusCode}`);

    try {
      const response = JSON.parse(body);
      
      if (res.statusCode === 201 || res.statusCode === 200) {
        console.log('✅ SUCCESS!\n');
        console.log(`   ✓ Inserted: ${response.inserted} destinations`);
        console.log(`   ✓ Message: ${response.message}`);
        console.log('\n🎉 All destinations are now in MongoDB!');
        console.log('   The frontend will fetch them automatically.\n');
        process.exit(0);
      } else {
        console.error('❌ FAILED!\n');
        console.error(`   Error: ${response.error || 'Unknown error'}`);
        process.exit(1);
      }
    } catch (err) {
      console.error('❌ Failed to parse response:', err.message);
      console.error('Raw response:', body);
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('\n❌ Request failed:', err.message);
  console.error('\nTroubleshooting:');
  console.error('  1. Is the backend running? (default: http://localhost:3000)');
  console.error('  2. Is BACKEND_URL environment variable set correctly?');
  console.error('  3. Is MongoDB Atlas connected?');
  console.error(`\nTo use a different backend, set: BACKEND_URL=https://your-backend.com`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('\n❌ Request timed out (30s)');
  req.destroy();
  process.exit(1);
});

// Send request
req.write(payload);
req.end();

// Step 4: Show progress
console.log(`⏳ Sending ${destinations.length} destinations to MongoDB...\n`);
