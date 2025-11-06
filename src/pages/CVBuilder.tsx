import { useState } from "react";
import Navbar from "@/components/Navbar";
import CVForm from "@/components/cv/CVForm";
import ModernTemplate from "@/components/cv/templates/ModernTemplate";
import ClassicTemplate from "@/components/cv/templates/ClassicTemplate";
import MinimalTemplate from "@/components/cv/templates/MinimalTemplate";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  languages: string[];
}

const CVBuilder = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    summary: "",
    education: [],
    experience: [],
    skills: [],
    languages: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "classic" | "minimal">("modern");

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={cvData} />;
      case "classic":
        return <ClassicTemplate data={cvData} />;
      case "minimal":
        return <MinimalTemplate data={cvData} />;
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">CV Builder</h1>
          <p className="text-muted-foreground">Create a professional CV with our templates</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CVForm data={cvData} onChange={setCvData} />
          </div>

          <div className="space-y-4 print:col-span-2">
            <div className="flex items-center justify-between print:hidden">
              <Tabs value={selectedTemplate} onValueChange={(v) => setSelectedTemplate(v as any)}>
                <TabsList>
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                  <TabsTrigger value="classic">Classic</TabsTrigger>
                  <TabsTrigger value="minimal">Minimal</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handlePrint}>Download PDF</Button>
            </div>

            <div className="border rounded-lg bg-card print:border-0">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CVBuilder;
