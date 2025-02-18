import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds } from '../features/ads/adsSlice';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Dashboard() {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads.ads);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAds());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <h1>Dashboard</h1>
      <div className='grid grid-cols-3 gap-2'>
        {ads.map((ad) => (
          <div key={ad.id} className="flex flex-col bg-white w-72 h-48 rounded-md py-4 px-6 border">
            <h3 className="text-center font-bold text-xl text-gray-800 pb-2">${ad.id}</h3>
            <h3 className="text-base font-semibold text-gray-900">{ad.title}</h3>
            <p className="text-sm text-gray-500 pb-3">{ad.ad_type}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;
