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
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/cv-builder" element={<CVBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
