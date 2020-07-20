import http from '../http-common';

const getByDate = (date) => {
  // return http.get(`/api/transaction?period=${date}`);
  return http.get(`/api/transaction/${date}`);
};

const get = (id) => {
  return http.get(`/api/transaction/${id}`);
};

const create = (data) => {
  return http.post('/api/transaction', data);
};

const findByName = (name) => {
  return http.get(`/api/transaction?name=${name}`);
};

const deleteById = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

const updateById = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

export default {
  getByDate,
  deleteById,
  get,
  create,
  findByName,
  updateById,
};
