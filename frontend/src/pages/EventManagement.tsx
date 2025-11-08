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

const EventManagement = () => {
  const [query, setQuery] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${"http://localhost:3001"}/api/events`); // backend route
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Želite li obrisati oglas za događaj?")) return;

    try {
      const res = await fetch(`${"http://localhost:3001"}/api/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Greška u brisanju oglasa.");

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Error deleting event.");
    }
  };

  //filtriranje poslova
  const filteredEvents = events.filter((event) =>
    `${event.title} ${event.organizer} ${event.location} ${event.description}`
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
              Vaši oglasi za događaje:
            </h1>
            <p className="text-xl text-muted-foreground">
              Upravljajte Vašim oglasima za događaje.
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

          {/* Popis dogadaja */}
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, ind) => (
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
                    <p className="text-muted-foreground">{event.description}</p>

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
                        Uredi
                      </Button>
                      <Button
                        className="w-full md:w-auto bg-red-500 hover:bg-red-300"
                        onClick={() => handleDelete(event.id)}
                      >
                        Obriši
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">
                Nema dostupnih događaja za odabrane kriterije.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
