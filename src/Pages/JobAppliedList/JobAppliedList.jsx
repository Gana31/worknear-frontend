import React, { useEffect, useState } from 'react';
import { TbDeviceVisionProFilled } from 'react-icons/tb';
import { StatusTabs } from './StatusTabs';
import { ApplicationTable } from './ApplicationStatus';
import { ApplicationCards } from './ApplicatonCard';
import { FcList } from 'react-icons/fc';
import apiClient from '../../Services/ApiConnector';
import { setLoading } from '../../Slices/authSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function JobAppliedList() {
    const location = useLocation();
    const [applications, setApplications] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('pending');
    const { jobid ,job} = location.state || {};
    const handleStatusChange = async (id, status,email) => {
        try {
            const response = await apiClient.put(`/applicationstatusChange/${id}`, { status :status , jobTitle : job.title , companyName : job.name,userEmail:email});
            if (response.data.success) {
                toast.success("Status updated successfully!");

                // Update the specific application's status in the local state
                setApplications((prevApplications) =>
                    prevApplications.map((app) =>
                        app.id === id ? { ...app, status } : app
                    )
                );
            } else {
                toast.error("Failed to update status. Please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating the status.");
        }
    };

    useEffect(() => {
        if (jobid) {
            const fetchApplications = async () => {
                setLoading(true);
                try {
                    const response = await apiClient.get(`/jobapplication/${jobid}`);
                    if (response.data.success) {
                        setApplications(response.data.data);
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || "Failed to load posts. Please try again later.");
                } finally {
                    setLoading(false);
                }
            };
            fetchApplications();
        }
    }, [jobid]);

    const filteredApplications = applications.filter((app) => app.status === currentStatus);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FcList className="w-8 h-8 " />
                    <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
                </div>

                <StatusTabs 
                    currentStatus={currentStatus}
                    onStatusChange={setCurrentStatus}
                />

                <ApplicationTable 
                    applications={filteredApplications}
                    onStatusChange={handleStatusChange}
                />

                <ApplicationCards
                    applications={filteredApplications}
                    onStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
}


export default JobAppliedList;