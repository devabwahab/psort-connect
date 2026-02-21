import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Committee from "./pages/Committee";
import Contact from "./pages/Contact";
import RTCON from "./pages/RTCON";
import RDWing from "./pages/RDWing";
import Elections from "./pages/Elections";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rtcon" element={<RTCON />} />
            <Route path="/r-d-wing" element={<RDWing />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
