import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Mail, Phone, Calendar, 
  Trash2, CheckCircle, RefreshCcw, ExternalLink 
} from "lucide-react";
import "./admin.css";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const ADMIN_SECRET = "your_secret_password_here";

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/leads", {
        headers: { "x-admin-secret": ADMIN_SECRET }
      });
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error("Access Denied");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const deleteLead = async (id) => {
    if (!window.confirm("Remove this lead from the archives?")) return;
    await fetch(`http://localhost:5000/api/admin/leads/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": ADMIN_SECRET }
    });
    fetchLeads();
  };
const downloadCSV = () => {
  try {
    const fields = ['user_name', 'user_email', 'user_phone', 'tour_interest', 'guests', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(leads);

    // Create a hidden link and click it to trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Ethiopia_Leads_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("CSV Export Error:", err);
  }
};

  return (
    <div className="admin-viewport bg-[#020617] min-h-screen p-8 text-white">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Expedition <span className="text-[#fbbf24]">Command Center</span>
          </h1>
          <p className="text-gray-400">Managing the Land of Origins inquiries</p>
        </div>
        <button onClick={fetchLeads} className="p-3 bg-white/5 rounded-full hover:bg-[#fbbf24]/20 transition-all">
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="stat-box p-6 bg-white/5 border border-white/10 rounded-2xl">
          <Users className="text-[#fbbf24] mb-2" />
          <h3 className="text-2xl font-bold">{leads.length}</h3>
          <p className="text-gray-500 text-xs uppercase">Total Inquiries</p>
        </div>
      </div>
      <button onClick={downloadCSV} className="mb-4 flex items-center gap-2 px-4 py-2 bg-[#fbbf24] text-black rounded-full hover:bg-[#fbbf24]/90 transition-colors">
<Download size={16} /> Export Leads
</button>
      <div className="overflow-x-auto bg-white/5 rounded-3xl border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-[#fbbf24]">
              <th className="p-6">Adventurer</th>
              <th className="p-6">Destination</th>
              <th className="p-6">Group</th>
              <th className="p-6">Message</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {leads.map((lead) => (
                <motion.tr 
                  key={lead._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-6">
                    <div className="font-bold">{lead.user_name}</div>
                    <div className="text-xs text-gray-500">{lead.user_email}</div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-[#fbbf24]/10 text-[#fbbf24] rounded-full text-xs font-bold">
                      {lead.tour_interest}
                    </span>
                  </td>
                  <td className="p-6 font-mono text-sm">{lead.guests} Pax</td>
                  <td className="p-6 text-sm text-gray-400 max-w-xs truncate">{lead.message}</td>
                  <td className="p-6">
                    <div className="flex gap-3">
                      <button onClick={() => deleteLead(lead._id)} className="text-red-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                      <a href={`mailto:${lead.user_email}`} className="text-blue-400">
                        <Mail size={18} />
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;