require('dotenv').config({ path: '../.env.local' });
const OpenAI = require('openai');
async function test() {
  try {
    const openai = new OpenAI();
    const msg = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'Test' }]
    });
    console.log("SUCCESS:", msg.choices[0].message.content);
  } catch(e) {
    console.log("ERROR:", e.message);
  }
}
test();
