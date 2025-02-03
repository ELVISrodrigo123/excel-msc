// pages/containers/Employee.tsx
import React, { useEffect, useState } from 'react';
import { Employee } from '../models/Employee';
import { getEmployees } from '../services/employeeService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Cédula</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Grupo</TableCell>
                        <TableCell>Turno</TableCell>
                        <TableCell>Capataz</TableCell>
                        <TableCell>Activo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.identity_card}>
                            <TableCell>{employee.identity_card}</TableCell>
                            <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                            <TableCell>{employee.phone_number}</TableCell>
                            <TableCell>{`Grupo ${employee.shift_group}`}</TableCell>
                            <TableCell>{employee.current_shift}</TableCell>
                            <TableCell>{employee.foreman}</TableCell>
                            <TableCell>{employee.is_active ? 'Sí' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeList;
