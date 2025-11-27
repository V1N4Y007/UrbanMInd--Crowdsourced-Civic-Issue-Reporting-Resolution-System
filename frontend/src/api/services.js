import api from './axios';

export const issueService = {
    // Citizen: Report an issue
    create: async (formData) => {
        const response = await api.post('/issues', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // Citizen: Get own issues
    getMyIssues: async (params) => {
        const response = await api.get('/issues/my-issues', { params });
        return response.data;
    },

    // Public/All: Get single issue details
    getById: async (id) => {
        const response = await api.get(`/issues/${id}`);
        return response.data;
    },

    // Admin: Get all issues
    getAll: async (params) => {
        const response = await api.get('/issues', { params });
        return response.data;
    },

    // Admin/Contractor: Update status
    updateStatus: async (id, status) => {
        const response = await api.patch(`/issues/${id}/status`, { status });
        return response.data;
    },
};

export const dashboardService = {
    // Get stats based on role
    getStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },
};

export const userService = {
    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // Admin: Get contractors
    getContractors: async () => {
        const response = await api.get('/users/contractors');
        return response.data;
    },
};
