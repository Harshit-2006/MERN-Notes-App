import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api/notes`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getNotes = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

export const getNoteById = async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await apiClient.post('/', noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await apiClient.put(`/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await apiClient.delete(`/${id}`);
  return response.data;
};
