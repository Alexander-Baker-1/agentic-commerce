require('dotenv').config(); // Add this line at the top!

const claudeAgent = require('./services/claudeAgent');

async function test() {
  console.log('Testing intent parsing...');
  console.log('API Key loaded:', process.env.ANTHROPIC_API_KEY ? 'Yes ✓' : 'No ✗');
  
  const result = await claudeAgent.parseIntent(
    "I need a skiing outfit, budget $400, size M, delivery in 5 days, I want it extra warm"
  );
  
  console.log('Result:', JSON.stringify(result, null, 2));
}

test();