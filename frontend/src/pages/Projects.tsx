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
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  Calendar,
  User2,
} from "lucide-react";
import data from "../data/test-project.json";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/Footer";

interface Projects {
  id: number;
  name: string;
  date_from: string;
  date_to: string;
  location: string;
  organizer: string;
  faculty: string;
  description: string;
  positions_available: number;
  position_type: string;
}

const Projects = () => {
  const projects: Projects[] = JSON.parse(JSON.stringify(data));

  const [query, setQuery] = useState("");

  //filtriranje projekata
  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.organizer} ${project.location} ${project.description} ${project.faculty} ${project.position_type}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 pt-[180px] pb-16">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Projekti
              </h1>
              <p className="text-xl text-muted-foreground">
                Pronađi najzanimljivije projekte na Sveučilištu u Zagrebu i
                pridruži se! Budi dio inovacija i istraživanja koja oblikuju
                budućnost.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Pretraži projekte po nazivu, organizatoru, lokaciji..."
                className="pl-12 h-12 shadow-soft"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Popis projekata */}
            <div className="space-y-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="shadow-soft hover:shadow-medium transition-all duration-300 "
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {project.organizer}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {project.faculty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User2 className="h-4 w-4" />
                          {project.positions_available}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {project.date_from}
                        </div>
                        -
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {project.date_to}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-end">
                        <Button className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary/20">
                          Saznaj više
                        </Button>
                        <Button className="w-full md:w-auto">
                          Pridruži se
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">
                  Nema dostupnih projekata za odabrane kriterije.
                </p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
