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
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const JobManagement = () => {
  const [query, setQuery] = useState("");

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

  const handleDelete = async (id) => {
    if (!window.confirm("Želite li obrisati oglas za posao?")) return;

    try {
      const res = await fetch(
        `${"http://localhost:3001"}/api/job-postings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Greška u brisanju oglasa.");

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Error deleting job.");
    }
  };

  //filtriranje poslova
  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company_name} ${job.location} ${job.type} ${job.finalDate}`
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
              Vaši oglasi za posao:
            </h1>
            <p className="text-xl text-muted-foreground">
              Upravljajte Vašim oglasima za posao.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pretraži poslove, prakse..."
              className="pl-12 h-12 shadow-soft"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Popis poslova */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, ind) => (
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
                        {job.application_deadline}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-end">
                      <Button className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary/20">
                        Uredi
                      </Button>
                      <Button
                        className="w-full md:w-auto bg-red-500 hover:bg-red-300"
                        onClick={() => handleDelete(job.id)}
                      >
                        Obriši
                      </Button>
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
      <Footer />
    </div>
  );
};

export default JobManagement;
