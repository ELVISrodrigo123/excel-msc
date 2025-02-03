import React, { useEffect, useState } from 'react';
import { AreaForeman } from '../models/AreaForeman';
import { getAreaForemen } from '../services/areaForemanService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AreaForemanList: React.FC = () => {
    const [areaForemen, setAreaForemen] = useState<AreaForeman[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAreaForemen = async () => {
            try {
                const data = await getAreaForemen();
                setAreaForemen(data);
            } catch (error) {
                console.error('Error fetching area foremen', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAreaForemen();
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
                        <TableCell>Activo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areaForemen.map((foreman) => (
                        <TableRow key={foreman.identity_card}>
                            <TableCell>{foreman.identity_card}</TableCell>
                            <TableCell>{`${foreman.first_name} ${foreman.last_name}`}</TableCell>
                            <TableCell>{foreman.phone_number}</TableCell>
                            <TableCell>{`Grupo ${foreman.shift_group}`}</TableCell>
                            <TableCell>{foreman.current_shift}</TableCell>
                            <TableCell>{foreman.is_active ? 'Sí' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AreaForemanList;
