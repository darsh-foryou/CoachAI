"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function enhanceContent(companyName, jobTitle, jobDescription, contentType, userContent) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const analyzePrompt = `
  Analyze the following job description and the user's ${contentType} content: 
  Job Description: ${jobDescription} 
  User's ${contentType} Content: ${userContent}

  Please do the following:
  1. Identify the top 5-7 must-have skills from the job description.
  2. For each bullet point in the user's ${contentType} content, pinpoint the specific skill it demonstrates.
     - If a bullet point isn't relevant to the job, indicate that.
     - If a bullet point already strongly reflects a must-have skill, leave it unchanged.
     - If the bullet point does not strongly reflect a must-have skill, suggest a specific rewrite for that bullet point to better showcase the skill. Use keywords and phrases from the job description, and begin the rewrite with an action verb if necessary.
     - **Only include in the enhanced content the bullet points that require rewriting and write each bullet point in a new line, specify the enhanced bullet is for which part and also explain in 1 line the impact of the enhanced bullet; omit bullet points that are already well-crafted.**
  3. Act as a recruiter with a ${jobTitle} title relevant to the role at ${companyName} (e.g., "Frontend Recruiter" if applying for a Frontend Developer position) and provide a rating out of 10 for how well this section addresses the job's requirements.

  Format your response as a JSON object with the following structure:
  {
    "jobKeywords": ["keyword1", "keyword2", ...],
    "missingKeywords": ["keyword3", "keyword4", ...],
    "suggestions": "Your suggestions here...",
    "enhancedContent": "The enhanced bullet point(s) here...",
    "sectionRating": "Your Rating out of 10."
  }
`;


  try {
    // const result = await model.generateContent(analyzePrompt);
    // const response = result.response;
    // const analysisText = response.text().trim();
    // const analysis = JSON.parse(analysisText);
    
    const result = await model.generateContent(analyzePrompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const analysis = JSON.parse(cleanedText);



    return { success: true, ...analysis };
  } catch (error) {
    console.error("Error analyzing and enhancing content:", error);
    return { 
      success: false, 
      error: "Failed to analyze and enhance content. Please try again later." 
    };
  }
}
