#!/usr/bin/env node

import { spawn } from 'child_process';
import crypto from 'crypto';

const API_URL = 'http://backend:8888/swagger/openapi.json';
const POLL_INTERVAL = 3000; // 3 seconds
let lastHash = null;
let isGenerating = false;

async function fetchSpec() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.log(`⏳ Waiting for API server to be ready...`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.log(`⏳ Waiting for API server to be ready...`);
    return null;
  }
}

function generateHash(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

async function generateClient() {
  if (isGenerating) {
    console.log('🔄 Client generation already in progress...');
    return;
  }

  isGenerating = true;
  console.log('🔄 Generating TypeScript client...');
  
  return new Promise((resolve) => {
    const child = spawn('npm', ['run', 'generate-client'], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      isGenerating = false;
      if (code === 0) {
        console.log('✅ TypeScript client generated successfully!');
      } else {
        console.log('❌ Client generation failed');
      }
      resolve();
    });
  });
}

async function watchAPI() {
  console.log('👀 Watching API for changes...');
  
  while (true) {
    const spec = await fetchSpec();
    
    if (spec) {
      const currentHash = generateHash(spec);
      
      if (lastHash === null) {
        console.log('🚀 API server detected, generating initial client...');
        lastHash = currentHash;
        await generateClient();
      } else if (lastHash !== currentHash) {
        console.log('🔥 API changes detected! Regenerating client...');
        lastHash = currentHash;
        await generateClient();
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
  }
}

// Start watching
watchAPI().catch(console.error);