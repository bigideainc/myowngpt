import { Typography } from "@material-tailwind/react";
import { styled } from '@mui/system';

const LINKS = [
  {
    title: "Explore",
    items: ["Home", "Models", "Community", "Pricing"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '14px',
}));

export function Footer() {
  return (
    <footer className="relative py-10 w-full text-xl font-semibold p-4 text-center text-gray-300 dark:bg-neutral-700 dark:text-neutral-200" style={{ backgroundColor: '#099D51', fontFamily: 'Poppins', fontSize: '15px' }}>

  © 2024 Copyright:
  <a
    className="text-white dark:text-neutral-400"
    href="#"
  >YOGPT</a>
    </footer>
  );
}
