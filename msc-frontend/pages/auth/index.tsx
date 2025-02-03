import * as React from 'react';
import { Box, Button, Typography, TextField, styled, IconButton, Alert } from '@mui/material';
import { Person, Lock, HelpOutline, Login } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { login } from '../services/auth';

// FormContainer con tipado correcto y propagación de props
const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  maxWidth: '400px',
  textAlign: 'center',
  zIndex: 2,
  color: 'white', // Texto en blanco
}));

const SignIn = React.memo(() => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    try {
      const response = await login(username, password);
      if (response.access) {
        router.push('/dashboards/minera');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error de autenticación. Verifica tus credenciales.');
    }
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Usamos "as" en lugar de "component" para especificar que es un formulario */}
      <FormContainer as="form" onSubmit={handleSubmit}>
        <IconButton sx={{ mb: 2, color: 'white' }}>
          <Person fontSize="large" />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
          Industrial Portal
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#80deea' }, // Color de borde suave
              '& input': { color: 'white' }, // Texto en blanco
              backgroundColor: 'rgb(66, 87, 241)', // Fondo suave
            },
            '& .MuiInputLabel-root': { color: '#80deea' }, // Label en color suave
          }}
          InputProps={{
            startAdornment: <Person sx={{ mr: 1, color: '#80deea' }} />, // Ícono de usuario con color suave
          }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#80deea' }, // Color de borde suave
              '& input': { color: 'white' }, // Texto en blanco
              backgroundColor: 'rgb(66, 87, 241)', // Fondo suave
            },
            '& .MuiInputLabel-root': { color: '#80deea' }, // Label en color suave
          }}
          InputProps={{
            startAdornment: <Lock sx={{ mr: 1, color: '#80deea' }} />, // Ícono de candado con color suave
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" startIcon={<HelpOutline />} sx={{ color: 'white', borderColor: '#80deea' }}>
            Help
          </Button>
          <Button type="submit" variant="contained" startIcon={<Login />} sx={{ backgroundColor: 'white', color: 'primary.main' }}>
            Sign In
          </Button>
        </Box>
      </FormContainer>
    </Box>
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
