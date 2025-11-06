import { CVData } from "@/pages/CVBuilder";

interface TemplateProps {
  data: CVData;
}

const ClassicTemplate = ({ data }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-background p-8 min-h-[297mm] print:shadow-none">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-border">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-muted-foreground space-y-1">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && (
            <div>{data.personalInfo.location}</div>
          )}
          {data.personalInfo.linkedin && (
            <div>{data.personalInfo.linkedin}</div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide border-b border-border pb-1">
            Sažetak
          </h2>
          <p className="text-foreground text-sm leading-relaxed mt-3">
            {data.summary}
          </p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide border-b border-border pb-1">
            Obrazovanje
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} in {edu.field}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide border-b border-border pb-1">
            Profesionalni sažetak
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mt-2">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide border-b border-border pb-1">
            Vještine
          </h2>
          <p className="text-sm text-foreground mt-3">
            {data.skills.join(" • ")}
          </p>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide border-b border-border pb-1">
            Jezici
          </h2>
          <p className="text-sm text-foreground mt-3">
            {data.languages.join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
