/**
 * Vercel Serverless Function: api/generate.js
 * Calls Google Gemini API securely using process.env.GEMINI_API_KEY
 */
import { GoogleGenAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Allow only POST methods
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { task, deadline, durationHours } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY environment variable is missing on Vercel deployment.' 
    });
  }

  try {
    // Initialize standard Google Gen AI
    const ai = new GoogleGenAI({ apiKey });
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are an intense, urgent productivity coach named "PANIC LINE". 
      The user is procrastinating on this task: "${task}".
      The absolute deadline is: "${deadline}" (approximately ${durationHours} hours left).

      Your goal is to split the remaining time into exactly 4 to 6 critical action milestones.
      Produce a timeline that dictates exactly what they must start doing right now to finish safely.
      Use a highly motivating, slightly panicked, and urgent tone (written in Korean). 

      You MUST respond with a strictly formatted JSON object and nothing else. Do not wrap inside markdown code blocks.
      Expected JSON template:
      {
        "timetable": [
          { "time": "HH:MM", "todo": "Short milestone description" }
        ],
        "explanation": "High-tension motivational summary and distraction control reminders"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON in case formatting has extra wrapper blocks
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse valid JSON from Gemini API response");
    }

    const payload = JSON.parse(jsonMatch[0]);
    return res.status(200).json(payload);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}