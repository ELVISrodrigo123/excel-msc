// pages/containers/ShiftManager.tsx
import React, { useEffect, useState } from 'react';
import { ShiftManager } from '../models/ShiftManager';
import { getShiftManagers } from '../services/shiftManagerService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ShiftManagerList: React.FC = () => {
    const [shiftManagers, setShiftManagers] = useState<ShiftManager[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchShiftManagers = async () => {
            try {
                const data = await getShiftManagers();
                setShiftManagers(data);
            } catch (error) {
                console.error("Error fetching shift managers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShiftManagers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Cédula</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Turno</TableCell>
                        <TableCell>Grupo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shiftManagers.map((shiftManager) => (
                        <TableRow key={shiftManager.identity_card}>
                            <TableCell>{shiftManager.identity_card}</TableCell>
                            <TableCell>{`${shiftManager.first_name} ${shiftManager.last_name}`}</TableCell>
                            <TableCell>{shiftManager.shift_type}</TableCell>
                            <TableCell>{`Grupo ${shiftManager.shift_group}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ShiftManagerList;
