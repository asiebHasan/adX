import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout, fetchProfile, checkTokenExpiration } from "../features/auth/authSlice";

export default function Layout({ children }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Layout useEffect triggered');
    console.log('Current token:', token);

    if (!token) {
      console.log('No token found, redirecting to login...');
      navigate('/login');
      toast.error('No token found. Please log in.');
      return;
    }

    const verifyToken = async () => {
      try {
        console.log('Verifying token...');
        await dispatch(checkTokenExpiration()).unwrap();
        await dispatch(fetchProfile()).unwrap();
        console.log('Profile fetched successfully');
      } catch (error) {
        console.error('Error verifying token:', error);
        dispatch(logout());
        navigate('/login');
        toast.error('Session expired. Please log in again.');
      }
    };

    verifyToken();
  }, [token, dispatch, navigate]);

  const handleLogout = async (e) => {
    try {
      console.log('Logging out...');
      await dispatch(logout()).unwrap();
      navigate('/login');
      toast.success('Logout Successful!');
    } catch (err) {
      console.log('something went wrong with logout', err);
    }
  };

  return (
    <div className="h-screen w-full bg-white relative flex overflow-hidden">
      {/* Sidebar */}
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-linear-to-t from-[#020224] to-[#474a91] bg-cover bg-no-repeat text-white">
        {/* Sidebar Content */}
        {/* Add your sidebar elements here */}
      </aside>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col justify-between">
        {/* Header */}
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-linear-to-l from-[#020224] to-[#474a91] bg-cover bg-no-repeat">
          {/* User info and logout button */}
          <div className="flex flex-shrink-0 items-center space-x-4 text-white">
            <div className="flex flex-col items-end">
              <div className="text-md font-medium">{user?.email}</div>
              <div className="text-sm font-regular">{user?.role}</div>
            </div>

            {/* Profile image placeholder */}
            <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>

            {/* Logout Button */}
            <button
              className="group flex items-center justify-start w-11 h-11 bg-yellow-400 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                  ></path>
                </svg>
              </div>
              <div
                className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                Logout
              </div>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-full h-full flex relative overflow-y-hidden bg-gradient-to-bl from-[#FFD080] to-[#E39529] bg-cover bg-no-repeat">
          {children}
        </main>
      </div>
    </div>
  );
}
