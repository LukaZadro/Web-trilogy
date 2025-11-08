import { CVData } from "@/pages/CVBuilder";

interface TemplateProps {
  data: CVData;
}

const MinimalTemplate = ({ data }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-background p-8 min-h-[297mm] print:shadow-none">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-light text-foreground mb-4">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>•</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>•</span>}
            {data.personalInfo.location && (
              <span>{data.personalInfo.location}</span>
            )}
            {data.personalInfo.linkedin && <span>•</span>}
            {data.personalInfo.linkedin && (
              <span>{data.personalInfo.linkedin}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <p className="text-foreground text-sm leading-loose">
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Iskustvo
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-foreground">
                    {exp.position}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {exp.company}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Obrazovanje
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-foreground">
                    {edu.degree} - {edu.field}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}
                </p>
                {edu.gpa && (
                  <p className="text-xs text-muted-foreground mt-1">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Vještine
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {data.skills.join(", ")}
            </p>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Jezici
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {data.languages.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
