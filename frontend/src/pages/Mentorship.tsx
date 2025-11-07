import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, GraduationCap, MessageCircle } from "lucide-react";
import mentors from "@/data/menthors";
import students from "@/data/students";
import { useParams } from "react-router-dom";

const Mentorship = () => {
  const { role } = useParams();
  const currentMentStudent = role === "student" ? mentors : students;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-[180px] pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {role === "student"
                ? "Alumni mentorstvo"
                : "Mentoriranje studenata"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {role === "student"
                ? "Poveži se s iskusnim profesionalcima sa svog fakulteta."
                : "Pronađi studenta za istraživanje i mentoriraj ga kroz njegov akademski, ali i svoj profesionalni razvoj."}
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {currentMentStudent.map((mentor) => (
              <Card
                key={mentor.id}
                className="shadow-soft hover:shadow-medium transition-all duration-300 "
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-xl">{mentor.name}</CardTitle>
                      <CardDescription className="text-base">
                        {mentor.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{mentor.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>
                        {mentor.faculty} - {mentor.year}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full group">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Pošalji poruku
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
