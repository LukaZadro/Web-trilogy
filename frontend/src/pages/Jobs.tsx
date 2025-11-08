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
import { Briefcase, MapPin, Clock, Search } from "lucide-react";
import data from "../data/test-job.json";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import domains_faculty from "@/data/domains_faculty";

interface Jobs {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  faculty: string;
  domain: string;
  description: string;
  posted: string;
}

const Jobs = () => {
  //const jobs: Jobs[] = JSON.parse(JSON.stringify(data));

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${"http://localhost:3001"}/api/job-postings`); // backend route
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.jobPostings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");

  const selectedJobs =
    selectedDomain === "all"
      ? jobs
      : jobs.filter((job) => job.domain === selectedDomain);

  //filtriranje poslova
  const filteredJobs = selectedJobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.job_type}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-[180px] pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Ponuda poslova i praksi
            </h1>
            <p className="text-xl text-muted-foreground">
              Pronađi savršenu priliku za razvoj vlastite karijere
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pretraži poslove, prakse, kompanije..."
              className="pl-12 h-12 shadow-soft"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <p className="text-xl text-muted-foreground">
            Filtrirajte prema područjima sastavnica Sveučilišta
          </p>

          {/* Filter */}
          <div className="relative ">
            <Select onValueChange={setSelectedDomain} defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Odaberite područje sastavnice Sveučilišta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Sva područja sastavnica Sveučilišta
                </SelectItem>
                {domains_faculty.map((domain, index) => (
                  <SelectItem
                    key={index}
                    value={domain}
                    className="hover:bg-blue-600"
                  >
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Popis poslova */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="shadow-soft hover:shadow-medium transition-all duration-300 "
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <CardDescription className="text-base">
                          {job.company_name}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {job.domain}
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
                        {job.job_type}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {job.posted_date}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-end">
                      <Button className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary/20">
                        Saznaj više
                      </Button>
                      <Button className="w-full md:w-auto">Prijavi se</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">
                Nema dostupnih poslova za odabrane kriterije.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
