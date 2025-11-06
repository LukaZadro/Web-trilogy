import { CVData } from "@/pages/CVBuilder";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

interface TemplateProps {
  data: CVData;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-background p-8 min-h-[297mm] print:shadow-none">
      {/* Header */}
      <div className="border-b-4 border-primary pb-6 mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {data.personalInfo.linkedin}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3">Professional Summary</h2>
          <p className="text-foreground leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-foreground">{edu.degree} - {edu.field}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-muted-foreground">{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-foreground">{exp.position}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-muted-foreground mb-2">{exp.company}</p>
              <p className="text-foreground text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-6">
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Languages</h2>
            <ul className="space-y-1">
              {data.languages.map((lang, index) => (
                <li key={index} className="text-foreground">{lang}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
