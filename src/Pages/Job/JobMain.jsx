import { JobCard } from "./JobCard";


const JOBS = [
  {
    company: 'TechCorp',
    position: 'Senior React Developer',
    location: 'San Francisco, CA',
    posted: '2 days ago',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop',
    description: 'We are looking for an experienced React developer to join our team and help build amazing web applications.',
  },
  {
    company: 'StartupX',
    position: 'Frontend Engineer',
    location: 'Remote',
    posted: '1 week ago',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop',
    description: 'Join our fast-growing startup and work on cutting-edge web technologies.',
  },
];

function JobMain() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {
        JOBS.map((job, index) => (
                <JobCard key={index} {...job} />
              ))
           }
        </div>
      </div>
    </div>
  );
}

export default JobMain;