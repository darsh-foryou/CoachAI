// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Trash2, Download, GraduationCapIcon, FilePlus, GraduationCap, BriefcaseIcon, ClipboardCheckIcon, ClipboardPenLine, ClipboardList, CodeIcon, Trash, Code2Icon } from "lucide-react";
// import { toast, Toaster } from "sonner";
// import dynamic from "next/dynamic";

// // Dynamically import jsPDF to avoid SSR issues
// const jsPDF = dynamic(() => import("jspdf"), { ssr: false });

// export default function ResumeBuilder() {
//   const [resume, setResume] = useState({
//     name: "Jake Ryan",
//     contact: "123-456-7890 | jake@su.edu | linkedin.com/in/jake | github.com/jake",
//     education: [
//       {
//         school: "Southwestern University",
//         degree: "Bachelor of Arts in Computer Science, Minor in Business",
//         location: "Georgetown, TX",
//         date: "Aug. 2018 - May 2021",
//       },
//       {
//         school: "Blinn College",
//         degree: "Associate's in Liberal Arts",
//         location: "Bryan, TX",
//         date: "Aug. 2014 - May 2018",
//       },
//     ],
//     experience: [
//       {
//         title: "Undergraduate Research Assistant",
//         company: "Texas A&M University",
//         location: "College Station, TX",
//         date: "June 2020 - Present",
//         details: [
//           "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
//           "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
//           "Explored ways to visualize GitHub collaboration in a classroom setting",
//         ],
//       },
//       {
//         title: "Information Technology Support Specialist",
//         company: "Southwestern University",
//         location: "Georgetown, TX",
//         date: "Sep. 2018 - Present",
//         details: [
//           "Communicate with managers to set up campus computers used on campus",
//           "Assess and troubleshoot computer problems brought by students, faculty and staff",
//           "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
//         ],
//       },
//       {
//         title: "Artificial Intelligence Research Assistant",
//         company: "Southwestern University",
//         location: "Georgetown, TX",
//         date: "May 2019 - July 2019",
//         details: [
//           "Explored methods to generate video game dungeons based off of The Legend of Zelda",
//           "Developed a game in Java to test the generated dungeons",
//           "Contributed 50K+ lines of code to an established codebase via Git",
//           "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable",
//           "Wrote an 8-page paper and gave multiple presentations on-campus",
//           "Presented virtually to the World Conference on Computational Intelligence",
//         ],
//       },
//     ],
//     projects: [
//       {
//         name: "Gitlytics",
//         technologies: "Python, Flask, React, PostgreSQL, Docker",
//         date: "June 2020 - Present",
//         details: [
//           "Developed a full-stack web application using with Flask serving a REST API with React as the frontend",
//           "Implemented GitHub OAuth to get data from user’s repositories",
//           "Visualized GitHub data to show collaboration",
//           "Used Celery and Redis for asynchronous tasks",
//         ],
//       },
//       {
//         name: "Simple Paintball",
//         technologies: "Spigot API, Java, Maven, TravisCI, Git",
//         date: "May 2018 - May 2020",
//         details: [
//           "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
//           "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
//           "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
//           "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
//         ],
//       },
//     ],
//     skills: {
//       languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
//       frameworks: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
//       developerTools:
//         "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
//       libraries: "pandas, NumPy, Matplotlib",
//     },
//   });

//   const [activeSection, setActiveSection] = useState("education");
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//   // Helpers to update resume state
//   const updateResume = (field, value) => {
//     setResume((prev) => ({ ...prev, [field]: value }));
//   };

//   const updateNestedField = (section, index, field, value) => {
//     setResume((prev) => {
//       const newSection = [...prev[section]];
//       newSection[index] = { ...newSection[index], [field]: value };
//       return { ...prev, [section]: newSection };
//     });
//   };

//   const addItem = (section, item) => {
//     setResume((prev) => ({ ...prev, [section]: [...prev[section], item] }));
//   };

//   const removeItem = (section, index) => {
//     setResume((prev) => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index),
//     }));
//   };

//   const updateDetail = (section, index, detailIndex, value) => {
//     setResume((prev) => {
//       const newSection = [...prev[section]];
//       const newDetails = [...newSection[index].details];
//       newDetails[detailIndex] = value;
//       newSection[index] = { ...newSection[index], details: newDetails };
//       return { ...prev, [section]: newSection };
//     });
//   };

//   const addDetail = (section, index) => {
//     setResume((prev) => {
//       const newSection = [...prev[section]];
//       const newDetails = [...newSection[index].details, ""];
//       newSection[index] = { ...newSection[index], details: newDetails };
//       return { ...prev, [section]: newSection };
//     });
//   };

//   const removeDetail = (section, index, detailIndex) => {
//     setResume((prev) => {
//       const newSection = [...prev[section]];
//       const newDetails = newSection[index].details.filter((_, i) => i !== detailIndex);
//       newSection[index] = { ...newSection[index], details: newDetails };
//       return { ...prev, [section]: newSection };
//     });
//   };

//   // PDF generation
//   const handleDownloadPDF = async () => {
//     setIsGeneratingPDF(true);
//     try {
//       const { default: jsPDF } = await import("jspdf");
//       const pdf = new jsPDF({ unit: "pt", format: "letter" });
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
  
//       // Adjust these for left/right padding
//       const marginLeft = 30;
//       const marginRight = 30;
  
//       // Starting vertical position
//       let y = 40; 
  
//       // Default font
//       pdf.setFont("times", "bold");
//       pdf.setFontSize(18);
  
//       // NAME (centered)
//       pdf.text(resume.name, pageWidth / 2, y, { align: "center" });
//       y += 24;
  
//       // CONTACT (centered)
//       pdf.setFontSize(10);
//       pdf.setFont("times", "normal");
//       pdf.text(resume.contact, pageWidth / 2, y, { align: "center" });
//       y += 18; // space after contact
  
//       // Helper to draw heading with line immediately below
//       const drawHeading = (heading) => {
//         pdf.setFontSize(12);
//         pdf.setFont("times", "bold");
//         pdf.text(heading, marginLeft, y);
//         // small increment so line is close to heading
//         y += 3;
//         // draw line from marginLeft to pageWidth - marginRight
//         pdf.setLineWidth(0.5);
//         pdf.line(marginLeft, y, pageWidth - marginRight, y);
//         // bigger gap after line
//         y += 15;
//       };
  
//       // EDUCATION
//       drawHeading("EDUCATION");
//       resume.education.forEach((edu) => {
//         pdf.setFontSize(11);
//         pdf.setFont("times", "bold");
//         pdf.text(edu.school, marginLeft, y);
//         pdf.text(edu.location, pageWidth - marginRight, y, { align: "right" });
//         y += 14;
//         pdf.setFont("times", "italic");
//         pdf.text(edu.degree, marginLeft, y);
//         pdf.setFont("times", "normal");
//         pdf.text(edu.date, pageWidth - marginRight, y, { align: "right" });
//         y += 16;
//       });
//       y += 6;
  
//       // EXPERIENCE
//       drawHeading("EXPERIENCE");
//       resume.experience.forEach((exp) => {
//         pdf.setFontSize(11);
//         pdf.setFont("times", "bold");
//         pdf.text(exp.title, marginLeft, y);
//         pdf.text(exp.date, pageWidth - marginRight, y, { align: "right" });
//         y += 14;
  
//         pdf.setFont("times", "italic");
//         pdf.text(exp.company, marginLeft, y);
//         pdf.setFont("times", "normal");
//         pdf.text(exp.location, pageWidth - marginRight, y, { align: "right" });
//         y += 14;
  
//         exp.details.forEach((detail) => {
//           pdf.setFontSize(10);
//           pdf.text("• " + detail, marginLeft + 20, y);
//           y += 14;
//         });
//         y += 10;
//       });
  
//       // PROJECTS
//       drawHeading("PROJECTS");
//       resume.projects.forEach((project) => {
//         pdf.setFontSize(11);
//         pdf.setFont("times", "bold");
//         pdf.text(`${project.name} | ${project.technologies}`, marginLeft, y);
//         pdf.setFont("times", "normal");
//         pdf.text(project.date, pageWidth - marginRight, y, { align: "right" });
//         y += 14;
  
//         project.details.forEach((detail) => {
//           pdf.setFontSize(10);
//           pdf.text("• " + detail, marginLeft + 20, y);
//           y += 14;
//         });
//         y += 10;
//       });
  
//       // TECHNICAL SKILLS
//       drawHeading("TECHNICAL SKILLS");
//       pdf.setFontSize(10);
//       pdf.setFont("times", "bold");
//       pdf.text("Languages: ", marginLeft, y);
//       pdf.setFont("times", "normal");
//       pdf.text(resume.skills.languages, marginLeft + 60, y);
//       y += 14;
  
//       pdf.setFont("times", "bold");
//       pdf.text("Frameworks: ", marginLeft, y);
//       pdf.setFont("times", "normal");
//       pdf.text(resume.skills.frameworks, marginLeft + 60, y);
//       y += 14;
  
//       pdf.setFont("times", "bold");
//       pdf.text("Dev Tools: ", marginLeft, y);
//       pdf.setFont("times", "normal");
//       pdf.text(resume.skills.developerTools, marginLeft + 60, y);
//       y += 14;
  
//       pdf.setFont("times", "bold");
//       pdf.text("Libraries: ", marginLeft, y);
//       pdf.setFont("times", "normal");
//       pdf.text(resume.skills.libraries, marginLeft + 60, y);
//       y += 14;
  
//       pdf.save(`${resume.name.replace(/\s+/g, "_")}_Resume.pdf`);
//       toast.success("PDF Generated Successfully!");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       toast.error("Error in PDF Generation");
//     } finally {
//       setIsGeneratingPDF(false);
//     }
//   };
  

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       <Toaster theme="dark" />

//       {/* LEFT SIDEBAR FOR SECTIONS */}
//       <div className="w-64 bg-gray-800 p-4">
//         <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
//         <nav>
//           <button
//             variant="outline" 
//             className={`w-full text-left p-2 mb-2 ${
//               activeSection === "education" ? "bg-zinc-600" : "hover:bg-gray-600"
//             }`}
//             onClick={() => setActiveSection("education")}
//           >
//             <GraduationCap/>
//             Education
//           </button>
//           <button
//             variant="outline"
//             className={`w-full text-left p-2 mb-2 ${
//               activeSection === "experience" ? "bg-zinc-600" : "hover:bg-gray-600"
//             }`}
//             onClick={() => setActiveSection("experience")}
//           >
//             <BriefcaseIcon/>
//             Experience
//           </button>
//           <button
//             variant="outline"
//             className={`w-full text-left p-2 mb-2 ${
//               activeSection === "projects" ? "bg-zinc-600" : "hover:bg-gray-600"
//             }`}
//             onClick={() => setActiveSection("projects")}
//           >
//             <CodeIcon/>
//             Projects
//           </button>
//           <button
//             variant="outline"
//             className={`w-full text-left p-2 mb-2 ${
//               activeSection === "skills" ? "bg-zinc-600" : "hover:bg-gray-600"
//             }`}
//             onClick={() => setActiveSection("skills")}
//           >
//             <ClipboardPenLine/>
//             Skills
//           </button>
//         </nav>
//       </div>

//       {/* MAIN CONTENT (FORM + PREVIEW) */}
//       <div className="flex-1 flex">
//         {/* FORM SECTION */}
//         <div className="w-1/2 p-8 overflow-y-auto">
//           <div className="mb-4">
//             <Button
//               onClick={handleDownloadPDF}
//               disabled={isGeneratingPDF}
//             >
//               {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
//               <Download className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               value={resume.name}
//               onChange={(e) => updateResume("name", e.target.value)}
//               className="bg-gray-700 border-gray-600"
//             />
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="contact">Contact Information</Label>
//             <Input
//               id="contact"
//               value={resume.contact}
//               onChange={(e) => updateResume("contact", e.target.value)}
//               className="bg-gray-700 border-gray-600"
//             />
//           </div>

//           {activeSection === "education" && (
//             <div>
//               <h2 className="text-xl font-bold mb-2 uppercase">Education</h2>
//               {resume.education.map((edu, index) => (
//                 <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
//                   <Input
//                     placeholder="School"
//                     value={edu.school}
//                     onChange={(e) =>
//                       updateNestedField("education", index, "school", e.target.value)
//                     }
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Degree"
//                     value={edu.degree}
//                     onChange={(e) =>
//                       updateNestedField("education", index, "degree", e.target.value)
//                     }
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Location"
//                     value={edu.location}
//                     onChange={(e) =>
//                       updateNestedField("education", index, "location", e.target.value)
//                     }
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Date"
//                     value={edu.date}
//                     onChange={(e) =>
//                       updateNestedField("education", index, "date", e.target.value)
//                     }
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Button className="bg-gray-900" variant="destructive" onClick={() => removeItem("education", index)}>
//                     Remove
//                     <Trash2/>
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 onClick={() =>
//                   addItem("education", {
//                     school: "",
//                     degree: "",
//                     location: "",
//                     date: "",
//                   })
//                 }
//                 variant="outline"
                
//               >
//               <GraduationCapIcon/>
//                 Add Education
//               </Button>
//             </div>
//           )}

//           {activeSection === "experience" && (
//             <div>
//               <h2 className="text-xl font-bold mb-2 uppercase">Experience</h2>
//               {resume.experience.map((exp, index) => (
//                 <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
//                   <Input
//                     placeholder="Title"
//                     value={exp.title}
//                     onChange={(e) => updateNestedField("experience", index, "title", e.target.value)}
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Company"
//                     value={exp.company}
//                     onChange={(e) => updateNestedField("experience", index, "company", e.target.value)}
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Location"
//                     value={exp.location}
//                     onChange={(e) => updateNestedField("experience", index, "location", e.target.value)}
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Date"
//                     value={exp.date}
//                     onChange={(e) => updateNestedField("experience", index, "date", e.target.value)}
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   {exp.details.map((detail, detailIndex) => (
//                     <div key={detailIndex} className="flex items-center space-x-2 mb-2">
//                       <Textarea
//                         placeholder="Detail"
//                         value={detail}
//                         onChange={(e) =>
//                           updateDetail("experience", index, detailIndex, e.target.value)
//                         }
//                         className="bg-gray-700 border-gray-600 text-white w-full"
//                       />
//                       <Button
//                         className="bg-gray-900"
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => removeDetail("experience", index, detailIndex)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => addDetail("experience", index)}
//                       className="flex items-center space-x-2 bg-slate-500 hover:bg-gray-600 text-white"
//                     >
//                       <FilePlus className="h-4 w-4" />
//                       <span className="hidden md:block">Add Detail</span>
//                     </Button>

//                     <Button
//                       className="flex items-center space-x-2 bg-gray-900 text-white"
//                       variant="destructive"
//                       onClick={() => removeItem("experience", index)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       <span>Remove</span>
//                     </Button>
//                   </div>

//                 </div>
//               ))}
//               <Button
//                 onClick={() =>
//                   addItem("experience", {
//                     title: "",
//                     company: "",
//                     location: "",
//                     date: "",
//                     details: [""],
//                   })
//                 }
//                 variant="outline"
//               >
//                 <BriefcaseIcon/>
//                 Add Experience
//               </Button>
//             </div>
//           )}

//           {activeSection === "projects" && (
//             <div>
//               <h2 className="text-xl font-bold mb-2 uppercase">Projects</h2>
//               {resume.projects.map((project, index) => (
//                 <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
//                   <Input
//                     placeholder="Project Name"
//                     value={project.name}
//                     onChange={(e) => updateNestedField("projects", index, "name", e.target.value)}
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Technologies"
//                     value={project.technologies}
//                     onChange={(e) =>
//                       updateNestedField("projects", index, "technologies", e.target.value)
//                     }
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   <Input
//                     placeholder="Date"
//                     value={project.date}
//                     onChange={(e) => updateNestedField("projects", index, "date", e.target.value)}
//                     className="mb-2 bg-gray-700 border-gray-600"
//                   />
//                   {project.details.map((detail, detailIndex) => (
//                     <div key={detailIndex} className="flex items-center space-x-2 mb-2">
//                       <Textarea
//                         placeholder="Detail"
//                         value={detail}
//                         onChange={(e) =>
//                           updateDetail("projects", index, detailIndex, e.target.value)
//                         }
//                         className="bg-gray-700 border-gray-600 text-white w-full"
//                       />
                      
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => removeDetail("projects", index, detailIndex)}
//                         className="bg-gray-900"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                    <div className="flex items-center space-x-2">
//                   <Button
//                     onClick={() => addDetail("projects", index)}
//                     className="bg-slate-500 hover:bg-gray-600 text-white"
//                   >
//                     <FilePlus className="h-4 w-4"/>
//                     Add Detail
//                   </Button>
//                   <Button className="flex items-center space-x-2 bg-gray-900 text-white" variant="destructive" onClick={() => removeItem("projects", index)}>
//                     <Trash2/>
//                     Remove
//                   </Button>
//                   </div>
//                 </div>
//               ))}
//               <Button
//                 onClick={() =>
//                   addItem("projects", {
//                     name: "",
//                     technologies: "",
//                     date: "",
//                     details: [""],
//                   })
//                 }
//                 variant="outline"
//               >
//                 <Code2Icon/>
//                 Add Project
//               </Button>
//             </div>
//           )}

//           {activeSection === "skills" && (
//             <div>
//               <h2 className="text-xl font-bold mb-2 uppercase">Technical Skills</h2>
//               <div className="mb-4">
//                 <Label htmlFor="languages">Languages</Label>
//                 <Input
//                   id="languages"
//                   value={resume.skills.languages}
//                   onChange={(e) =>
//                     updateResume("skills", { ...resume.skills, languages: e.target.value })
//                   }
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div className="mb-4">
//                 <Label htmlFor="frameworks">Frameworks</Label>
//                 <Input
//                   id="frameworks"
//                   value={resume.skills.frameworks}
//                   onChange={(e) =>
//                     updateResume("skills", { ...resume.skills, frameworks: e.target.value })
//                   }
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div className="mb-4">
//                 <Label htmlFor="developerTools">Developer Tools</Label>
//                 <Input
//                   id="developerTools"
//                   value={resume.skills.developerTools}
//                   onChange={(e) =>
//                     updateResume("skills", { ...resume.skills, developerTools: e.target.value })
//                   }
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="libraries">Libraries</Label>
//                 <Input
//                   id="libraries"
//                   value={resume.skills.libraries}
//                   onChange={(e) =>
//                     updateResume("skills", { ...resume.skills, libraries: e.target.value })
//                   }
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* PREVIEW SECTION */}
//         <div className="w-1/2 bg-gray-800 p-8 overflow-y-auto">
//           <div className="text-center mb-2">
//             <h1 className="text-3xl font-bold uppercase">{resume.name}</h1>
//             <p className="text-sm mt-1">{resume.contact}</p>
//           </div>
//           <hr className="border-gray-600 mb-4" />
//           <div className="mb-8">
//             <h2 className="text-lg font-bold uppercase">Education</h2>
//             <hr className="border-gray-600 mb-3" />
//             {resume.education.map((edu, index) => (
//               <div key={index} className="mb-4">
//                 <div className="flex justify-between">
//                   <span className="font-bold">{edu.school}</span>
//                   <span>{edu.date}</span>
//                 </div>
//                 <div className="flex justify-between italic">
//                   <span>{edu.degree}</span>
//                   <span>{edu.location}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mb-8">
//             <h2 className="text-lg font-bold uppercase">Experience</h2>
//             <hr className="border-gray-600 mb-3" />
//             {resume.experience.map((exp, index) => (
//               <div key={index} className="mb-6">
//                 <div className="flex justify-between">
//                   <span className="font-bold">{exp.title}</span>
//                   <span>{exp.date}</span>
//                 </div>
//                 <div className="flex justify-between italic mb-2">
//                   <span>{exp.company}</span>
//                   <span>{exp.location}</span>
//                 </div>
//                 <ul className="list-disc ml-5 space-y-1">
//                   {exp.details.map((detail, detailIndex) => (
//                     <li key={detailIndex} className="text-sm">{detail}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="mb-8">
//             <h2 className="text-lg font-bold uppercase">Projects</h2>
//             <hr className="border-gray-600 mb-3" />
//             {resume.projects.map((project, index) => (
//               <div key={index} className="mb-6">
//                 <div className="flex justify-between">
//                   <span className="font-bold">{project.name} | {project.technologies}</span>
//                   <span>{project.date}</span>
//                 </div>
//                 <ul className="list-disc ml-5 mt-1 space-y-1">
//                   {project.details.map((detail, detailIndex) => (
//                     <li key={detailIndex} className="text-sm">{detail}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="mb-8">
//             <h2 className="text-lg font-bold uppercase">Technical Skills</h2>
//             <hr className="border-gray-600 mb-3" />
//             <div className="text-sm space-y-2">
//               <p>
//                 <span className="font-bold">Languages: </span>
//                 {resume.skills.languages}
//               </p>
//               <p>
//                 <span className="font-bold">Frameworks: </span>
//                 {resume.skills.frameworks}
//               </p>
//               <p>
//                 <span className="font-bold">Developer Tools: </span>
//                 {resume.skills.developerTools}
//               </p>
//               <p>
//                 <span className="font-bold">Libraries: </span>
//                 {resume.skills.libraries}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Trash2,
  Download,
  GraduationCapIcon,
  FilePlus,
  GraduationCap,
  BriefcaseIcon,
  ClipboardPenLine,
  CodeIcon,
  Trash,
  Code2Icon,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import dynamic from "next/dynamic";

// Dynamically import jsPDF to avoid SSR issues
const jsPDF = dynamic(() => import("jspdf"), { ssr: false });

export default function ResumeBuilder() {
  const [resume, setResume] = useState({
    name: "Jake Ryan",
    contact: "123-456-7890 | jake@su.edu | linkedin.com/in/jake | github.com/jake",
    education: [
      {
        school: "Southwestern University",
        degree: "Bachelor of Arts in Computer Science, Minor in Business",
        location: "Georgetown, TX",
        date: "Aug. 2018 - May 2021",
      },
      {
        school: "Blinn College",
        degree: "Associate's in Liberal Arts",
        location: "Bryan, TX",
        date: "Aug. 2014 - May 2018",
      },
    ],
    experience: [
      {
        title: "Undergraduate Research Assistant",
        company: "Texas A&M University",
        location: "College Station, TX",
        date: "June 2020 - Present",
        details: [
          "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
          "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
          "Explored ways to visualize GitHub collaboration in a classroom setting",
        ],
      },
      {
        title: "Information Technology Support Specialist",
        company: "Southwestern University",
        location: "Georgetown, TX",
        date: "Sep. 2018 - Present",
        details: [
          "Communicate with managers to set up campus computers used on campus",
          "Assess and troubleshoot computer problems brought by students, faculty and staff",
          "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
        ],
      },
      {
        title: "Artificial Intelligence Research Assistant",
        company: "Southwestern University",
        location: "Georgetown, TX",
        date: "May 2019 - July 2019",
        details: [
          "Explored methods to generate video game dungeons based off of The Legend of Zelda",
          "Developed a game in Java to test the generated dungeons",
          "Contributed 50K+ lines of code to an established codebase via Git",
          "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable",
          "Wrote an 8-page paper and gave multiple presentations on-campus",
          "Presented virtually to the World Conference on Computational Intelligence",
        ],
      },
    ],
    projects: [
      {
        name: "Gitlytics",
        technologies: "Python, Flask, React, PostgreSQL, Docker",
        date: "June 2020 - Present",
        details: [
          "Developed a full-stack web application using with Flask serving a REST API with React as the frontend",
          "Implemented GitHub OAuth to get data from user’s repositories",
          "Visualized GitHub data to show collaboration",
          "Used Celery and Redis for asynchronous tasks",
        ],
      },
      {
        name: "Simple Paintball",
        technologies: "Spigot API, Java, Maven, TravisCI, Git",
        date: "May 2018 - May 2020",
        details: [
          "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
          "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
          "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
          "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
        ],
      },
    ],
    skills: {
      languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
      frameworks: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
      developerTools:
        "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
      libraries: "pandas, NumPy, Matplotlib",
    },
  });

  const [activeSection, setActiveSection] = useState("education");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Helpers to update resume state
  const updateResume = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (section, index, field, value) => {
    setResume((prev) => {
      const newSection = [...prev[section]];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addItem = (section, item) => {
    setResume((prev) => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const removeItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateDetail = (section, index, detailIndex, value) => {
    setResume((prev) => {
      const newSection = [...prev[section]];
      const newDetails = [...newSection[index].details];
      newDetails[detailIndex] = value;
      newSection[index] = { ...newSection[index], details: newDetails };
      return { ...prev, [section]: newSection };
    });
  };

  const addDetail = (section, index) => {
    setResume((prev) => {
      const newSection = [...prev[section]];
      const newDetails = [...newSection[index].details, ""];
      newSection[index] = { ...newSection[index], details: newDetails };
      return { ...prev, [section]: newSection };
    });
  };

  const removeDetail = (section, index, detailIndex) => {
    setResume((prev) => {
      const newSection = [...prev[section]];
      const newDetails = newSection[index].details.filter((_, i) => i !== detailIndex);
      newSection[index] = { ...newSection[index], details: newDetails };
      return { ...prev, [section]: newSection };
    });
  };

  // PDF generation
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      // const pageHeight = pdf.internal.pageSize.getHeight(); // Not used, but left for reference

      // Adjust these for left/right padding
      const marginLeft = 30;
      const marginRight = 30;

      // Starting vertical position
      let y = 40;

      // Default font
      pdf.setFont("times", "bold");
      pdf.setFontSize(18);

      // NAME (centered)
      pdf.text(resume.name, pageWidth / 2, y, { align: "center" });
      y += 24;

      // CONTACT (centered)
      pdf.setFontSize(10);
      pdf.setFont("times", "normal");
      pdf.text(resume.contact, pageWidth / 2, y, { align: "center" });
      y += 18; // space after contact

      // Helper to draw heading with line immediately below
      const drawHeading = (heading) => {
        pdf.setFontSize(12);
        pdf.setFont("times", "bold");
        pdf.text(heading, marginLeft, y);
        // small increment so line is close to heading
        y += 3;
        // draw line from marginLeft to pageWidth - marginRight
        pdf.setLineWidth(0.5);
        pdf.line(marginLeft, y, pageWidth - marginRight, y);
        // bigger gap after line
        y += 15;
      };

      // EDUCATION
      drawHeading("EDUCATION");
      resume.education.forEach((edu) => {
        pdf.setFontSize(11);
        pdf.setFont("times", "bold");
        pdf.text(edu.school, marginLeft, y);
        pdf.text(edu.location, pageWidth - marginRight, y, { align: "right" });
        y += 14;
        pdf.setFont("times", "italic");
        pdf.text(edu.degree, marginLeft, y);
        pdf.setFont("times", "normal");
        pdf.text(edu.date, pageWidth - marginRight, y, { align: "right" });
        y += 16;
      });
      y += 6;

      // EXPERIENCE
      drawHeading("EXPERIENCE");
      resume.experience.forEach((exp) => {
        pdf.setFontSize(11);
        pdf.setFont("times", "bold");
        pdf.text(exp.title, marginLeft, y);
        pdf.text(exp.date, pageWidth - marginRight, y, { align: "right" });
        y += 14;

        pdf.setFont("times", "italic");
        pdf.text(exp.company, marginLeft, y);
        pdf.setFont("times", "normal");
        pdf.text(exp.location, pageWidth - marginRight, y, { align: "right" });
        y += 14;

        exp.details.forEach((detail) => {
          pdf.setFontSize(10);
          pdf.text("• " + detail, marginLeft + 20, y);
          y += 14;
        });
        y += 10;
      });

      // PROJECTS
      drawHeading("PROJECTS");
      resume.projects.forEach((project) => {
        pdf.setFontSize(11);
        pdf.setFont("times", "bold");
        pdf.text(`${project.name} | ${project.technologies}`, marginLeft, y);
        pdf.setFont("times", "normal");
        pdf.text(project.date, pageWidth - marginRight, y, { align: "right" });
        y += 14;

        project.details.forEach((detail) => {
          pdf.setFontSize(10);
          pdf.text("• " + detail, marginLeft + 20, y);
          y += 14;
        });
        y += 10;
      });

      // TECHNICAL SKILLS
      drawHeading("TECHNICAL SKILLS");
      pdf.setFontSize(10);
      pdf.setFont("times", "bold");
      pdf.text("Languages: ", marginLeft, y);
      pdf.setFont("times", "normal");
      pdf.text(resume.skills.languages, marginLeft + 60, y);
      y += 14;

      pdf.setFont("times", "bold");
      pdf.text("Frameworks: ", marginLeft, y);
      pdf.setFont("times", "normal");
      pdf.text(resume.skills.frameworks, marginLeft + 60, y);
      y += 14;

      pdf.setFont("times", "bold");
      pdf.text("Dev Tools: ", marginLeft, y);
      pdf.setFont("times", "normal");
      pdf.text(resume.skills.developerTools, marginLeft + 60, y);
      y += 14;

      pdf.setFont("times", "bold");
      pdf.text("Libraries: ", marginLeft, y);
      pdf.setFont("times", "normal");
      pdf.text(resume.skills.libraries, marginLeft + 60, y);
      y += 14;

      pdf.save(`${resume.name.replace(/\s+/g, "_")}_Resume.pdf`);
      toast.success("PDF Generated Successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error in PDF Generation");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Toaster theme="dark" />

      {/* LEFT SIDEBAR FOR SECTIONS */}
      {/* Make background black & add white border */}
      <div className="w-64 bg-black p-4 border border-white">
        <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
        <nav>
          <button
            variant="outline"
            className={`w-full text-left p-2 mb-2 ${
              activeSection === "education" ? "bg-zinc-600" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection("education")}
          >
            <GraduationCap />
            Education
          </button>
          <button
            variant="outline"
            className={`w-full text-left p-2 mb-2 ${
              activeSection === "experience" ? "bg-zinc-600" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection("experience")}
          >
            <BriefcaseIcon />
            Experience
          </button>
          <button
            variant="outline"
            className={`w-full text-left p-2 mb-2 ${
              activeSection === "projects" ? "bg-zinc-600" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection("projects")}
          >
            <CodeIcon />
            Projects
          </button>
          <button
            variant="outline"
            className={`w-full text-left p-2 mb-2 ${
              activeSection === "skills" ? "bg-zinc-600" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection("skills")}
          >
            <ClipboardPenLine />
            Skills
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT (FORM + PREVIEW) */}
      <div className="flex-1 flex">
        {/* FORM SECTION */}
        {/* Make background black & add white border */}
        <div className="w-1/2 p-8 overflow-y-auto bg-black border border-white">
          <div className="mb-4">
            <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
              {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={resume.name}
              onChange={(e) => updateResume("name", e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              value={resume.contact}
              onChange={(e) => updateResume("contact", e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
          </div>

          {activeSection === "education" && (
            <div>
              <h2 className="text-xl font-bold mb-2 uppercase">Education</h2>
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                  <Input
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) =>
                      updateNestedField("education", index, "school", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      updateNestedField("education", index, "degree", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Location"
                    value={edu.location}
                    onChange={(e) =>
                      updateNestedField("education", index, "location", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Date"
                    value={edu.date}
                    onChange={(e) =>
                      updateNestedField("education", index, "date", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Button
                    className="bg-gray-900"
                    variant="destructive"
                    onClick={() => removeItem("education", index)}
                  >
                    Remove
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  addItem("education", {
                    school: "",
                    degree: "",
                    location: "",
                    date: "",
                  })
                }
                variant="outline"
              >
                <GraduationCapIcon />
                Add Education
              </Button>
            </div>
          )}

          {activeSection === "experience" && (
            <div>
              <h2 className="text-xl font-bold mb-2 uppercase">Experience</h2>
              {resume.experience.map((exp, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                  <Input
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) =>
                      updateNestedField("experience", index, "title", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      updateNestedField("experience", index, "company", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) =>
                      updateNestedField("experience", index, "location", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Date"
                    value={exp.date}
                    onChange={(e) =>
                      updateNestedField("experience", index, "date", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  {exp.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2 mb-2">
                      <Textarea
                        placeholder="Detail"
                        value={detail}
                        onChange={(e) =>
                          updateDetail("experience", index, detailIndex, e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white w-full"
                      />
                      <Button
                        className="bg-gray-900"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeDetail("experience", index, detailIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => addDetail("experience", index)}
                      className="flex items-center space-x-2 bg-slate-500 hover:bg-gray-600 text-white"
                    >
                      <FilePlus className="h-4 w-4" />
                      <span className="hidden md:block">Add Detail</span>
                    </Button>

                    <Button
                      className="flex items-center space-x-2 bg-gray-900 text-white"
                      variant="destructive"
                      onClick={() => removeItem("experience", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                onClick={() =>
                  addItem("experience", {
                    title: "",
                    company: "",
                    location: "",
                    date: "",
                    details: [""],
                  })
                }
                variant="outline"
              >
                <BriefcaseIcon />
                Add Experience
              </Button>
            </div>
          )}

          {activeSection === "projects" && (
            <div>
              <h2 className="text-xl font-bold mb-2 uppercase">Projects</h2>
              {resume.projects.map((project, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                  <Input
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => updateNestedField("projects", index, "name", e.target.value)}
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Technologies"
                    value={project.technologies}
                    onChange={(e) =>
                      updateNestedField("projects", index, "technologies", e.target.value)
                    }
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  <Input
                    placeholder="Date"
                    value={project.date}
                    onChange={(e) => updateNestedField("projects", index, "date", e.target.value)}
                    className="mb-2 bg-gray-700 border-gray-600"
                  />
                  {project.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2 mb-2">
                      <Textarea
                        placeholder="Detail"
                        value={detail}
                        onChange={(e) =>
                          updateDetail("projects", index, detailIndex, e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white w-full"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeDetail("projects", index, detailIndex)}
                        className="bg-gray-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => addDetail("projects", index)}
                      className="bg-slate-500 hover:bg-gray-600 text-white"
                    >
                      <FilePlus className="h-4 w-4" />
                      Add Detail
                    </Button>
                    <Button
                      className="flex items-center space-x-2 bg-gray-900 text-white"
                      variant="destructive"
                      onClick={() => removeItem("projects", index)}
                    >
                      <Trash2 />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                onClick={() =>
                  addItem("projects", {
                    name: "",
                    technologies: "",
                    date: "",
                    details: [""],
                  })
                }
                variant="outline"
              >
                <Code2Icon />
                Add Project
              </Button>
            </div>
          )}

          {activeSection === "skills" && (
            <div>
              <h2 className="text-xl font-bold mb-2 uppercase">Technical Skills</h2>
              <div className="mb-4">
                <Label htmlFor="languages">Languages</Label>
                <Input
                  id="languages"
                  value={resume.skills.languages}
                  onChange={(e) =>
                    updateResume("skills", { ...resume.skills, languages: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="frameworks">Frameworks</Label>
                <Input
                  id="frameworks"
                  value={resume.skills.frameworks}
                  onChange={(e) =>
                    updateResume("skills", { ...resume.skills, frameworks: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="developerTools">Developer Tools</Label>
                <Input
                  id="developerTools"
                  value={resume.skills.developerTools}
                  onChange={(e) =>
                    updateResume("skills", {
                      ...resume.skills,
                      developerTools: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="libraries">Libraries</Label>
                <Input
                  id="libraries"
                  value={resume.skills.libraries}
                  onChange={(e) =>
                    updateResume("skills", { ...resume.skills, libraries: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* PREVIEW SECTION */}
        {/* Make background black & add white border */}
        <div className="w-1/2 bg-black p-8 overflow-y-auto border border-white">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold uppercase">{resume.name}</h1>
            <p className="text-sm mt-1">{resume.contact}</p>
          </div>
          <hr className="border-gray-600 mb-4" />
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase">Education</h2>
            <hr className="border-gray-600 mb-3" />
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <span className="font-bold">{edu.school}</span>
                  <span>{edu.date}</span>
                </div>
                <div className="flex justify-between italic">
                  <span>{edu.degree}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase">Experience</h2>
            <hr className="border-gray-600 mb-3" />
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between">
                  <span className="font-bold">{exp.title}</span>
                  <span>{exp.date}</span>
                </div>
                <div className="flex justify-between italic mb-2">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1">
                  {exp.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase">Projects</h2>
            <hr className="border-gray-600 mb-3" />
            {resume.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between">
                  <span className="font-bold">
                    {project.name} | {project.technologies}
                  </span>
                  <span>{project.date}</span>
                </div>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  {project.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase">Technical Skills</h2>
            <hr className="border-gray-600 mb-3" />
            <div className="text-sm space-y-2">
              <p>
                <span className="font-bold">Languages: </span>
                {resume.skills.languages}
              </p>
              <p>
                <span className="font-bold">Frameworks: </span>
                {resume.skills.frameworks}
              </p>
              <p>
                <span className="font-bold">Developer Tools: </span>
                {resume.skills.developerTools}
              </p>
              <p>
                <span className="font-bold">Libraries: </span>
                {resume.skills.libraries}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
