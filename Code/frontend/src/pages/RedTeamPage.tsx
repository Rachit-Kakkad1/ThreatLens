import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Zap,
  Bug,
  Code,
  TrendingUp,
  AlertCircle,
  Activity,
  Shield,
  Smartphone,
  Globe,
  Mail,
  Radio,
  X,
  Terminal,
} from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { RedTeamPulse } from "../components/RedTeamPulse";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AttackDetail {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
  methodology: string;
  tools: string[];
}

const attackDetails: Record<string, AttackDetail> = {
  mobile: {
    id: "mobile",
    title: "Mobile Hacking Operations",
    description:
      "Comprehensive security assessment of mobile applications (iOS/Android) covering static analysis, dynamic analysis, and network communication interception.",
    icon: Smartphone,
    color: "text-orange-400",
    features: [
      "Static Application Security Testing (SAST)",
      "Dynamic Application Security Testing (DAST)",
      "API Security Analysis",
      "Binary Analysis",
    ],
    methodology:
      "We employ a hybrid approach combining automated scanning with manual penetration testing to identify vulnerabilities in app logic, data storage, and network communication.",
    tools: ["Frida", "Objection", "MobSF", "Burp Suite Mobile"],
  },
  ddos: {
    id: "ddos",
    title: "DDoS Simulation",
    description:
      "Controlled simulation of Distributed Denial of Service attacks to test infrastructure resilience and incident response capabilities.",
    icon: Radio,
    color: "text-red-400",
    features: [
      "Volumetric Attacks",
      "Protocol Attacks",
      "Application Layer Attacks",
      "Stress Testing",
    ],
    methodology:
      "Simulated traffic generation using distributed nodes to emulate real-world botnet behavior, testing load balancers, WAFs, and scaling policies.",
    tools: ["LOIC (Simulator)", "Hulk", "Slowloris", "Custom Scripts"],
  },
  phishing: {
    id: "phishing",
    title: "Advanced Phishing Simulation",
    description:
      "Social engineering campaigns designed to test and improve organizational security awareness and human risk factors.",
    icon: Mail,
    color: "text-yellow-400",
    features: [
      "Spear Phishing",
      "Credential Harvesting",
      "Payload Delivery",
      "Reporting & Training",
    ],
    methodology:
      "Tailored email campaigns mimicking real-world threats to gauge user awareness. All interactions are safely captured for educational feedback.",
    tools: ["GoPhish", "Social Engineering Toolkit (SET)", "Custom Templates"],
  },
};

export const RedTeamPage = () => {
  const navigate = useNavigate();
  const { setTeam } = useAuth();
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "attacks" | "exploits" | "simulation"
  >("overview");

  const logsEndRef = useRef<HTMLDivElement>(null);
  const simulationIntervalRef = useRef<any>(null);

  const [exploits, setExploits] = useState([
    {
      id: 1,
      name: "SQL Injection Payload",
      target: "Login API",
      status: "Ready",
      type: "Injection",
      risk: "Critical",
      code: "' OR '1'='1' --",
    },
    {
      id: 2,
      name: "XSS Script Vector",
      target: "User Dashboard",
      status: "Ready",
      type: "XSS",
      risk: "High",
      code: "<script>alert('XSS')</script>",
    },
    {
      id: 3,
      name: "CSRF Token Bypass",
      target: "Settings Panel",
      status: "Ready",
      type: "CSRF",
      risk: "Medium",
      code: "POST /api/settings HTTP/1.1",
    },
    {
      id: 4,
      name: "RCE Exploit Chain",
      target: "Image Upload Server",
      status: "Patched",
      type: "RCE",
      risk: "Critical",
      code: "eval(base64_decode('...'))",
    },
  ]);

  const [activeSimulation, setActiveSimulation] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const handleDeployExploit = (id: number) => {
    setExploits((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, status: "Deploying..." } : ex))
    );
    setTimeout(() => {
      setExploits((prev) =>
        prev.map((ex) =>
          ex.id === id
            ? {
                ...ex,
                status: Math.random() > 0.3 ? "Success" : "Failed",
              }
            : ex
        )
      );
    }, 2000);
  };

  const runSimulation = () => {
    if (activeSimulation) return;
    setActiveSimulation(true);
    setSimulationProgress(0);
    setSimulationLogs([]);

    const steps = [
      "Initializing advanced attack vectors...",
      "Scanning target subnets and ports...",
      "Identifying vulnerable services...",
      "Attempting dictionary attack on SSH...",
      "Injecting SQL payload into login form...",
      "Bypassing WAF protection...",
      "Establishing reverse shell connection...",
      "Exfiltrating user database...",
      "Cleaning up access logs...",
      "Simulation complete. Report generated.",
    ];

    let step = 0;
    simulationIntervalRef.current = setInterval(() => {
      if (step >= steps.length) {
        if (simulationIntervalRef.current)
          clearInterval(simulationIntervalRef.current);
        setActiveSimulation(false);
      } else {
        setSimulationLogs((prev) => [...prev, steps[step]]);
        setSimulationProgress(((step + 1) / steps.length) * 100);
        step++;
      }
    }, 800);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simulationLogs]);

  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  const attackMetrics = [
    {
      label: "Attack Vectors",
      value: "12",
      icon: Target,
      color: "text-red-400",
    },
    {
      label: "Exploits Found",
      value: "8",
      icon: Bug,
      color: "text-orange-400",
    },
    {
      label: "Success Rate",
      value: "67%",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
    {
      label: "Tests Run",
      value: "156",
      icon: Activity,
      color: "text-cyber-blue",
    },
  ];

  const recentAttacks = [
    {
      id: 1,
      type: "SQL Injection Test",
      target: "Login API",
      status: "Successful",
      time: "5m ago",
    },
    {
      id: 2,
      type: "XSS Vulnerability",
      target: "User Dashboard",
      status: "Exploited",
      time: "20m ago",
    },
    {
      id: 3,
      type: "Authentication Bypass",
      target: "Admin Panel",
      status: "Failed",
      time: "1h ago",
    },
    {
      id: 4,
      type: "CSRF Attack",
      target: "Payment Form",
      status: "Successful",
      time: "2h ago",
    },
  ];

  const attackTools = [
    {
      title: "Penetration Testing",
      description: "Simulate real-world attacks to identify vulnerabilities",
      icon: Target,
      status: "Ready",
    },
    {
      title: "Exploit Development",
      description:
        "Create and test custom exploits for discovered vulnerabilities",
      icon: Code,
      status: "Active",
    },
    {
      title: "Social Engineering",
      description: "Test human factors and security awareness",
      icon: Zap,
      status: "Ready",
    },
    {
      title: "Network Reconnaissance",
      description:
        "Gather intelligence about target systems and infrastructure",
      icon: Activity,
      status: "Active",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-cyber-white mb-2 flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <Target size={24} className="text-white" />
              </div>
              Red Team Operations
            </h1>
            <p className="text-cyber-slate">
              Offensive security testing and ethical hacking
            </p>
          </div>

          {/* Active Operations Indicator */}
          <div className="flex items-center space-x-3 bg-black/20 px-4 py-2 rounded-full border border-red-500/10 backdrop-blur-sm">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-red-500 tracking-wider">
                ACTIVE OPS
              </div>
              <div className="text-[10px] text-red-400/60 font-mono">
                NET-MONITORING
              </div>
            </div>
            <RedTeamPulse />
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle size={20} className="text-red-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-400 font-bold text-sm mb-1">
              Ethical Hacking Only
            </p>
            <p className="text-xs text-red-300/70">
              All red team activities are authorized and conducted in controlled
              environments for security testing purposes only.
            </p>
          </div>

          {/* Blue Team Switch Button */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-cyber-slate">Blue Team</div>
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTeam("blue");
                navigate("/blue-team");
              }}
              className="px-4 py-2 bg-cyber-blue/20 border border-cyber-blue/50 rounded-lg text-sm font-bold text-cyber-blue hover:bg-cyber-blue/30 hover:border-cyber-blue/70 transition-all shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center space-x-2"
            >
              <Shield size={16} />
              <span>Switch to Blue Team</span>
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-white/10">
          {[
            { id: "overview", label: "Overview" },
            { id: "attacks", label: "Attack Vectors" },
            { id: "exploits", label: "Exploits" },
            { id: "simulation", label: "Simulation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-bold text-sm transition-all relative ${
                activeTab === tab.id
                  ? "text-red-400"
                  : "text-cyber-slate hover:text-cyber-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {attackMetrics.map((metric, index) => (
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
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Recent Attacks */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-black text-cyber-white mb-4 flex items-center">
                    <Target size={20} className="mr-2 text-red-400" />
                    Recent Attack Tests
                  </h3>
                  <div className="space-y-3">
                    {recentAttacks.map((attack) => (
                      <div
                        key={attack.id}
                        className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-red-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-cyber-white">
                            {attack.type}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              attack.status === "Successful" ||
                              attack.status === "Exploited"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {attack.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-cyber-slate">
                          <span>Target: {attack.target}</span>
                          <span>{attack.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Attack Tools */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-black text-cyber-white mb-4 flex items-center">
                    <Zap size={20} className="mr-2 text-red-400" />
                    Attack Tools & Techniques
                  </h3>
                  <div className="space-y-4">
                    {attackTools.map((tool, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 rounded-lg border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <tool.icon size={20} className="text-red-400" />
                            <span className="font-bold text-cyber-white">
                              {tool.title}
                            </span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400">
                            {tool.status}
                          </span>
                        </div>
                        <p className="text-xs text-cyber-slate mt-2">
                          {tool.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "attacks" && (
              <motion.div
                key="attacks"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Mobile Hacking Section */}
                <GlassCard className="p-6 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Smartphone size={24} className="text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-cyber-white">
                          Mobile Hacking
                        </h3>
                        <p className="text-xs text-cyber-slate">
                          iOS & Android Testing
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          App Analysis
                        </span>
                        <span className="text-xs text-cyber-green">Ready</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Static & dynamic analysis of mobile applications
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Reverse Engineering
                        </span>
                        <span className="text-xs text-cyber-green">Ready</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Decompile and analyze app binaries
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Network Interception
                        </span>
                        <span className="text-xs text-orange-400">Testing</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Intercept mobile network traffic
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAttack("mobile")}
                    className="w-full py-2.5 bg-orange-500/20 border border-orange-500/50 rounded-lg text-sm font-bold text-orange-400 hover:bg-orange-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Know More</span>
                    <Smartphone size={16} />
                  </motion.button>
                </GlassCard>

                {/* DDoS Attack Section */}
                <GlassCard className="p-6 border-2 border-red-500/30 hover:border-red-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <Radio size={24} className="text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-cyber-white">
                          DDoS Attack
                        </h3>
                        <p className="text-xs text-cyber-slate">
                          Network Stress Testing
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Volume Attacks
                        </span>
                        <span className="text-xs text-cyber-green">Ready</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Overwhelm target with high traffic volume
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Protocol Attacks
                        </span>
                        <span className="text-xs text-cyber-green">Ready</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Exploit network protocol weaknesses
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Application Layer
                        </span>
                        <span className="text-xs text-orange-400">Testing</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Target application-specific resources
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAttack("ddos")}
                    className="w-full py-2.5 bg-red-500/20 border border-red-500/50 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Know More</span>
                    <Radio size={16} />
                  </motion.button>
                </GlassCard>

                {/* Phishing Section */}
                <GlassCard className="p-6 border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Mail size={24} className="text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-cyber-white">
                          Phishing
                        </h3>
                        <p className="text-xs text-cyber-slate">
                          Social Engineering
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Email Campaigns
                        </span>
                        <span className="text-xs text-cyber-green">Ready</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Create and send phishing email templates
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Landing Pages
                        </span>
                        <span className="text-xs text-cyber-green">Ready</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Build convincing phishing landing pages
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-cyber-white">
                          Credential Harvesting
                        </span>
                        <span className="text-xs text-orange-400">Testing</span>
                      </div>
                      <p className="text-xs text-cyber-slate">
                        Capture and analyze harvested credentials
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAttack("phishing")}
                    className="w-full py-2.5 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-sm font-bold text-yellow-400 hover:bg-yellow-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Know More</span>
                    <Mail size={16} />
                  </motion.button>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "exploits" && (
              <motion.div
                key="exploits"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-black text-cyber-white flex items-center">
                        <Bug size={24} className="mr-3 text-orange-400" />
                        Exploit Arsenal
                      </h3>
                      <p className="text-cyber-slate mt-1">
                        Manage and deploy custom exploits for identified
                        vulnerabilities
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-cyber-white text-sm font-bold transition-all flex items-center space-x-2">
                      <Code size={16} />
                      <span>New Exploit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {exploits.map((exploit) => (
                      <div
                        key={exploit.id}
                        className="bg-white/5 rounded-xl border border-white/5 p-4 hover:border-orange-500/30 transition-colors group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                              <Bug size={20} className="text-orange-400" />
                            </div>
                            <div>
                              <h4 className="font-bold text-cyber-white text-lg">
                                {exploit.name}
                              </h4>
                              <div className="flex items-center space-x-3 text-xs text-cyber-slate mt-1">
                                <span className="bg-white/10 px-2 py-0.5 rounded">
                                  {exploit.type}
                                </span>
                                <span>•</span>
                                <span>{exploit.target}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                                exploit.risk === "Critical"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-orange-500/20 text-orange-400"
                              }`}
                            >
                              {exploit.risk}
                            </span>
                            <span
                              className={`px-3 py-1 rounded text-xs font-bold ${
                                exploit.status === "Success"
                                  ? "bg-cyber-green/20 text-cyber-green"
                                  : exploit.status === "Failed"
                                  ? "bg-red-500/20 text-red-400"
                                  : exploit.status === "Deploying..."
                                  ? "bg-cyber-blue/20 text-cyber-blue animate-pulse"
                                  : "bg-white/10 text-cyber-slate"
                              }`}
                            >
                              {exploit.status}
                            </span>
                          </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-gray-400 mb-4 border border-white/5 group-hover:border-white/10 transition-colors">
                          <span className="text-pink-400">const</span> payload ={" "}
                          <span className="text-green-400">
                            "{exploit.code}"
                          </span>
                          ;
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeployExploit(exploit.id)}
                            disabled={exploit.status === "Deploying..."}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-bold transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                          >
                            {exploit.status === "Deploying..." ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <Zap size={16} />
                            )}
                            <span>
                              {exploit.status === "Deploying..."
                                ? "Deploying..."
                                : "Deploy Exploit"}
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "simulation" && (
              <motion.div
                key="simulation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Simulation Control */}
                  <GlassCard className="p-6 lg:col-span-1">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-black text-cyber-white mb-2 flex items-center">
                          <Radio size={24} className="mr-3 text-red-400" />
                          Attack Simulation
                        </h3>
                        <p className="text-cyber-slate text-sm mb-6">
                          Execute a full kill-chain simulation to test
                          organizational defenses and response times.
                        </p>

                        <div className="space-y-4 mb-8">
                          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-xs text-cyber-slate uppercase tracking-wider mb-1">
                              Target Scope
                            </div>
                            <div className="font-mono text-cyber-white">
                              192.168.1.0/24
                            </div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-xs text-cyber-slate uppercase tracking-wider mb-1">
                              Attack Profile
                            </div>
                            <div className="font-bold text-red-400">
                              APT-29 Simulation
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={runSimulation}
                        disabled={activeSimulation}
                        className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all flex items-center justify-center space-x-3 ${
                          activeSimulation
                            ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
                        }`}
                      >
                        {activeSimulation ? (
                          <>
                            <div className="w-5 h-5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            <span>Running...</span>
                          </>
                        ) : (
                          <>
                            <Target size={20} />
                            <span>Start Simulation</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </GlassCard>

                  {/* Simulation Console */}
                  <GlassCard className="p-0 overflow-hidden lg:col-span-2 flex flex-col h-[500px]">
                    <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-mono text-sm font-bold text-cyber-white">
                          Command & Control Console
                        </span>
                      </div>
                      <div className="text-xs text-cyber-slate font-mono">
                        {activeSimulation ? "CONNECTED" : "IDLE"}
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2 bg-black/60 custom-scrollbar">
                      {simulationLogs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-cyber-slate/50">
                          <Terminal size={48} className="mb-4 opacity-50" />
                          <p>Ready to initialize simulation...</p>
                        </div>
                      ) : (
                        simulationLogs.map((log, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start space-x-3"
                          >
                            <span className="text-cyber-slate select-none">
                              {new Date().toLocaleTimeString()}
                            </span>
                            <span className="text-green-400">$</span>
                            <span className="text-cyber-white">{log}</span>
                          </motion.div>
                        ))
                      )}
                      {activeSimulation && (
                        <div className="w-2 h-4 bg-green-400 animate-pulse ml-2" />
                      )}
                      <div ref={logsEndRef} />
                    </div>

                    {/* Progress Bar */}
                    {activeSimulation && (
                      <div className="h-1 bg-white/10 w-full">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${simulationProgress}%` }}
                        />
                      </div>
                    )}
                  </GlassCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAttack && attackDetails[selectedAttack] && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAttack(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-cyber-dark border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative bg-gradient-to-r from-gray-900 to-black p-6 border-b border-white/10">
                  <button
                    onClick={() => setSelectedAttack(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-cyber-slate hover:text-cyber-white"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center ${attackDetails[selectedAttack].color}`}
                    >
                      {React.createElement(attackDetails[selectedAttack].icon, {
                        size: 32,
                      })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-cyber-white mb-1">
                        {attackDetails[selectedAttack].title}
                      </h2>
                      <p className="text-cyber-slate text-sm">
                        Operation Details & Methodology
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h3 className="text-sm font-bold text-cyber-white uppercase tracking-wider mb-2 flex items-center">
                      <Activity size={16} className="mr-2 text-cyber-blue" />
                      Overview
                    </h3>
                    <p className="text-cyber-slate leading-relaxed">
                      {attackDetails[selectedAttack].description}
                    </p>
                  </div>

                  {/* Methodology */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h3 className="text-sm font-bold text-cyber-white uppercase tracking-wider mb-2 flex items-center">
                      <Code size={16} className="mr-2 text-cyber-purple" />
                      Methodology
                    </h3>
                    <p className="text-cyber-slate leading-relaxed">
                      {attackDetails[selectedAttack].methodology}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Key Features */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h3 className="text-sm font-bold text-cyber-white uppercase tracking-wider mb-3 flex items-center">
                        <Target size={16} className="mr-2 text-red-400" />
                        Attack Vectors
                      </h3>
                      <ul className="space-y-2">
                        {attackDetails[selectedAttack].features.map(
                          (feature, i) => (
                            <li
                              key={i}
                              className="flex items-center text-sm text-cyber-slate"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2" />
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h3 className="text-sm font-bold text-cyber-white uppercase tracking-wider mb-3 flex items-center">
                        <Bug size={16} className="mr-2 text-orange-400" />
                        Tools & Frameworks
                      </h3>
                      <ul className="space-y-2">
                        {attackDetails[selectedAttack].tools.map((tool, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-cyber-slate"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle
                      size={20}
                      className="text-red-400 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-red-400 mb-1">
                        Authorized Testing Only
                      </p>
                      <p className="text-xs text-red-300/70">
                        This information is provided for educational and
                        authorized security testing purposes. Unauthorized use
                        against systems you do not own or have explicit
                        permission to test is illegal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};
