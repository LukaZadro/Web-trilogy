import { CVData } from "@/pages/CVBuilder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVForm = ({ data, onChange }: CVFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
  };

  const removeEducation = (index: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (index: number) => {
    onChange({ ...data, experience: data.experience.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+385 99 123 4567"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="Zagreb, Croatia"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.summary}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            placeholder="Brief summary of your professional background and goals..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg relative">
              <Button
                onClick={() => removeEducation(index)}
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="University of Zagreb"
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>GPA (optional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                  placeholder="4.0"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Experience</CardTitle>
          <Button onClick={addExperience} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg relative">
              <Button
                onClick={() => removeExperience(index)}
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Tech Company Inc."
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="Software Developer"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Key responsibilities and achievements..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Enter skills separated by commas</Label>
          <Input
            value={data.skills.join(", ")}
            onChange={(e) => onChange({ ...data, skills: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
            placeholder="JavaScript, React, TypeScript, Node.js"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Enter languages separated by commas</Label>
          <Input
            value={data.languages.join(", ")}
            onChange={(e) => onChange({ ...data, languages: e.target.value.split(",").map(l => l.trim()).filter(l => l) })}
            placeholder="English (Fluent), Croatian (Native)"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CVForm;
