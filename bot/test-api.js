const fetch = require('node-fetch'); // wait, node 18+ has fetch natively
async function test() {
  const apiKey = 'AIzaSyDiFfpfPIzAOOuBiIzAIHULGjK1wNQH0YQ';
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: "TRONG KHI NHIỀU NGƯỜI SỢ AI CƯỚP VIỆC" }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Callirrhoe" }
          }
        }
      }
    })
  });
  const text = await res.text();
  console.log('STATUS:', res.status);
  console.log('RESPONSE:', text);
}
test();
