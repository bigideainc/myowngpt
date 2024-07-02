import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { FaChartBar, FaFileAlt, FaHome, FaQuestionCircle, FaWallet } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CustomSliderIcon from "./CustomSliderIcon";

const Sidebar = ({ user, activeScreen, onMenuClick }) => {
  const menuItems = [
    { name: "Home", icon: <FaHome />, screen: "Home", path: "/" },
    { name: "Dashboard", icon: <CustomSliderIcon />, screen: "Dashboard", path: "/llms" },
    { name: "Deployed Models", icon: <FaChartBar />, screen: "Models", path: "/models" },
    { name: "Billing", icon: <FaWallet />, screen: "Billing", path: "/bill" },
    { name: "Docs", icon: <FaFileAlt />, screen: "Docs", path: "/docs" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
      <Card className="bg-transparent shadow-none overflow-hidden w-full h-full">
        <CardBody className="flex flex-col justify-between h-full p-0">
          <div className="flex flex-shrink-0 items-center p-4 pt-6 justify-center">
            <Typography
              variant="h3"
              className="text-white font-bold tracking-wide" style={{ color: "#ffd433" }}
            >
              yoGPT
            </Typography>
          </div>
          <nav className="mt-4">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <hr className="my-2 border-t border-gray-700" />}
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 w-full px-4 py-4 rounded-lg text-left font-bold ${isActive ? "bg-[#ffd433] text-white" : "hover:bg-[#ffd433] hover:text-white"}`
                  }
                  onClick={() => onMenuClick(item.screen)}
                  style={{ color: 'white' }}
                >
                  {React.cloneElement(item.icon, { className: "text-[#ffd433]" })}
                  <span>{item.name}</span>
                </NavLink>
              </React.Fragment>
            ))}
          </nav>
          <div className="flex flex-col items-start p-4 pb-6 gap-2 mt-auto border-t border-gray-700">
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <Typography variant="small" className="capitalize text-gray-400 text-sm font-semibold">{user.name}</Typography>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <FaQuestionCircle className="text-[#ffd433]" />
              <Typography variant="small" className="text-gray-400">Need Help?</Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
