import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { AreaForeman } from '../../models/AreaForeman';
import { ShiftManager } from '../../models/ShiftManager';
import { Employee } from '../../models/Employee';
import { getAreaForemen, createAreaForeman } from '../../services/areaForemanService';
import { getShiftManagers, createShiftManager } from '../../services/shiftManagerService';
import { getEmployees, createEmployee } from '../../services/employeeService';
import {
    MenuItem,
    Button,
    TextField,
    Grid,
    Select,
    InputLabel,
    FormControl,
    Switch,
    FormControlLabel,
} from '@mui/material';

function ApplicationsTransactions() {
    const [areaForemen, setAreaForemen] = useState<AreaForeman[]>([]);
    const [shiftManagers, setShiftManagers] = useState<ShiftManager[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newAreaForeman, setNewAreaForeman] = useState<AreaForeman>({
        identity_card: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        shift_group: 1,
        shift_manager: '',
        current_shift: 'Día',
        is_active: true,
    });
    const [newShiftManager, setNewShiftManager] = useState<ShiftManager>({
        identity_card: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        shift_type: 'Día',
        shift_group: 1,
        is_active: true,
    });
    const [newEmployee, setNewEmployee] = useState<Employee>({
        identity_card: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        shift_group: 1,
        foreman: '',
        current_shift: 'Día',
        is_active: true,
    });
    const [loading, setLoading] = useState<boolean>(true);

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

    // Manejadores de cambios independientes para cada formulario
    const handleAreaForemanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAreaForeman({ ...newAreaForeman, [name]: value });
    };

    const handleShiftManagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewShiftManager({ ...newShiftManager, [name]: value });
    };

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    // Manejadores de cambios para los switches (estado activo/inactivo)
    const handleAreaForemanToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewAreaForeman({ ...newAreaForeman, [name]: checked });
    };

    const handleShiftManagerToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewShiftManager({ ...newShiftManager, [name]: checked });
    };

    const handleEmployeeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewEmployee({ ...newEmployee, [name]: checked });
    };

    // Manejadores de envío independientes para cada formulario
    const handleSubmitAreaForeman = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAreaForeman(newAreaForeman);
            setAreaForemen([...areaForemen, newAreaForeman]);
            setNewAreaForeman({
                identity_card: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                shift_group: 1,
                shift_manager: '',
                current_shift: 'Día',
                is_active: true,
            });
        } catch (error) {
            console.error('Error creating area foreman', error);
        }
    };

    const handleSubmitShiftManager = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createShiftManager(newShiftManager);
            setShiftManagers([...shiftManagers, newShiftManager]);
            setNewShiftManager({
                identity_card: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                shift_type: 'Día',
                shift_group: 1,
                is_active: true,
            });
        } catch (error) {
            console.error('Error creating shift manager', error);
        }
    };

    const handleSubmitEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEmployee(newEmployee);
            setEmployees([...employees, newEmployee]);
            setNewEmployee({
                identity_card: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                shift_group: 1,
                foreman: '',
                current_shift: 'Día',
                is_active: true,
            });
        } catch (error) {
            console.error('Error creating employee', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='conatainer-art'>
            <h1>Formularios</h1>
            <Grid container spacing={2}>
                 {/* Formulario de Jefe de Turno */}
                <Grid item xs={12} md={4} className='form-p'>
                    <h2>Agregar Jefe de Turno</h2>
                    <form onSubmit={handleSubmitShiftManager}>
                        <TextField
                            label="Cédula de Identidad"
                            name="identity_card"
                            value={newShiftManager.identity_card}
                            onChange={handleShiftManagerChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Nombre"
                            name="first_name"
                            value={newShiftManager.first_name}
                            onChange={handleShiftManagerChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Apellidos"
                            name="last_name"
                            value={newShiftManager.last_name}
                            onChange={handleShiftManagerChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Número de Celular"
                            name="phone_number"
                            value={newShiftManager.phone_number}
                            onChange={handleShiftManagerChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            select
                            label="Grupo"
                            name="shift_group"
                            value={newShiftManager.shift_group}
                            onChange={handleShiftManagerChange}
                            fullWidth
                            margin="normal"
                        >
                            {[1, 2, 3, 4].map((group) => (
                                <MenuItem key={group} value={group}>
                                    Grupo {group}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Turno"
                            name="shift_type"
                            value={newShiftManager.shift_type}
                            onChange={handleShiftManagerChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Día">Día</MenuItem>
                            <MenuItem value="Noche">Noche</MenuItem>
                        </TextField>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="is_active"
                                    checked={newShiftManager.is_active}
                                    onChange={handleShiftManagerToggle}
                                    color="primary"
                                />
                            }
                            label="Activo"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Agregar Jefe de Turno
                        </Button>
                    </form>
                </Grid>
                {/* Formulario de Capataz de Área */}
                <Grid item xs={12} md={4} className='form-p'>
                    <h2>Agregar Capataz de Área</h2>
                    <form onSubmit={handleSubmitAreaForeman}>
                        <TextField
                            label="Cédula de Identidad"
                            name="identity_card"
                            value={newAreaForeman.identity_card}
                            onChange={handleAreaForemanChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Nombre"
                            name="first_name"
                            value={newAreaForeman.first_name}
                            onChange={handleAreaForemanChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Apellidos"
                            name="last_name"
                            value={newAreaForeman.last_name}
                            onChange={handleAreaForemanChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Número de Celular"
                            name="phone_number"
                            value={newAreaForeman.phone_number}
                            onChange={handleAreaForemanChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="shift-manager-label">Jefe de Turno</InputLabel>
                            <Select
                                labelId="shift-manager-label"
                                name="shift_manager"
                                value={newAreaForeman.shift_manager}
                                onChange={(e) =>
                                    setNewAreaForeman({
                                        ...newAreaForeman,
                                        shift_manager: e.target.value,
                                    })
                                }
                            >
                                {shiftManagers.map((manager) => (
                                    <MenuItem key={manager.identity_card} value={manager.identity_card}>
                                        {`${manager.first_name} ${manager.last_name}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            select
                            label="Grupo"
                            name="shift_group"
                            value={newAreaForeman.shift_group}
                            onChange={handleAreaForemanChange}
                            fullWidth
                            margin="normal"
                        >
                            {[1, 2, 3, 4].map((group) => (
                                <MenuItem key={group} value={group}>
                                    Grupo {group}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Turno Actual"
                            name="current_shift"
                            value={newAreaForeman.current_shift}
                            onChange={handleAreaForemanChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Día">Día</MenuItem>
                            <MenuItem value="Noche">Noche</MenuItem>
                        </TextField>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="is_active"
                                    checked={newAreaForeman.is_active}
                                    onChange={handleAreaForemanToggle}
                                    color="primary"
                                />
                            }
                            label="Activo"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Agregar Capataz de Área
                        </Button>
                    </form>
                </Grid>

                {/* Formulario de Empleado */}
                <Grid item xs={12} md={4} className='form-p'>
                    <h2>Agregar Empleado</h2>
                    <form onSubmit={handleSubmitEmployee}>
                        <TextField
                            label="Cédula de Identidad"
                            name="identity_card"
                            value={newEmployee.identity_card}
                            onChange={handleEmployeeChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Nombre"
                            name="first_name"
                            value={newEmployee.first_name}
                            onChange={handleEmployeeChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Apellidos"
                            name="last_name"
                            value={newEmployee.last_name}
                            onChange={handleEmployeeChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Número de Celular"
                            name="phone_number"
                            value={newEmployee.phone_number}
                            onChange={handleEmployeeChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="foreman-label">Capataz de Área</InputLabel>
                            <Select
                                labelId="foreman-label"
                                name="foreman"
                                value={newEmployee.foreman}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        foreman: e.target.value,
                                    })
                                }
                            >
                                {areaForemen.map((foreman) => (
                                    <MenuItem key={foreman.identity_card} value={foreman.identity_card}>
                                        {`${foreman.first_name} ${foreman.last_name}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            select
                            label="Grupo"
                            name="shift_group"
                            value={newEmployee.shift_group}
                            onChange={handleEmployeeChange}
                            fullWidth
                            margin="normal"
                        >
                            {[1, 2, 3, 4].map((group) => (
                                <MenuItem key={group} value={group}>
                                    Grupo {group}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Turno Actual"
                            name="current_shift"
                            value={newEmployee.current_shift}
                            onChange={handleEmployeeChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Día">Día</MenuItem>
                            <MenuItem value="Noche">Noche</MenuItem>
                        </TextField>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="is_active"
                                    checked={newEmployee.is_active}
                                    onChange={handleEmployeeToggle}
                                    color="primary"
                                />
                            }
                            label="Activo"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Agregar Empleado
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

ApplicationsTransactions.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;