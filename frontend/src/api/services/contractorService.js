// src/api/services/contractorService.js
import api from "../axios";

export const contractorService = {
  getTasks: async () => {
    const res = await api.get("/contractor/tasks");
    return res.data;
  },

  updateStatus: async (data) => {
    const res = await api.post("/contractor/update", data);
    return res.data;
  },
};
