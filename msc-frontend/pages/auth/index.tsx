import * as React from 'react';
import { Box, Button, Typography, TextField, styled, IconButton, Alert } from '@mui/material';
import { Person, Lock, HelpOutline, Login } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { login } from '../services/auth';  // Importa el servicio de autenticación

const FormContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  maxWidth: '400px',
  textAlign: 'center',
  zIndex: 2,
}) as typeof Box;

export default function SignIn() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>(''); // Estado para el mensaje de error

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    try {
      const response = await login(username, password);
      if (response.access) {
        router.push('/dashboards/minera');  // Redirige al dashboard
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error de autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#b0b4cc',
      }}
    >
      <FormContainer component="form" onSubmit={handleSubmit}>
        <IconButton color="primary" sx={{ mb: 2 }}>
          <Person fontSize="large" />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Industrial Portal
        </Typography>

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <TextField
          fullWidth
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          required
          InputProps={{
            startAdornment: <Lock sx={{ mr: 1 }} />,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" startIcon={<HelpOutline />}>Help</Button>
          <Button type="submit" variant="contained" color="primary" startIcon={<Login />}>
            Sign In
          </Button>
        </Box>
      </FormContainer>
    </Box>
  );
}
