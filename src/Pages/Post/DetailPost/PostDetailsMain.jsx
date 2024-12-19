import React, { useEffect, useState } from 'react';
import JobDetails from './PostDetailsPage';
import { useLocation } from 'react-router-dom';


function PostDetailsMain() {
    const [job , SetJob] = useState("");
    const location = useLocation();
    useEffect(()=>{
        if (location.state && location.state.job) {
            const job = location.state.job;
           SetJob(job);
        }
    },[location.state])
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-8">
        <JobDetails job={job}/>
      </main>
    </div>
  );
}

export default PostDetailsMain;