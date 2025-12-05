import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import PropertyValueChecker from "./pages/PropertyValueChecker";
import LoanEligibilityChecker from "./pages/LoanEligibilityChecker";
import AdminUpload from "./pages/AdminUpload";
import NotFound from "./pages/NotFound";
import AdminListingForm from "./pages/AdminListingForm";
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlog from "./pages/AdminBlog";
import AdminListing from "./pages/AdminListing";
import AdminListingsList from "./pages/AdminListingsList";
import AdminSettings from "./pages/AdminSettings";
import AdminBlogList from "@/pages/AdminBlogList";
import AdminBlogForm from "@/pages/AdminBlogForm";
import AdminGalleryList from "@/pages/AdminGalleryList";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background">
      {!isAdminRoute && <Navigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/semak-nilai-hartanah" element={<PropertyValueChecker />} />
        <Route path="/semak-kelayakan-loan" element={<LoanEligibilityChecker />} />
        <Route path="/admin/listings/new" element={<AdminListingForm />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
		  <Route path="blog" element={<AdminBlogList />} />
		  <Route path="blog/create" element={<AdminBlogForm />} />
		  <Route path="blog/edit/:id" element={<AdminBlogForm />} />
		  <Route path="listings" element={<AdminListingsList />} />
		  <Route path="listing/create" element={<AdminListing />} />
		  <Route path="listing/edit/:id" element={<AdminListing />} />
		  <Route path="gallery" element={<AdminGalleryList />} />
		  <Route path="settings" element={<AdminSettings />} />
		</Route>

        {/* Hidden admin upload page */}
        <Route path="/admin/upload" element={<AdminUpload />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
