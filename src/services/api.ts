import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ── fetch nativo (usado por Login/Register) ──────────────────────────────────
export async function apiFetch(method: string, endpoint: string, body?: any) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Error en la petición');
  }

  return data;
}

// ── axios instance (usado por los demás componentes) ─────────────────────────
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const usersAPI = {
  search: (query: string) => api.get(`/users/search?q=${query}`),
  getProfile: () => api.get('/users/profile'),
};

export const contactsAPI = {
  getContacts: () => api.get('/contacts'),
  addContact: (userId: number) => api.post('/contacts', { userId }),
  removeContact: (contactId: number) => api.delete(`/contacts/${contactId}`),
};

export const chatsAPI = {
  getChats: () => api.get('/chats'),
  createChat: (data: { name?: string; isGroup: boolean; memberIds: number[] }) =>
    api.post('/chats', data),
  getMessages: (chatId: number) => api.get(`/messages/${chatId}`),
  sendMessage: (chatId: number, content: string, type: string = 'text') =>
    api.post('/messages', { chatId, content, type }),
  markAsRead: (chatId: number) => api.put(`/messages/${chatId}/read`),
};

export const filesAPI = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
