import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#081c14] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                🌾
              </div>
              <span className="font-extrabold text-white tracking-tight text-lg">
                Smart Farm Network
              </span>
            </Link>
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Direct Farm-to-Consumer & Bulk Buyer Agricultural Network. Connecting smallholders and FPOs with commercial buyers through local farm hubs, AI quality grading, and transparent escrow finance.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg w-fit">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Smart India Hackathon 2026 Prototype</span>
            </div>
          </div>

          {/* Col 3: Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/farmer" className="hover:text-white transition-colors">Farmer & FPO Portal</Link></li>
              <li><Link to="/farmer/add" className="hover:text-white transition-colors">List Produce (AI Vision)</Link></li>
              <li><Link to="/hub" className="hover:text-white transition-colors">Farm Hub Operations</Link></li>
              <li><Link to="/hub/grading" className="hover:text-white transition-colors">AI Grading Terminal</Link></li>
              <li><Link to="/buyer" className="hover:text-white transition-colors">Bulk Buyer Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Network Governance & Admin</Link></li>
            </ul>
          </div>

          {/* Col 4: Network Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Infrastructure</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Live Spot Marketplace</Link></li>
              <li><Link to="/buyer/post" className="hover:text-white transition-colors">Multi-Farmer Supply Match</Link></li>
              <li><Link to="/logistics" className="hover:text-white transition-colors">Cold Chain GPS Logistics</Link></li>
              <li><Link to="/payments" className="hover:text-white transition-colors">Transparent Smart Escrow</Link></li>
              <li><Link to="/forecast" className="hover:text-white transition-colors">AI Demand Forecasting</Link></li>
            </ul>
          </div>

          {/* Col 5: Active Andhra Corridor Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Operational Hubs</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Rajahmundry Central (E. Godavari)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Vijayawada Logistics Terminal</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Kakinada Coastal Hub & Port</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Guntur Agri Processing Cluster</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Smart Farm Network. Built for Smart India Hackathon. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO/IEC 17025 QC Standards Compliant
            </span>
            <span>Privacy Policy</span>
            <span>Terms of Procurement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
