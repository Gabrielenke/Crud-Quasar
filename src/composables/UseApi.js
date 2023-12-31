import { api } from 'boot/axios';

export default function useApi(url) {
  const list = async () => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const post = async (form) => {
    try {
      const response = await api.post(url, form);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const update = async (form) => {
    try {
      const response = await api.put(`${url}/${form.id}`, form);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const remove = async (id) => {
    try {
      const response = await api.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    list,
    post,
    update,
    remove,
  };
}
