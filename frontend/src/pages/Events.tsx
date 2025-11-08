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
import { MapPin, Search, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import domains_faculty from "@/data/domains_faculty";
import Footer from "@/components/Footer";

interface Events {
  id: number;
  name: string;
  date_from: string;
  date_to: string;
  location: string;
  organizer: string;
  domain: string;
  description: string;
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${"http://localhost:3001"}/api/events`);
      if (!res.ok) throw new Error("Neuspješan dohvat događanja");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const selectedEvents =
    selectedDomain === "all"
      ? events
      : events.filter((event) => event.domain === selectedDomain);

  //filtriranje dogadaja
  const filteredEvents = selectedEvents.filter((event) =>
    `${event.title} ${event.organizer} ${event.location} ${event.description}`
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
                Događanja i radionice
              </h1>
              <p className="text-xl text-muted-foreground">
                Pronađi najnovija događanja i radionice vezane uz karijerni
                razvoj i profesionalne vještine.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Pretraži događanja, radionice, organizatore..."
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
                    Sva područja sastavnica Sveiučilišta
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

            {/* Popis dogadaja */}
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="shadow-soft hover:shadow-medium transition-all duration-300 "
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">
                            {event.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {event.organizer}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {event.domain}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.start_datetime}
                        </div>
                        -
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.end_datetime}
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
                  Nema dostupnih događanja za odabrane kriterije.
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

export default Events;
