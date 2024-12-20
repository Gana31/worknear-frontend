import React from 'react';
import { setLoading } from '../../Slices/authSlice';
import apiClient from '../../Services/ApiConnector';
import { toast } from 'react-toastify';

export const ApplyButton = ({ job }) => {
  
  
  const handleApply = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const response = await apiClient.post("/applyjob", { jobId:job.id });
      if(response.data.success){
        toast.success(response.data.message  || "job applied succesfully")
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <button
      onClick={handleApply}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
    >
      Apply Now
    </button>
  );
};