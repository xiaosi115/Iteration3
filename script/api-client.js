// API Client for C.A.R.S application
// This file handles all API interactions with the backend

const API_BASE_URL = 'http://114.55.236.178:3000'; 
// User related API calls
const UserAPI = {
    // Login user
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '登录失败');
            }
            
            const data = await response.json();
            // Store user data in localStorage for session management
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            return data;
        } catch (error) {
            console.error('登录错误:', error);
            throw error;
        }
    },
    
    // Register new user
    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '注册失败');
            }
            
            return await response.text();
        } catch (error) {
            console.error('注册错误:', error);
            throw error;
        }
    },
    
    // Get user profile by ID
    getUserProfile: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '获取用户信息失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('获取用户信息错误:', error);
            throw error;
        }
    },
    
    // Update user profile by username
    updateUserProfile: async (username, userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/username/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '更新用户信息失败');
            }
            
            return await response.text();
        } catch (error) {
            console.error('更新用户信息错误:', error);
            throw error;
        }
    },
    
    // Logout user (client-side only)
    logout: () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    },
    
    // Check if user is logged in
    isLoggedIn: () => {
        return localStorage.getItem('currentUser') !== null;
    },
    
    // Get current user data
    getCurrentUser: () => {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
};

// Vehicle related API calls
const VehicleAPI = {
    // Get all vehicles for a user
    getUserVehicles: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/vehicles`);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '获取车辆信息失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('获取车辆信息错误:', error);
            throw error;
        }
    },
    
    // Add new vehicle
    addVehicle: async (vehicleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/vehicles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '添加车辆失败');
            }
            
            return await response.text();
        } catch (error) {
            console.error('添加车辆错误:', error);
            throw error;
        }
    },
    
    // Update vehicle by license plate
    updateVehicle: async (licensePlate, vehicleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/vehicles/license/${licensePlate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '更新车辆信息失败');
            }
            
            return await response.text();
        } catch (error) {
            console.error('更新车辆信息错误:', error);
            throw error;
        }
    },
    
    // Delete vehicle by license plate
    deleteVehicle: async (licensePlate) => {
        try {
            const response = await fetch(`${API_BASE_URL}/vehicles/license/${licensePlate}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '删除车辆失败');
            }
            
            return await response.text();
        } catch (error) {
            console.error('删除车辆错误:', error);
            throw error;
        }
    }
};

// Feedback related API calls
const FeedbackAPI = {
    // Submit feedback
    submitFeedback: async (feedbackData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '提交反馈失败');
            }
            
            return await response.text();
        } catch (error) {
            console.error('提交反馈错误:', error);
            throw error;
        }
    },
    
    // Get all feedback (admin only)
    getAllFeedback: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/feedback`);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '获取反馈信息失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('获取反馈信息错误:', error);
            throw error;
        }
    }
};

// Auth protection for pages
function requireAuth() {
    if (!UserAPI.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Redirect if already logged in
function redirectIfLoggedIn() {
    if (UserAPI.isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}
