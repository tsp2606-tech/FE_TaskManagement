import request from "./index";

export const getTasks = (query) => request("/tasks", { query });

export const getTaskById = (id) => request(`/tasks/${id}`);

export const createTask = (payload) =>
  request("/tasks", {
    method: "POST",
    body: payload,
  });

export const updateTask = (id, payload) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    body: payload,
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: "DELETE",
  });

export const updateTaskStatus = (id, status) =>
  request(`/tasks/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
