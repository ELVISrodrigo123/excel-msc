import { Box,BoxProps} from '@mui/material'

export default function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
      <Box sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          /* p: 1,
          m: 1, */
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
} 