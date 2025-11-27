// src/api/services/issueService.js
import api from "../axios";

export const issueService = {
  create: async (formData) => {
    const res = await api.post("/issue/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getMyIssues: async () => {
    const res = await api.get("/dashboard/my-issues");
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/issue/${id}`);
    return res.data;
  },
};
