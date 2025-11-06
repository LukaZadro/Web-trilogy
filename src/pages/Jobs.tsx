import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Clock, Search } from "lucide-react";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer - Praksa",
      company: "Tech Solutions",
      location: "Zagreb",
      type: "Praksa",
      faculty: "FER",
      description: "Tražimo motiviranog studenta za rad na React projektima.",
      posted: "Prije 2 dana"
    },
    {
      id: 2,
      title: "Marketing Stažist",
      company: "Digital Agency",
      location: "Split",
      type: "Student poslovi",
      faculty: "Ekonomski fakultet",
      description: "Priključi se našem marketing timu i radi na zanimljivim kampanjama.",
      posted: "Prije 1 tjedan"
    },
    {
      id: 3,
      title: "Junior Data Analyst",
      company: "Analytics Corp",
      location: "Zagreb",
      type: "Posao",
      faculty: "PMF",
      description: "Tražimo analitičara podataka za rad s velikim datasetovima.",
      posted: "Prije 3 dana"
    },
    {
      id: 4,
      title: "UI/UX Designer - Praksa",
      company: "Design Studio",
      location: "Rijeka",
      type: "Praksa",
      faculty: "Arhitektonski fakultet",
      description: "Prilike za rad na raznovrsnim dizajnerskim projektima.",
      posted: "Prije 5 dana"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Poslovi & Prakse
            </h1>
            <p className="text-xl text-muted-foreground">
              Pronađi savršenu priliku za razvoj svoje karijere
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pretraži poslove, prakse, kompanije..."
              className="pl-12 h-12 shadow-soft"
            />
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.company}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {job.faculty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {job.posted}
                    </div>
                  </div>

                  <Button className="w-full md:w-auto">
                    Prijavi se
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

export default Jobs;
