import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
        Build Resume In Industry Accepted Template.
        </h1>
      </div>
      <ResumeBuilder/>
        
    </div>
  );
}