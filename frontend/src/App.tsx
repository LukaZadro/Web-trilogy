import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Organizations from "./pages/Organizations";
import Mentorship from "./pages/Mentorship";
import CVBuilder from "./pages/CVBuilder";
import NotFound from "./pages/NotFound";
import Manual from "./pages/Manual";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Events from "./pages/Events";
import Career from "./pages/Career";
import Projects from "./pages/Projects";
import Sastavnice from "./pages/Sastavnice";
import JobPosting from "./pages/JobPosting";
import DetailSastavnica from "./pages/DetailSastavnica";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prijava" element={<Login />} />
          <Route path="/registracija" element={<Registration />} />
          <Route path="/:path" element={<Manual />} />
          <Route path="/:role/ponuda-poslova" element={<Jobs />} />
          <Route path="/:role/dogadanja" element={<Events />} />
          <Route path="/:role/karijera" element={<Career />} />
          <Route path="/:role/projekti" element={<Projects />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/:role/mentorstvo" element={<Mentorship />} />
          <Route path="/cv-builder" element={<CVBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/sastavnice" element={<Sastavnice />} />
          <Route path="/sastavnice/:collid" element={<DetailSastavnica />} />
          <Route path="/:role/objava-poslova" element={<JobPosting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
