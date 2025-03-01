"use client"

import { useState } from "react"
import { enhanceContent } from "@/actions/enhance-content"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function EnhancePage() {
  const [companyName, setCompanyName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [contentType, setContentType] = useState("experience")
  const [userContent, setUserContent] = useState("")
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleEnhance() {
    if (!companyName || !jobDescription || !userContent) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await enhanceContent(companyName,jobTitle, jobDescription, contentType, userContent)

      if (result.success) {
        setAnalysis(result)
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Content Enhancer</h1>
      <p className="mb-8 text-muted-foreground">
        Enhance your content for job applications using AI. Enter the company name, job description, and your content to
        get an improved version tailored to the specific job opportunity.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Information</CardTitle>
            <CardDescription>Provide details about the job and your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <Input
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
                Job Description
              </label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here"
                rows={5}
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <Textarea
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Please mention the role you are applying for"
                rows={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <RadioGroup value={contentType} onValueChange={setContentType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experience" id="experience" />
                  <Label htmlFor="experience">Experience</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="project" id="project" />
                  <Label htmlFor="project">Project</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skills" id="skills" />
                  <Label htmlFor="skills">Skills</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <label htmlFor="userContent" className="block text-sm font-medium mb-1">
                Your Content
              </label>
              <Textarea
                id="userContent"
                value={userContent}
                onChange={(e) => setUserContent(e.target.value)}
                placeholder={`Enter your ${contentType} details`}
                rows={8}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleEnhance}
              disabled={isLoading || !companyName || !jobDescription || !userContent}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze and Enhance"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis and Enhancement</CardTitle>
            <CardDescription>AI-powered analysis and suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">{error}</div>}

            {analysis && (
              <>
                <div>
                  <h3 className="font-semibold mb-2">Job Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.jobKeywords.map((keyword, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <span key={index} className="bg-destructive text-white px-2 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Suggestions</h3>
                  <p className="text-sm text-muted-foreground">{analysis.suggestions}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Enhanced Content</h3>
                  <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">{analysis.enhancedContent}</div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Coach AI rating for this content</h3>
                  <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">  {analysis.sectionRating}</div>
                </div>
                
              </>
            )}

            {!analysis && !error && (
              <div className="bg-muted p-4 rounded-md text-muted-foreground flex items-center justify-center min-h-[300px]">
                Analysis and enhanced content will appear here
              </div>
            )}
          </CardContent>
          <CardFooter>
            {analysis && (
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(analysis.enhancedContent)
                }}
                className="w-full"
              >
                Copy Enhanced Content
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

