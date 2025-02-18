import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout, fetchProfile, checkTokenExpiration } from "../features/auth/authSlice";
import adx from '../assets/adX.png';

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
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-linear-to-t  from-zinc-900 via-stone-600 to-zinc-900 bg-cover bg-no-repeat text-white">
        {/* Sidebar Content */}
        {/* Add your sidebar elements here */}
        <button className="flex p-2 hover:bg-blue-300 rounded">
          <svg
            className="icon"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
            ></path>
          </svg>
        </button>
        <button className="flex p-2 hover:bg-blue-300 rounded">
          <svg
            className="icon"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <button className="flex p-2 hover:bg-blue-300 rounded">
          <svg
            className="icon"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
            ></path>
          </svg>
        </button>

        <button className="flex p-2 hover:bg-blue-300 rounded">
          <svg
            className="icon"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
            ></path>
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col justify-between">
        {/* Header */}
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-linear-to-l from-zinc-900 via-stone-600 to-zinc-900 bg-cover bg-no-repeat">
          {/* User info and logout button */}
          <div className="flex flex-shrink-0 items-center space-x-4 text-[#D4AF37]">
            <div className="flex flex-col items-end">
              <div className="text-md font-medium">{user?.email}</div>
              <div className="text-sm font-regular">{user?.role}</div>
            </div>

            {/* Profile image placeholder */}
            <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>

            {/* Logout Button */}
            <button
              className="group flex items-center justify-start w-11 h-11 bg-[#D4AF37] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="D4AF37">
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
        <main className="max-w-full h-full flex relative overflow-y-hidden bg-stone-200 bg-no-repeat">
          {children}
        </main>
      </div>
    </div>
  );
}
