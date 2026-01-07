import api from "./axios";
import type {
  AnalysisRequest,
  AnalysisResult,
  AnalysisHistoryItem,
  DashboardMetrics,
} from "../types/analysis";

export const analysisApi = {
  // -----------------------------
  // POST /api/analyze
  // -----------------------------
  analyze: async (payload: AnalysisRequest): Promise<AnalysisResult> => {
    // Runtime validation (defensive)
    if (!payload || typeof payload.content !== "string" || !payload.content.trim()) {
      throw new Error("Invalid analysis payload");
    }
    try {
      const response = await api.post("/api/analyze", payload);
      const body = response?.data ?? {};
      const analysis = body?.analysis ?? {};
      return {
        riskScore: Number(analysis.riskScore ?? analysis.overallRiskScore ?? 0) || 0,
        vulnerabilities: Array.isArray(analysis.vulnerabilities) ? analysis.vulnerabilities : [],
        attackerView: analysis.attackerView ?? [],
        defenderFixes: analysis.defenderFixes ?? [],
        impactAnalysis: analysis.impactAnalysis ?? [],
        processingTime: Number(analysis.processingTime ?? 0) || 0,
        overallRiskScore: Number(analysis.overallRiskScore ?? analysis.riskScore ?? 0) || 0,
        syntax: body.syntax,
        engineDecision: body.engineDecision,
        summary: analysis.summary,
        _id: analysis.id,
        inputType: analysis.inputType,
        content: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Analysis request failed";
      throw new Error(msg);
    }
  },

  // -----------------------------
  // GET /api/analyze/history
  // -----------------------------
  getHistory: async (): Promise<AnalysisHistoryItem[]> => {
    try {
      const response = await api.get("/api/analyze/history");
      const list = response?.data?.analyses;
      if (!Array.isArray(list)) return [];
      return list.map((a: any) => ({
        id: String(a.id ?? a._id ?? ""),
        inputType: a.inputType,
        overallRiskScore: Number(a.overallRiskScore ?? 0) || 0,
        vulnerabilityCount: Number(a.vulnerabilityCount ?? 0) || 0,
        analysisDate: String(a.analysisDate ?? new Date().toISOString()),
      }));
    } catch {
      return [];
    }
  },

  // -----------------------------
  // GET /api/analyze/:id
  // -----------------------------
  getAnalysisById: async (id: string) => {
    if (!id) throw new Error("Analysis ID required");
    const response = await api.get(`/api/analyze/${id}`);
    return response.data;
  },

  // -----------------------------
  // GET /api/dashboard/metrics
  // -----------------------------
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    try {
      const response = await api.get("/api/dashboard/metrics");
      const m = response?.data?.metrics ?? {};
      return {
        totalScans: Number(m.totalScans ?? 0) || 0,
        totalVulnerabilities: Number(m.totalVulnerabilities ?? 0) || 0,
        severityDistribution: {
          Low: Number(m?.severityDistribution?.Low ?? 0) || 0,
          Medium: Number(m?.severityDistribution?.Medium ?? 0) || 0,
          High: Number(m?.severityDistribution?.High ?? 0) || 0,
          Critical: Number(m?.severityDistribution?.Critical ?? 0) || 0,
        },
        riskTrends: Array.isArray(m.riskTrends)
          ? m.riskTrends.map((r: any) => ({
              timestamp: String(r.timestamp ?? r.date ?? new Date().toISOString()),
              riskScore: Number(r.riskScore ?? r.value ?? 0) || 0,
            }))
          : [],
      };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Dashboard metrics failed";
      throw new Error(msg);
    }
  },
};
