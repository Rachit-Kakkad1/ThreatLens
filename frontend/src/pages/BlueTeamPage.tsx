import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Network,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  ChevronDown,
  Menu,
  X,
  Scan,
  Activity,
  FileText,
  Settings,
  Zap,
  Server,
  Globe,
  Cpu,
  Download,
  RefreshCw,
  Terminal,
  Loader,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const BlueTeamPage = () => {
  const navigate = useNavigate();
  const { team, setTeam, setSidebarCollapsed } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "defense" | "monitoring" | "reports"
  >("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Dynamic State
  const [logs, setLogs] = useState<any[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [reports, setReports] = useState<any[]>([]);

  // Simulated Data
  const defenseModules = [
    {
      id: "waf",
      name: "Web App Firewall",
      description: "Layer 7 protection against OWASP Top 10 vulnerabilities",
      status: "active",
      icon: Globe,
      color: "text-cyber-blue",
      details: {
        uptime: "99.99%",
        rulesBlocked: 1420,
        bandwidth: "45 Mbps",
        version: "v4.2.0",
      },
    },
    {
      id: "ips",
      name: "Intrusion Prevention",
      description: "Real-time network traffic analysis and blocking",
      status: "active",
      icon: Shield,
      color: "text-cyber-green",
      details: {
        uptime: "99.95%",
        threatsPrevented: 85,
        latency: "12ms",
        version: "v2.1.5",
      },
    },
    {
      id: "edr",
      name: "Endpoint Detection",
      description: "Advanced malware protection and behavioral analysis",
      status: "warning",
      icon: Server,
      color: "text-orange-400",
      details: {
        uptime: "98.50%",
        endpointsSecured: 450,
        quarantined: 3,
        version: "v3.0.1",
      },
    },
    {
      id: "siem",
      name: "SIEM Core",
      description: "Centralized log management and correlation engine",
      status: "active",
      icon: Activity,
      color: "text-cyber-purple",
      details: {
        uptime: "100%",
        eventsProcessed: "1.2M",
        storageUsed: "4.5TB",
        version: "v5.5.0",
      },
    },
  ];

  // Initialize Data
  useEffect(() => {
    setLogs([
      {
        id: 1,
        time: "10:42:15",
        source: "192.168.1.105",
        event: "Failed Login Attempt",
        severity: "medium",
        action: "Flagged",
      },
      {
        id: 2,
        time: "10:42:08",
        source: "External IP",
        event: "Port Scan Detected",
        severity: "high",
        action: "Blocked",
      },
      {
        id: 3,
        time: "10:41:55",
        source: "System",
        event: "Database Backup",
        severity: "low",
        action: "Completed",
      },
      {
        id: 4,
        time: "10:41:30",
        source: "10.0.0.5",
        event: "Malware Signature Match",
        severity: "critical",
        action: "Quarantined",
      },
      {
        id: 5,
        time: "10:40:12",
        source: "Firewall",
        event: "Outbound Traffic Spike",
        severity: "medium",
        action: "Investigating",
      },
    ]);

    setReports([
      {
        id: 1,
        title: "Monthly Vulnerability Scan",
        date: "Oct 15, 2023",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        id: 2,
        title: "Q3 Compliance Audit",
        date: "Oct 01, 2023",
        size: "15.8 MB",
        type: "PDF",
      },
      {
        id: 3,
        title: "Incident Response Log #442",
        date: "Sep 28, 2023",
        size: "856 KB",
        type: "CSV",
      },
      {
        id: 4,
        title: "System Hardening Review",
        date: "Sep 15, 2023",
        size: "1.2 MB",
        type: "PDF",
      },
    ]);
  }, []);

  // Live Log Simulation
  useEffect(() => {
    if (activeTab !== "monitoring") return;

    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString("en-US", { hour12: false }),
        source:
          Math.random() > 0.5
            ? `192.168.1.${Math.floor(Math.random() * 255)}`
            : "External IP",
        event: [
          "Suspicious Packet",
          "Login Success",
          "File Access",
          "Port Scan",
          "API Call",
        ][Math.floor(Math.random() * 5)],
        severity: ["low", "medium", "high", "critical"][
          Math.floor(Math.random() * 4)
        ],
        action: ["Logged", "Allowed", "Blocked", "Flagged"][
          Math.floor(Math.random() * 4)
        ],
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleDownloadReport = (report: any) => {
    // Create a dummy blob
    const content = `Report: ${report.title}\nDate: ${report.date}\nType: ${report.type}\n\nThis is a simulated secure report content.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, "_")}.txt`; // Downloading as .txt for simplicity in simulation
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        title: `On-Demand Security Scan`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        size: "1.1 MB",
        type: "PDF",
      };
      setReports((prev) => [newReport, ...prev]);
      setIsGeneratingReport(false);
    }, 2000);
  };

  // Menu items with icons
  const menuItems = [
    {
      id: "scan",
      label: "Scan Network",
      icon: Scan,
      description: "Perform network vulnerability scan",
      color: "text-cyber-blue",
    },
    {
      id: "monitor",
      label: "Start Monitoring",
      icon: Activity,
      description: "Enable real-time threat monitoring",
      color: "text-cyber-green",
    },
    {
      id: "report",
      label: "Generate Report",
      icon: FileText,
      description: "Create security assessment report",
      color: "text-cyber-purple",
    },
    {
      id: "settings",
      label: "Defense Settings",
      icon: Settings,
      description: "Configure defense systems",
      color: "text-cyber-amber",
    },
  ];

  // Toggle menu - opens/closes on click
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    setSidebarCollapsed(next); // Minimize sidebar when menu opens, restore when closes
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (menuOpen) {
          setMenuOpen(false);
          setSidebarCollapsed(false); // Restore sidebar when closing menu
        }
      }
    };

    if (menuOpen) {
      // Small delay to avoid immediate closing
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, setSidebarCollapsed]);

  const defenseMetrics = [
    {
      label: "Protected Systems",
      value: "24",
      icon: Shield,
      color: "text-cyber-blue",
    },
    {
      label: "Active Defenses",
      value: "18",
      icon: Lock,
      color: "text-cyber-green",
    },
    {
      label: "Threats Blocked",
      value: "1,247",
      icon: XCircle,
      color: "text-red-400",
    },
    {
      label: "Security Score",
      value: "94%",
      icon: CheckCircle,
      color: "text-cyber-green",
    },
  ];

  const recentThreats = [
    {
      id: 1,
      type: "SQL Injection Attempt",
      severity: "High",
      status: "Blocked",
      time: "2m ago",
    },
    {
      id: 2,
      type: "XSS Attack Detected",
      severity: "Medium",
      status: "Blocked",
      time: "15m ago",
    },
    {
      id: 3,
      type: "Unauthorized Access",
      severity: "Critical",
      status: "Blocked",
      time: "1h ago",
    },
    {
      id: 4,
      type: "DDoS Attempt",
      severity: "High",
      status: "Mitigated",
      time: "2h ago",
    },
  ];

  const defenseStrategies = [
    {
      title: "Web Application Firewall",
      status: "Active",
      description: "Protecting all web endpoints from common attacks",
      icon: Shield,
    },
    {
      title: "Intrusion Detection System",
      status: "Active",
      description: "Monitoring network traffic for suspicious activity",
      icon: Eye,
    },
    {
      title: "Code Analysis",
      status: "Active",
      description: "Automated vulnerability scanning in CI/CD pipeline",
      icon: FileCheck,
    },
    {
      title: "Network Monitoring",
      status: "Active",
      description: "Real-time network traffic analysis and alerting",
      icon: Network,
    },
  ];

  // Redirect to Red Team if not in Blue Team mode
  useEffect(() => {
    if (team !== "blue") {
      navigate("/red-team");
    }
  }, [team, navigate]);

  if (team !== "blue") {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between relative">
          <div>
            <h1 className="text-3xl font-black text-cyber-white mb-2 flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield size={24} className="text-white" />
              </div>
              Blue Team Operations
            </h1>
            <p className="text-cyber-slate">
              Defensive security and threat protection
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Enhanced Menu - Toggle on click */}
            <div className="relative" ref={menuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 relative overflow-hidden ${
                  menuOpen
                    ? "bg-cyber-blue/20 border-2 border-cyber-blue/50 text-cyber-blue shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    : "bg-white/5 border border-white/10 text-cyber-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/10 via-transparent to-cyber-blue/10 opacity-0 hover:opacity-100 transition-opacity" />
                <Menu size={18} className="relative z-10" />
                <span className="relative z-10">Menu</span>
                <ChevronDown
                  size={16}
                  className={`relative z-10 transition-transform duration-300 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{
                      duration: 0.15,
                      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth animation
                    }}
                    className="absolute right-0 top-14 w-72 bg-cyber-dark/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                          <Zap size={16} className="text-cyber-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-cyber-white">
                            Defense Menu
                          </p>
                          <p className="text-[10px] text-cyber-slate uppercase tracking-wider">
                            Quick Actions
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={toggleMenu}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <X size={14} className="text-cyber-slate" />
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                      {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.03,
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              // Handle menu item click
                              console.log(`Clicked: ${item.label}`);
                              // You can add specific actions here
                            }}
                            className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center group-hover:bg-cyber-blue/20 transition-colors ${item.color}`}
                              >
                                <Icon size={18} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-cyber-white group-hover:text-cyber-blue transition-colors">
                                  {item.label}
                                </p>
                                <p className="text-[10px] text-cyber-slate mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronDown
                                size={14}
                                className="text-cyber-slate group-hover:text-cyber-blue transform -rotate-90 transition-colors"
                              />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-[10px] text-cyber-slate">
                        <span className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                          <span>All systems operational</span>
                        </span>
                        <span className="font-mono">v2.0</span>
                      </div>
                    </div>

                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5 pointer-events-none rounded-xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Red Team Switch Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTeam("red");
                navigate("/red-team");
              }}
              className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/30 hover:border-red-500/70 transition-all shadow-[0_0_10px_rgba(239,68,68,0.3)] flex items-center space-x-2"
            >
              <Target size={16} />
              <span>Switch to Red Team</span>
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-white/10">
          {[
            { id: "overview", label: "Overview" },
            { id: "defense", label: "Defense Systems" },
            { id: "monitoring", label: "Monitoring" },
            { id: "reports", label: "Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? "text-cyber-blue border-b-2 border-cyber-blue"
                  : "text-cyber-slate hover:text-cyber-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {defenseMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon size={32} className={metric.color} />
                </div>
                <p className="text-3xl font-black text-cyber-white mb-1">
                  {metric.value}
                </p>
                <p className="text-xs text-cyber-slate uppercase tracking-wider">
                  {metric.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Threats */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-black text-cyber-white mb-4 flex items-center">
                <AlertTriangle size={20} className="mr-2 text-red-400" />
                Recent Threat Activity
              </h3>
              <div className="space-y-3">
                {recentThreats.map((threat) => (
                  <div
                    key={threat.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-red-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-cyber-white">
                        {threat.type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          threat.severity === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : threat.severity === "High"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {threat.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-cyber-slate">
                      <span className="text-cyber-green flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        {threat.status}
                      </span>
                      <span>{threat.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Defense Status */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-black text-cyber-white mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-cyber-blue" />
                Defense Systems Status
              </h3>
              <div className="space-y-4">
                {defenseStrategies.map((strategy, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <strategy.icon size={20} className="text-cyber-blue" />
                        <span className="font-bold text-cyber-white">
                          {strategy.title}
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-cyber-green/20 text-cyber-green">
                        {strategy.status}
                      </span>
                    </div>
                    <p className="text-xs text-cyber-slate mt-2">
                      {strategy.description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defenseModules.map((module) => (
              <GlassCard key={module.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${module.color}`}
                    >
                      <module.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cyber-white">
                        {module.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                          module.status === "active"
                            ? "bg-cyber-green/20 text-cyber-green"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {module.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedModule(
                        expandedModule === module.id ? null : module.id
                      )
                    }
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {expandedModule === module.id ? (
                      <ChevronUp size={20} className="text-cyber-slate" />
                    ) : (
                      <ChevronRight size={20} className="text-cyber-slate" />
                    )}
                  </button>
                </div>
                <p className="text-cyber-slate text-sm mb-4">
                  {module.description}
                </p>

                {/* Status Bar */}
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mb-4">
                  <div
                    className={`h-full ${
                      module.status === "active"
                        ? "bg-cyber-blue animate-pulse"
                        : "bg-orange-400"
                    } w-2/3`}
                  />
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedModule === module.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/5 pt-4 mt-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(module.details).map(([key, value]) => (
                          <div key={key} className="bg-white/5 p-3 rounded-lg">
                            <p className="text-xs text-cyber-slate uppercase mb-1">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-sm font-bold text-cyber-white font-mono">
                              {value as string}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="text-xs text-cyber-blue hover:text-white transition-colors flex items-center space-x-1">
                          <Settings size={12} />
                          <span>Configure Module</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === "monitoring" && (
          <div className="space-y-6">
            {/* Resource Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "CPU Usage",
                  value: "42%",
                  icon: Cpu,
                  color: "text-cyber-blue",
                },
                {
                  label: "Memory",
                  value: "8.4 GB",
                  icon: Server,
                  color: "text-cyber-purple",
                },
                {
                  label: "Network",
                  value: "1.2 Gbps",
                  icon: Activity,
                  color: "text-cyber-green",
                },
              ].map((stat, i) => (
                <GlassCard
                  key={i}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <stat.icon size={20} className={stat.color} />
                    <span className="text-cyber-slate text-sm">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-cyber-white font-mono">
                    {stat.value}
                  </span>
                </GlassCard>
              ))}
            </div>

            {/* Live Feed */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-lg font-bold text-cyber-white flex items-center">
                  <Terminal size={20} className="mr-2 text-cyber-green" />
                  Live Threat Feed
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-xs text-cyber-slate">
                    <span className="w-2 h-2 rounded-full bg-cyber-blue" />
                    <span>Monitoring Active</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-red-400 font-mono">LIVE</span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-sm text-cyber-slate">
                  <thead className="bg-white/5 text-xs uppercase font-bold text-cyber-white sticky top-0 backdrop-blur-md">
                    <tr>
                      <th className="px-6 py-3">Time</th>
                      <th className="px-6 py-3">Source</th>
                      <th className="px-6 py-3">Event</th>
                      <th className="px-6 py-3">Severity</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <AnimatePresence initial={false}>
                      {logs.map((log) => (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-3 font-mono text-cyber-blue">
                            {log.time}
                          </td>
                          <td className="px-6 py-3 font-mono">{log.source}</td>
                          <td className="px-6 py-3 text-cyber-white font-medium">
                            {log.event}
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-bold ${
                                log.severity === "critical"
                                  ? "bg-red-500/20 text-red-400"
                                  : log.severity === "high"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : log.severity === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {log.severity.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            <span className="flex items-center text-cyber-green">
                              <CheckCircle size={12} className="mr-1" />
                              {log.action}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-cyber-white">
                    Security Reports
                  </h3>
                  <p className="text-cyber-slate text-sm">
                    Generate and download detailed security assessments
                  </p>
                </div>
                <button
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                  className="px-4 py-2 bg-cyber-blue hover:bg-blue-600 text-white rounded-lg font-bold transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingReport ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <FileText size={18} />
                  )}
                  <span>
                    {isGeneratingReport
                      ? "Generating..."
                      : "Generate New Report"}
                  </span>
                </button>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <GlassCard className="p-4 flex items-center justify-between group hover:border-cyber-blue/50 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyber-blue/20 transition-colors">
                          <FileText
                            size={24}
                            className="text-cyber-slate group-hover:text-cyber-blue"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-cyber-white group-hover:text-cyber-blue transition-colors">
                            {report.title}
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-cyber-slate mt-1">
                            <span className="flex items-center">
                              <CheckCircle
                                size={10}
                                className="mr-1 text-cyber-green"
                              />
                              Ready
                            </span>
                            <span>•</span>
                            <span>{report.date}</span>
                            <span>•</span>
                            <span>{report.size}</span>
                            <span>•</span>
                            <span className="uppercase bg-white/5 px-1.5 py-0.5 rounded text-[10px]">
                              {report.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="p-3 rounded-lg bg-white/5 hover:bg-cyber-blue hover:text-white text-cyber-slate transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      >
                        <Download size={20} />
                      </button>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
