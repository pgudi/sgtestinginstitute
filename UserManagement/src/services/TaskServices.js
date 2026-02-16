import axiosInstance from "./AxiosConfig";

class TaskService{

    getAllTasks() {
        return axiosInstance.get("/tasks");
    }

    getTaskById(id) {
        return axiosInstance.get(`/tasks/${id}`);
    }

    createTask(task) {
        return axiosInstance.post("/tasks", task);
    }

    modifyTask(id, task) {
        return axiosInstance.put(`/tasks/${id}`, task)
    }

    deleteTask(id) {
        return axiosInstance.delete(`/tasks/${id}`);
    }

}
export default new TaskService()