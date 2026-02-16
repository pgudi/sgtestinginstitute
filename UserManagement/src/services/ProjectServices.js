import axiosInstance from "./AxiosConfig";
class ProjectService{

    getAllProjects() {
        return axiosInstance.get("/projects");
    }

    getProjectById(id) {
        return axiosInstance.get(`/projects/${id}`);
    }

    createProject(project) {
        return axiosInstance.post("/projects", project);
    }

    modifyProject(id, project) {
        return axiosInstance.put(`/projects/${id}`, project)
    }

    deleteProject(id) {
        return axiosInstance.delete(`/projects/${id}`);
    }

}
export default new ProjectService()