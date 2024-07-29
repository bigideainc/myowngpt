import { Typography } from "@material-tailwind/react";
import { styled } from '@mui/system';

const currentYear = new Date().getFullYear();

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '14px',
}));

export function Footer() {
  return (
    <footer 
      className="relative py-10 w-full text-xl font-semibold p-4 text-center text-gray-300" 
      style={{ backgroundColor: '#6e8efb', color: '#fff', fontFamily: 'Poppins', fontSize: '15px' }}
    >
      © {currentYear} Copyright:
      <a
        className="text-white"
        href="#"
        style={{ marginLeft: '5px' }}
      >
        YOGPT
      </a>
    </footer>
  );
}
