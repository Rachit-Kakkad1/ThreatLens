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
    const response = await api.post("/api/analyze", payload);
    const body = response.data || {};
    const analysis = body.analysis || {};
    return {
      // core analysis fields
      riskScore: analysis.riskScore ?? analysis.overallRiskScore ?? 0,
      vulnerabilities: analysis.vulnerabilities ?? [],
      attackerView: analysis.attackerView ?? [],
      defenderFixes: analysis.defenderFixes ?? [],
      impactAnalysis: analysis.impactAnalysis ?? [],
      processingTime: analysis.processingTime ?? 0,
      overallRiskScore: analysis.overallRiskScore ?? analysis.riskScore ?? 0,
      // syntax + decision flags
      syntax: body.syntax,
      engineDecision: body.engineDecision,
      // passthrough optional summary
      summary: analysis.summary,
      // passthrough metadata
      _id: analysis.id,
      inputType: analysis.inputType,
      content: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };
  },

  // -----------------------------
  // GET /api/analyze/history
  // -----------------------------
  getHistory: async (): Promise<AnalysisHistoryItem[]> => {
    const response = await api.get("/api/analyze/history");
    // Backend returns { success: true, analyses: [...] }
    return response.data.analyses || [];
  },

  // -----------------------------
  // GET /api/analyze/:id
  // -----------------------------
  getAnalysisById: async (id: string) => {
    const response = await api.get(`/api/analyze/${id}`);
    // Backend returns { success: true, analysis: {...} }
    return response.data;
  },

  // -----------------------------
  // GET /api/dashboard/metrics
  // -----------------------------
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get("/api/dashboard/metrics");
    return response.data.metrics;
  },
};
