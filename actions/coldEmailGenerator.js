"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateColdEmail(data) {
  // data includes: profileName, profileUrl, jobTitle, jobDescription
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const prompt = `
    Write a concise, formal cold email addressed to ${data.profileName} (Profile URL: ${data.profileUrl}) regarding the opportunity for the role of ${data.jobTitle}.

    Job Description:
    ${data.jobDescription}

    Candidate Details:
    - Industry: ${user.industry || "N/A"}
    - Years of Experience: ${user.experience || "N/A"}
    - Skills: ${user.skills ? user.skills.join(", ") : "N/A"}
    - Professional Background: ${user.bio || "N/A"}

    Requirements:
    1. Keep the email brief and formal.
    2. Highlight the candidate's relevant skills and experience that match the job description.
    3. Use persuasive language to capture the recipient's interest.
    4. Format the email in markdown.

    Return only the email content in markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleanedText = text.replace(/```(?:markdown)?\n?/g, "").trim();
    return { coldEmail: cleanedText };
  } catch (error) {
    console.error("Error generating cold email:", error.message);
    throw new Error("Failed to generate cold email");
  }
}
