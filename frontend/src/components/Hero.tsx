import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import data from "../data/roles.json";

interface Roles {
  id: number;
  title: string;
  icon: string;
}

const Hero = () => {
  const newData: Roles[] = JSON.parse(JSON.stringify(data));

  return (
    <section className="relative min-h-[100vh] flex-col items-center justify-center overflow-hidden  pt-40">
      <div className="flex flex-col justify-center items-center h-[900px] md:h-[700px] bg-gradient-hero bg-opacity-100">
        <div className="container flex flex-col items-center md:flex-row md:justify-center gap-8 md:gap-4 mx-auto px-4 relative z-10 pt-20 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Tvoja karijera
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                počinje ovdje
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Dobro došli na platformu koja povezuje{" "}
              <span className="text-yellow-400 drop-shadow-lg font-bold">
                studente
              </span>
              ,{" "}
              <span className="text-yellow-400 drop-shadow-lg font-bold">
                alumni
              </span>
              ,{" "}
              <span className="text-yellow-400 drop-shadow-lg font-bold">
                poslodavce
              </span>
              ,{" "}
              <span className="text-yellow-400 drop-shadow-lg font-bold">
                udruge
              </span>{" "}
              i{" "}
              <span className="text-yellow-400 drop-shadow-lg font-bold">
                sastavnice Sveučilišta u Zagrebu
              </span>{" "}
              na jednom mjestu!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="shadow-glow group">
                Započni sada
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <img
            src="homeImg.png"
            className="w-[600px] h-[300px] md:w-[500px] md:h-[400px]"
          />
        </div>
      </div>
      <p className="text-xl md:text-2xl text-muted-foreground text-center pt-20">
        Odaberite svoju ulogu i započnite svoje putovanje danas!
      </p>
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-6 pt-20 pb-20">
        {newData.map((role) => (
          <Link to={`/${role.title}`} key={`${role.id}`}>
            <div className="flex flex-col items-center gap-4 bg-gradient-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border hover:text-blue-600">
              <img src={role.icon} className="w-[200px] h-[200px]" />
              <h3 className="font-semibold text-lg mb-2">
                {role.title.toUpperCase()}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;
