import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, ExternalLink } from "lucide-react";

const Organizations = () => {
  const organizations = [
    {
      id: 1,
      name: "EESTEC LC Zagreb",
      faculty: "FER",
      category: "Tehnologija",
      members: 150,
      description: "Studentska organizacija koja promiče razvoj tehnologije i inženjerstva.",
      activities: ["Radionice", "Networking", "Projekti"]
    },
    {
      id: 2,
      name: "AIESEC Zagreb",
      faculty: "Ekonomski fakultet",
      category: "Međunarodno",
      members: 200,
      description: "Globalna platforma za mlade lidere i međunarodne prilike.",
      activities: ["Razmjene", "Leadership", "Volontiranje"]
    },
    {
      id: 3,
      name: "Student Club PMF",
      faculty: "PMF",
      category: "Znanost",
      members: 80,
      description: "Promicanje znanstvenog rada i suradnje među studentima.",
      activities: ["Istraživanje", "Predavanja", "Natjecanja"]
    },
    {
      id: 4,
      name: "Media Lab",
      faculty: "Filozofski fakultet",
      category: "Mediji",
      members: 60,
      description: "Kreativna zajednica za studente medija i komunikacija.",
      activities: ["Produkcija", "Marketing", "Kreativa"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Studentske udruge
            </h1>
            <p className="text-xl text-muted-foreground">
              Pronađi svoju zajednicu i razvijaj vještine
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pretraži udruge po kategorijama, fakultetu..."
              className="pl-12 h-12 shadow-soft"
            />
          </div>

          {/* Organizations Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {organizations.map((org) => (
              <Card key={org.id} className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-xl">{org.name}</CardTitle>
                      <CardDescription>{org.faculty}</CardDescription>
                    </div>
                    <Badge variant="secondary">{org.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{org.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{org.members} članova</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {org.activities.map((activity, idx) => (
                      <Badge key={idx} variant="outline">
                        {activity}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full group">
                    Saznaj više
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

export default Organizations;
