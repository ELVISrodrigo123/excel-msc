import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { AreaForeman } from '../../models/AreaForeman';
import { ShiftManager } from '../../models/ShiftManager';
import { Employee } from '../../models/Employee';
import { getAreaForemen } from '../../services/areaForemanService';
import { getShiftManagers } from '../../services/shiftManagerService';
import { getEmployees } from '../../services/employeeService';
import {
    Table, Button,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    IconButton,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

    function ApplicationsMessenger() {
        const [areaForemen, setAreaForemen] = useState<AreaForeman[]>([]);
        const [shiftManagers, setShiftManagers] = useState<ShiftManager[]>([]);
        const [employees, setEmployees] = useState<Employee[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [search, setSearch] = useState<string>('');
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const [foremenData, managersData, employeesData] = await Promise.all([
                        getAreaForemen(),
                        getShiftManagers(),
                        getEmployees(),
                    ]);
                    setAreaForemen(foremenData);
                    setShiftManagers(managersData);
                    setEmployees(employeesData);
                } catch (error) {
                    console.error('Error fetching data', error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }, []);
    
        if (loading) return <div>Loading...</div>;
    
        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
        };
    
        const filterData = (data: any[]) => {
            return data.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(search.toLowerCase())
                )
            );
        };

    return (
        <div className='conatainer-art'>
            <h1>Lista de Personal</h1>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                    <TextField
                        label="Buscar"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" fullWidth>
                        Buscar
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column">
                {/* Tabla de Jefes de Turno */}
                <Grid item xs={12}>
                    <h2>Lista de Jefes de Turno</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cédula</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Grupo</TableCell>
                                    <TableCell>Turno</TableCell>
                                    <TableCell>Activo</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterData(shiftManagers).map((shiftManager) => (
                                    <TableRow key={shiftManager.identity_card}>
                                        <TableCell>{shiftManager.identity_card}</TableCell>
                                        <TableCell>{`${shiftManager.first_name} ${shiftManager.last_name}`}</TableCell>
                                        <TableCell>{shiftManager.phone_number}</TableCell>
                                        <TableCell>{`Grupo ${shiftManager.shift_group}`}</TableCell>
                                        <TableCell>{shiftManager.shift_type}</TableCell>
                                        <TableCell>{shiftManager.is_active ? 'Sí' : 'No'}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary"><EditIcon /></IconButton>
                                            <IconButton sx={{ color: 'red' }}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Tabla de Capataces de Área */}
                <Grid item xs={12}>
                    <h2>Lista de Capataces de Área</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cédula</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Jefe de Área</TableCell>
                                    <TableCell>Grupo</TableCell>
                                    <TableCell>Turno</TableCell>
                                    <TableCell>Activo</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterData(areaForemen).map((foreman) => {
                                    const manager = shiftManagers.find(
                                        (manager) => manager.identity_card === foreman.shift_manager
                                    );
                                    return (
                                        <TableRow key={foreman.identity_card}>
                                            <TableCell>{foreman.identity_card}</TableCell>
                                            <TableCell>{`${foreman.first_name} ${foreman.last_name}`}</TableCell>
                                            <TableCell>{foreman.phone_number}</TableCell>
                                            <TableCell>{manager ? `${manager.first_name} ${manager.last_name}` : 'N/A'}</TableCell>
                                            <TableCell>{`Grupo ${foreman.shift_group}`}</TableCell>
                                            <TableCell>{foreman.current_shift}</TableCell>
                                            <TableCell>{foreman.is_active ? 'Sí' : 'No'}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary"><EditIcon /></IconButton>
                                                <IconButton sx={{ color: 'red' }}><DeleteIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Tabla de Empleados */}
                <Grid item xs={12}>
                    <h2>Lista de Empleados</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cédula</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Capataz</TableCell>
                                    <TableCell>Grupo</TableCell>
                                    <TableCell>Turno</TableCell>
                                    <TableCell>Activo</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterData(employees).map((employee) => {
                                    const foreman = areaForemen.find(
                                        (foreman) => foreman.identity_card === employee.area_foreman
                                    );
                                    return (
                                        <TableRow key={employee.identity_card}>
                                            <TableCell>{employee.identity_card}</TableCell>
                                            <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                                            <TableCell>{employee.phone_number}</TableCell>
                                            <TableCell>{foreman ? `${foreman.first_name} ${foreman.last_name}` : 'N/A'}</TableCell>
                                            <TableCell>{`Grupo ${employee.shift_group}`}</TableCell>
                                            <TableCell>{employee.current_shift}</TableCell>
                                            <TableCell>{employee.is_active ? 'Sí' : 'No'}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary"><EditIcon /></IconButton>
                                                <IconButton sx={{ color: 'red' }}><DeleteIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default ApplicationsMessenger;

export const getLayout = (page: React.ReactNode) => <SidebarLayout>{page}</SidebarLayout>;

ApplicationsMessenger.getLayout = getLayout;
