import axios from 'axios';
import { Employee } from '../models/Employee';

const API_URL = 'http://127.0.0.1:8000/api/employees/';

export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        throw error;
    }
};

export const getEmployeeById = async (employeeId: string): Promise<Employee> => {
    try {
        const response = await axios.get(`${API_URL}${employeeId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener empleado con ID ${employeeId}:`, error);
        throw error;
    }
};

export const createEmployee = async (employeeData: Employee): Promise<Employee> => {
    try {
        const response = await axios.post(API_URL, employeeData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        throw error;
    }
};

export const updateEmployee = async (employeeId: string, employeeData: Employee): Promise<Employee> => {
    try {
        const response = await axios.put(`${API_URL}${employeeId}/`, employeeData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el empleado con ID ${employeeId}:`, error);
        throw error;
    }
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}${employeeId}/`);
    } catch (error) {
        console.error(`Error al eliminar el empleado con ID ${employeeId}:`, error);
        throw error;
    }
};
