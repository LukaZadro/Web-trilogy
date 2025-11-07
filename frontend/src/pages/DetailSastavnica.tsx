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
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import PdfPreview from "@/components/pdf/PdfPreview";

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
  page: number;
};

const data: College[] = sastavnice;

const DetailSastavnica = () => {
  const { collid } = useParams();

  const colleges: College[] = JSON.parse(JSON.stringify(data));
  const selectedCollege = colleges.find((c) => c.id === collid);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-[180px] pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col items-start gap-2 min-h-auto">
            <div className="space-y-4 px-6 py-6">
              <h1 className="text-2xl md:text-5xl font-bold text-foreground">
                {selectedCollege?.name}
              </h1>
            </div>
            <div className="space-y-4 px-6 py-2">
              <Badge variant="secondary" className="w-fit">
                {selectedCollege?.domain}
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-start px-6 py-6">
              <img
                src={`/fakulteti/${selectedCollege?.photo}`}
                className="w-[300px] h-[200px]"
              />
              <div className="flex flex-col w-full justify-center">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {selectedCollege?.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedCollege?.addresses}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={`${selectedCollege?.website}`}
                          className="text-primary underline"
                        >
                          {selectedCollege?.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {selectedCollege?.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <LucidePhoneIncoming className="h-4 w-4" />
                      {selectedCollege?.fax}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedCollege?.emails}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserRoundCog className="h-4 w-4" />
                    Dekan: {selectedCollege?.dean}
                  </div>
                </CardContent>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 px-6 py-8 w-full">
              <p className="text-2xl font-bold text-foreground">
                VODIČ ZA BUDUĆE STUDENTE - {selectedCollege?.name}
              </p>
              <div className="flex justify-start w-full">
                <a href="/vodic-za-buduce-student-akgod-2026-2027.pdf" download>
                  <Button className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary/20">
                    <Download className="mr-2 h-4 w-4" />
                    Preuzmi vodič kao PDF
                  </Button>
                </a>
              </div>
              <div className="py-10 w-full">
                <PdfPreview
                  fileUrl="/vodic-za-buduce-student-akgod-2026-2027.pdf"
                  pageNumber={selectedCollege?.page}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailSastavnica;
