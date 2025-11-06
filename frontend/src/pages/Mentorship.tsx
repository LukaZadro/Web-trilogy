import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, GraduationCap, MessageCircle } from "lucide-react";

const Mentorship = () => {
  const mentors = [
    {
      id: 1,
      name: "Ana Horvat",
      role: "Senior Software Engineer",
      company: "Google",
      faculty: "FER",
      year: "2015",
      expertise: ["Backend Development", "Cloud Architecture", "Team Leadership"],
      bio: "10+ godina iskustva u razvoju softverskih rješenja i vođenju timova."
    },
    {
      id: 2,
      name: "Marko Kovačić",
      role: "Marketing Director",
      company: "Coca-Cola",
      faculty: "Ekonomski fakultet",
      year: "2012",
      expertise: ["Digital Marketing", "Brand Strategy", "Analytics"],
      bio: "Specijaliziran za razvoj globalnih marketing strategija."
    },
    {
      id: 3,
      name: "Petra Novak",
      role: "Data Scientist",
      company: "Microsoft",
      faculty: "PMF",
      year: "2016",
      expertise: ["Machine Learning", "Data Analysis", "Python"],
      bio: "Fokusirana na primjenu AI u rješavanju poslovnih izazova."
    },
    {
      id: 4,
      name: "Ivan Babić",
      role: "UX Design Lead",
      company: "Airbnb",
      faculty: "Arhitektonski fakultet",
      year: "2014",
      expertise: ["User Research", "Product Design", "Figma"],
      bio: "Strast za stvaranje intuitivnih i lijepih korisničkih iskustava."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Alumni mentorstvo
            </h1>
            <p className="text-xl text-muted-foreground">
              Poveži se s iskusnim profesionalcima sa svog fakulteta
            </p>
          </div>

          {/* Info Card */}
          <Card className="bg-gradient-card border-primary/20 shadow-soft">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Naši alumni mentori dijele svoje iskustvo i savjete kako bi ti pomoglipri razvoju karijere. Saznaj više o mogućnostima, industriji i praktičnim vještinama koje ti trebaju.
              </p>
            </CardContent>
          </Card>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-xl">{mentor.name}</CardTitle>
                      <CardDescription className="text-base">{mentor.role}</CardDescription>
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
                      <span>{mentor.faculty} - {mentor.year}</span>
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
