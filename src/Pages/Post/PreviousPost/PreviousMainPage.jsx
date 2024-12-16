import { useState } from "react";
import PreviousJobCard from "./PreviousJobCard";


  function PreviousMainPage() {
    const jobs = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&auto=format',
          location: 'San Francisco, CA',
          salary: '$120,000 - $150,000',
          type: 'Full-time',
          postedDate: '2024-03-15',
          description: 'Looking for an experienced frontend developer with React expertise.',
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
        },
        {
          id: 2,
          title: 'Backend Engineer',
          company: 'DataFlow Systems',
          companyLogo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&auto=format',
          location: 'Remote',
          salary: '$100,000 - $130,000',
          type: 'Full-time',
          postedDate: '2024-03-14',
          description: 'Join our team to build scalable backend solutions.',
          skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker']
        },
        {
          id: 3,
          title: 'UI/UX Designer',
          company: 'Creative Studios',
          companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&auto=format',
          location: 'New York, NY',
          salary: '$90,000 - $110,000',
          type: 'Full-time',
          postedDate: '2024-03-13',
          description: 'Create beautiful and intuitive user interfaces for our products.',
          skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping']
        }
      ];

      const [job, setJobs] = useState(jobs);

      const handleEdit = (job) => {
        // Implement edit functionality
        console.log('Editing job:', job);
      };
    
      const handleDelete = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
      };
    return (
        <div className="min-h-screen bg-gray-50">
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-6">
            {job.map((job) => (
              <PreviousJobCard
                key={job.id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
  
          {jobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No jobs found</h3>
            </div>
          )}
        </main>
      </div>
    )
  }

  export default PreviousMainPage
  