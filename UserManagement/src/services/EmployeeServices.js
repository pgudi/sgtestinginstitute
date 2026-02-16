import axiosInstance from "./AxiosConfig";

class EmployeeService {

  getAllEmployees() {
    return axiosInstance.get("/employees");
  }

  getEmployeeById(id) {
    return axiosInstance.get(`/employees/${id}`);
  }

  createEmployee(employee) {
    return axiosInstance.post("/employees", employee);
  }

  modifyEmployee(id, employee){
     return axiosInstance.put(`/employees/${id}`, employee)
  }

  deleteEmployee(id) {
    return axiosInstance.delete(`/employees/${id}`);
  }

  downloadEmployeeFile(){
    return axiosInstance.get("/employees/download-csv",{
        responseType: "blob"
    })
  }

  importEmployeeFile(formData){
    return axiosInstance.post("/employees/upload-csv",formData,{
        headers: { "Content-Type": "multipart/form-data" }
      })
  }
}

export default new EmployeeService();
