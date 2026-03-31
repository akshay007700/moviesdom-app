import { Helmet } from "react-helmet-async";
import { Shield, Settings, Users, Database, BarChart, LogOut } from "lucide-react";

export default function Admin() {
  const stats = [
    { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-400" },
    { label: "Active Movies", value: "8,230", icon: Database, color: "text-green-400" },
    { label: "Daily Views", value: "45,210", icon: BarChart, color: "text-purple-400" },
    { label: "System Status", value: "Healthy", icon: Settings, color: "text-yellow-400" },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background text-white">
      <Helmet>
        <title>Admin Dashboard - MoviesDom</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm">
              <Shield className="w-5 h-5" />
              Admin Dashboard
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">System Overview</h1>
            <p className="text-gray-400">Manage your application settings and monitor performance.</p>
          </div>

          <button className="flex items-center gap-2 bg-red-500/10 text-red-500 px-6 py-3 rounded-full font-bold hover:bg-red-500/20 transition-all border border-red-500/20">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface/50 p-8 rounded-3xl border border-white/5 space-y-4 hover:bg-surface transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface/50 p-12 rounded-3xl border border-white/5 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <Settings className="w-10 h-10 animate-spin-slow" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Admin Features Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We are currently working on a fully-featured admin panel to help you manage your content more efficiently.
            </p>
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
