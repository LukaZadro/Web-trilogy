import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  BookOpenTextIcon,
  LogOut,
  Menu,
  User2,
} from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import data from "../data/roleStack.json";

interface RolesStack {
  id: number;
  role: string;
  sections: Section[];
  description: string[];
}

interface Section {
  title: string;
  pathname: string;
}

const Navbar = () => {
  const newData: RolesStack[] = JSON.parse(JSON.stringify(data));
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const role = newData.find((item) => item.role === user?.role);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg shadow-sm h-40">
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex items-center justify-between h-40 pl-4 md:pl-0 pr-4 md:pr-0">
          <div className="flex items-center justify-center gap-2 ">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo_header.png" width={100} height={100} alt="logo" />
            </Link>
            <Link
              to="https://www.unizg.hr/"
              className="flex items-center gap-2 group"
            >
              <img
                src="/sveuciliste_logo.png"
                width={180}
                height={100}
                alt="logo"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user?.role === "student" && (
              <Link
                to="/sastavnice"
                className="relative text-foreground hover:text-primary transition-colors"
              >
                SASTAVNICE
                <div className=" absolute w-full text-center text-primary font-bold z-10 flex items-center">
                  <ArrowUpIcon className="w-10 h-10" />
                  VODIČ 2026./27.
                </div>
              </Link>
            )}

            {user ? (
              <>
                {newData[role.id - 1].sections.map((sec, ind) => (
                  <Link
                    key={ind}
                    to={
                      sec.title === "forum"
                        ? `/${sec.pathname}`
                        : `/${user.role}/${sec.pathname}`
                    }
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {sec.title.toUpperCase()}
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  NASLOVNA
                </Link>
                <Link
                  to="/sastavnice"
                  className="relative text-foreground hover:text-primary transition-colors"
                >
                  SASTAVNICE
                  <div className=" absolute w-full text-center text-primary font-bold z-10 flex items-center">
                    <ArrowUpIcon className="w-10 h-10" />
                    VODIČ 2026./27.
                  </div>
                </Link>
                <Link
                  to="/student"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  STUDENTI
                </Link>
                <Link
                  to="/alumni"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  ALUMNI
                </Link>
                <Link
                  to="/poslodavac"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  POSLODAVCI
                </Link>
                <Link
                  to="/udruga"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  UDRUGE
                </Link>
              </>
            )}
            {user ? (
              <div className=" text-gradient-hero relative">
                <button
                  className="flex gap-2 items-center"
                  onClick={() => setOpen(!open)}
                >
                  <span className="rounded-full bg-blue-100 p-2">
                    <User2 className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-bold">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p>{user.role.toUpperCase()}</p>
                  </div>
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-full bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                        navigate("/");
                      }}
                      className="block flex items-center gap-4 w-full px-4 py-2 text-left text-sm  hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="shadow-soft">
                  Prijavi se
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4 border-t border-border bg-card pl-4 pr-4">
            {user?.role === "student" && (
              <Link
                to="/sastavnice"
                className="block text-center relative text-foreground hover:text-primary transition-colors"
              >
                Sastavnice
                <div className=" w-full block text-center text-primary font-bold z-10 flex items-center justify-center">
                  <ArrowUpIcon className="w-4 h-4" />
                  VODIČ 2026./27.
                </div>
              </Link>
            )}
            {user ? (
              <>
                {newData[role.id - 1].sections.map((sec, ind) => (
                  <Link
                    key={ind}
                    to={`/${user.role}/${sec.pathname}`}
                    className="block text-center text-foreground hover:text-primary transition-colors capitalize"
                  >
                    {sec.title}
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block text-center text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Naslovna
                </Link>
                <Link
                  to="/sastavnice"
                  className="block text-center relative text-foreground hover:text-primary transition-colors"
                >
                  Sastavnice
                  <div className=" w-full block text-center text-primary font-bold z-10 flex items-center justify-center">
                    <ArrowUpIcon className="w-4 h-4" />
                    VODIČ 2026./27.
                  </div>
                </Link>
                <Link
                  to="/student"
                  className="block text-center text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Studenti
                </Link>
                <Link
                  to="/alumni"
                  className="block text-center text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Alumni
                </Link>
                <Link
                  to="/poslodavac"
                  className="block text-center text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Poslodavci
                </Link>
                <Link
                  to="/udruga"
                  className="block text-center text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Udruge
                </Link>
              </>
            )}

            {user ? (
              <div className="flex flex-col items-center gap-4">
                <button className="flex gap-2 items-center text-gradient-hero bg-gray-100 w-full justify-center">
                  <User2 className="h-6 w-6" />

                  <div>
                    <p className="font-bold">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p>{user.role.toUpperCase()}</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    navigate("/");
                  }}
                  className="block flex items-center gap-4 px-4 py-2 text-left text-sm  hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" size="sm" className="w-full">
                  Prijavi se
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
