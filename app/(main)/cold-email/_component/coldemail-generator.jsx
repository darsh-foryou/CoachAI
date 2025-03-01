"use client";

import { useState } from "react";
import { generateColdEmail } from "@/actions/coldEmailGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function ColdEmailGeneratorPage() {
  const [profileName, setProfileName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coldEmail, setColdEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setColdEmail("");
    try {
      const result = await generateColdEmail({ profileName, profileUrl, jobTitle, jobDescription });
      setColdEmail(result.coldEmail);
    } catch (err) {
      console.error("Error generating cold email:", err);
      setError(err.message || "An error occurred while generating the cold email.");
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Cold Email Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label htmlFor="profileName" className="block text-sm font-medium">Profile Name</label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter recipient's name"
                required
              />
            </div>
            <div>
              <label htmlFor="profileUrl" className="block text-sm font-medium">Profile URL</label>
              <Input
                id="profileUrl"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="Enter recipient's profile URL"
                required
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium">Job Title</label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter job title"
                required
              />
            </div>
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium">Job Description</label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here"
                rows={5}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                "Generate Cold Email"
              )}
            </Button>
          </form>
          {error && <p className="text-destructive mt-4">{error}</p>}
          {coldEmail && (
            <div className="mt-4 p-4 border rounded whitespace-pre-wrap">
              <h3 className="font-semibold mb-2">Generated Cold Email</h3>
              <p>{coldEmail}</p>
            </div>
          )}
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
