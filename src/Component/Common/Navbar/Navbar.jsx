import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes, FaBell} from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Services/Operations/authoperation";
import { SiApostrophe } from "react-icons/si";
// import { logoutUser } from "../../Slices/authSlice"; // Assuming you have a logout action
import { MdOutlineManageHistory } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.auth); // Access user and token from Redux state

  const isLoggedIn = Boolean(accessToken);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLoginRedirect = () => {navigate("/login"),
    setIsProfileMenuOpen(!isProfileMenuOpen)
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsProfileMenuOpen(false);
    setIsMenuOpen(!isMenuOpen)
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Job", path: "/job" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Hire Professional", path: "/hire" },
  ];

  const profileMenuItems = [
    { icon: FaUser, label: "Profile", 
      action: () => {
        setIsMenuOpen(false)
        setIsProfileMenuOpen(!isProfileMenuOpen)
        navigate("/profile");
    } },
  
      { icon: TbCategoryPlus, label: "Add Category", 
        action: () => {
          setIsMenuOpen(false)
          setIsProfileMenuOpen(!isProfileMenuOpen)
          navigate("/manage-category");
        } },
        { icon: SiApostrophe, label: "Create Post", 
          action: () => {
            setIsMenuOpen(false)
            setIsProfileMenuOpen(!isProfileMenuOpen)
            navigate("/create-post");
          } },
          { icon: MdOutlineManageHistory, label: "Old Post", 
            action: () => {
              setIsMenuOpen(false)
              setIsProfileMenuOpen(!isProfileMenuOpen)
              navigate("/old-post");
            } },
    { icon: FaSignOutAlt, label: "Logout", action: handleLogout },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800 cursor-pointer" onClick={()=>navigate("/")}>WorkNear</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
      

          {/* Notification & Profile Menu */}
          <div className="hidden md:flex items-center space-x-8">
         
            {!isLoggedIn ? (
              <button
                onClick={handleLoginRedirect}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              >
                Login
              </button>
            ) : (
              <div className="relative z-50">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user?.avatar || "https://via.placeholder.com/150"}
                    alt="Profile"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={()=>setIsMenuOpen(!isMenuOpen)}
              className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 w-[70%] items-center space-y-2 mr-5">
            {!isLoggedIn ? (
              <button
                onClick={handleLoginRedirect}
                className=" px-4 py-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              >
                Login
              </button>
            ) : (
              profileMenuItems.map((item) => (
                <button
                key={item.label}

                  onClick={item.action}
                  className="w-full flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
