// src/api/services/dashboardService.js
import api from "../axios";

export const dashboardService = {
  getStats: async () => {
    const res = await api.get("/dashboard/stats");
    return res.data;
  },

  getMyIssues: async (limit = 5) => {
    const res = await api.get(`/dashboard/my-issues?limit=${limit}`);
    return res.data;
  },
};
