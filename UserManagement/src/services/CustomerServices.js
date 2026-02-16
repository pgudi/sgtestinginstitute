import axiosInstance from "./AxiosConfig";

class CustomerService {

    getAllCustomers() {
        return axiosInstance.get("/customers");
    }

    getCustomerById(id) {
        return axiosInstance.get(`/customers/${id}`);
    }

    createCustomer(customer) {
        return axiosInstance.post("/customers", customer);
    }

    modifyCustomer(id, customer) {
        return axiosInstance.put(`/customers/${id}`, customer)
    }

    deleteCustomer(id) {
        return axiosInstance.delete(`/customers/${id}`);
    }

}

export default new CustomerService()