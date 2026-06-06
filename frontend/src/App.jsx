import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import BookingModal from './components/BookingModal';

// Public pages
import Home from './pages/Home';
import SurfPackages from './pages/SurfPackages';
import Lessons from './pages/Lessons';
import Rooms from './pages/Rooms';
import SurfGuiding from './pages/SurfGuiding';
import SurfCamp from './pages/SurfCamp';
import SurfSchool from './pages/SurfSchool';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Admin pages
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminGallery from './pages/admin/AdminGallery';
import AdminReviews from './pages/admin/AdminReviews';
import AdminMessages from './pages/admin/AdminMessages';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminPlaceholder from './pages/admin/AdminPlaceholder';

// Inner component so useLocation can be called inside <Router>
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        {/* Public Routes inside MainLayout */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/surf-packages" element={<MainLayout><SurfPackages /></MainLayout>} />
        <Route path="/lessons" element={<MainLayout><Lessons /></MainLayout>} />
        <Route path="/rooms" element={<MainLayout><Rooms /></MainLayout>} />
        <Route path="/surf-camp" element={<MainLayout><SurfCamp /></MainLayout>} />
        <Route path="/surf-school" element={<MainLayout><SurfSchool /></MainLayout>} />
        <Route path="/surf-guiding" element={<MainLayout><SurfGuiding /></MainLayout>} />
        <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/reserver" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          } 
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/packages" element={<AdminProtectedRoute><AdminLayout><AdminPackages /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/admin/gallery" element={<AdminProtectedRoute><AdminLayout><AdminGallery /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/admin/reviews" element={<AdminProtectedRoute><AdminLayout><AdminReviews /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/admin/contacts" element={<AdminProtectedRoute><AdminLayout><AdminMessages /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><AdminLayout><AdminPlaceholder title="System Settings" /></AdminLayout></AdminProtectedRoute>} />
        
        {/* Catch all 404 */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>

      {/* Client-only widgets — hidden on all /admin routes */}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Chatbot />}

      {/* Global booking modal — always mounted */}
      <BookingModal />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <AppContent />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
