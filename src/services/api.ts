// Configuración
const API_URL = 'http://10.10.6.195:3000';

// Función principal para llamar a la API
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