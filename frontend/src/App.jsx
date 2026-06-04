import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Admin pages
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminLessons from './pages/admin/AdminLessons';
import AdminRooms from './pages/admin/AdminRooms';
import AdminServices from './pages/admin/AdminServices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminReviews from './pages/admin/AdminReviews';
import AdminMessages from './pages/admin/AdminMessages';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Placeholder admin pages
const AdminPlaceholder = ({ name }) => (
  <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xs space-y-4">
    <h3 className="text-xl font-bold text-slate-900">{name} Management</h3>
    <p className="text-sm text-slate-550">This control panel is scaffolded and ready for your content CRUD views.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
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
            <Route path="/admin/lessons" element={<AdminProtectedRoute><AdminLayout><AdminLessons /></AdminLayout></AdminProtectedRoute>} />
            <Route path="/admin/rooms" element={<AdminProtectedRoute><AdminLayout><AdminRooms /></AdminLayout></AdminProtectedRoute>} />
            <Route path="/admin/guiding" element={<AdminProtectedRoute><AdminLayout><AdminServices /></AdminLayout></AdminProtectedRoute>} />
            <Route path="/admin/gallery" element={<AdminProtectedRoute><AdminLayout><AdminGallery /></AdminLayout></AdminProtectedRoute>} />
            <Route path="/admin/reviews" element={<AdminProtectedRoute><AdminLayout><AdminReviews /></AdminLayout></AdminProtectedRoute>} />
            <Route path="/admin/contacts" element={<AdminProtectedRoute><AdminLayout><AdminMessages /></AdminLayout></AdminProtectedRoute>} />
            <Route path="/admin/settings" element={<AdminProtectedRoute><AdminLayout><AdminPlaceholder name="System Settings" /></AdminLayout></AdminProtectedRoute>} />
            
            {/* Catch all 404 */}
            <Route path="*" element={<MainLayout><div className="py-20 text-center text-slate-500">Page not found.</div></MainLayout>} />
          </Routes>
          <WhatsAppButton />
          <Chatbot />
          <BookingModal />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
