import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex gap-4 justify-center items-center w-full border-t bg-background/50 px-4 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2 ">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo_header.png" width={80} height={80} alt="logo" />
        </Link>
        <Link
          to="https://www.unizg.hr/"
          className="flex items-center gap-2 group"
        >
          <img src="/sveuciliste_logo.png" width={80} height={60} alt="logo" />
        </Link>
      </div>
      <div>
        <p>
          &copy; {new Date().getFullYear()} WebTrilogy. Sva prava pridržana.
        </p>
      </div>
    </div>
  );
};
export default Footer;
