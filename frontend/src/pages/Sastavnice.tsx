import Navbar from "@/components/Navbar";
import React, { useMemo, useState } from "react";
import sastavnice from "../data/sastavnice";
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
  Globe,
  Phone,
  LucidePhoneIncoming,
  Mail,
  UserRoundCog,
  BookOpenTextIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import domains_faculty from "@/data/domains_faculty";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

type College = {
  id: string;
  name: string;
  addresses: string[];
  website?: string;
  phone?: string;
  fax?: string;
  emails?: string[];
  dean?: string;
  photo?: string;
  domain: string;
};

const data: College[] = sastavnice;

const Sastavnice = () => {
  const colleges: College[] = JSON.parse(JSON.stringify(data));

  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");

  const selectedColleges =
    selectedDomain === "all"
      ? colleges
      : colleges.filter((col) => col.domain === selectedDomain);

  //filtriranje poslova
  const filteredSastavnice = selectedColleges.filter((coll) =>
    `${coll.name} ${coll.dean} ${coll.addresses} ${coll.website} `
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-[180px] pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4 py-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Prikaz sastavnica Sveučilišta u Zagrebu
            </h1>
            <p className="text-xl text-muted-foreground">
              Pronađi informacije o sastavnicama Sveučilišta u Zagrebu. Odaberi
              fakultet ili akademiju koja te zanima i saznaj više. Ovo je prvi
              korak prema tvojoj akademskoj budućnosti. Sretno!
            </p>
            <p className="text-xl text-primary">
              <BookOpenTextIcon className="inline mr-2 h-4 w-4 " />
              <span className="font-bold ">NOVO!</span> Prouči vodič za buduće
              studente Sveučilišta u Zagrebu 2026./2027. ak. god. Saznaj sve o
              programima koje fakulteti i akademije nude. Također saznaj što te
              očekuje nakon završetka studija.
            </p>
            <p>
              Za više informacija pristisni gumb "Saznaj više" pored sastavnice
              koja te zanima.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pretraži sastavnice, dekane, adrese..."
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
            {filteredSastavnice.length > 0 ? (
              filteredSastavnice.map((coll, ind) => (
                <Card
                  key={ind}
                  className="shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col md:flex-row gap-2 min-h-auto"
                >
                  <div className="flex items-center justify-center px-6">
                    <img
                      src={`/fakulteti/${coll.photo}`}
                      className="w-[300px] h-[200px]"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-center">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">
                            {coll.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {coll.addresses}
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <a
                              href={`${coll.website}`}
                              className="text-primary underline"
                            >
                              {coll.website}
                            </a>
                          </div>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {coll.domain}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {coll.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <LucidePhoneIncoming className="h-4 w-4" />
                          {coll.fax}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {coll.emails}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <UserRoundCog className="h-4 w-4" />
                        Dekan: {coll.dean}
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-end">
                        <a href={`/sastavnice/${coll.id}`}>
                          <Button className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary/20">
                            Saznaj više
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">
                Nema dostupnih sastavnica za odabrane kriterije.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sastavnice;
