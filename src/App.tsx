import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { CartDrawer } from './components/common/CartDrawer';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { AddProducePage } from './pages/farmer/AddProducePage';
import { HubDashboard } from './pages/hub/HubDashboard';
import { HubGradingTerminal } from './pages/hub/HubGradingTerminal';
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { PostRequirementPage } from './pages/buyer/PostRequirementPage';
import { LogisticsPage } from './pages/logistics/LogisticsPage';
import { PaymentsEscrowPage } from './pages/payments/PaymentsEscrowPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ForecastPage } from './pages/forecast/ForecastPage';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FBFBFA] font-sans antialiased text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
          <Navbar />
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              
              {/* Farmer Portal */}
              <Route path="/farmer" element={<FarmerDashboard />} />
              <Route path="/farmer/add" element={<AddProducePage />} />
              
              {/* Farm Hub Operations */}
              <Route path="/hub" element={<HubDashboard />} />
              <Route path="/hub/grading" element={<HubGradingTerminal />} />
              
              {/* Bulk Buyer Center */}
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/buyer/post" element={<PostRequirementPage />} />
              
              {/* Network Core Systems */}
              <Route path="/logistics" element={<LogisticsPage />} />
              <Route path="/payments" element={<PaymentsEscrowPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/forecast" element={<ForecastPage />} />
            </Routes>
          </div>

          {/* Global Flyouts & Interactive Overlays */}
          <CartDrawer />
          <VoiceAssistantModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
