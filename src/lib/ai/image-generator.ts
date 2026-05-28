import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export async function generateImageResponse(topic: string): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) return null;

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const imagePrompt = `Create an illustration for a social media post about: "${topic}". 
STYLE: Cinematic concept art or Ghibli-inspired painterly illustration. 
COMPOSITION: Square image (1:1). 
REQUIREMENTS: Very little to no text, absolutely no charts, graphs, bullet points, or icons. The scene must visually capture the core essence of the topic in an epic, professional, and visually stunning way.`;

    const imgRes = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    const imgData = imgRes.data?.[0];
    if (!imgData) return null;
    return imgData.url || null;

  } catch (error) {
    console.error('Image generation error:', error);
    return null;
  }
}
