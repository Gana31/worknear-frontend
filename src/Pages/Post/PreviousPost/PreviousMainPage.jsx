import { useState, useEffect } from "react";
import PreviousJobCard from "./PreviousJobCard";
import { toast } from "react-toastify";
import apiClient from "../../../Services/ApiConnector";
import VisualJobCard from "./VisualPost";
import LoadingSpinner from "../../../Component/Common/Spinner";
import { useNavigate } from "react-router-dom";

function PreviousMainPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [viewMode, setViewMode] = useState("traditional"); // State to toggle between "traditional" and "visual"
  const navigate = useNavigate();
  // Fetch jobs on page load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get("/getalluserposts"); // Replace with your correct API endpoint
        const fetchedJobs = response.data.data;
        const processedJobs = fetchedJobs.map((job) => {
          if (job.mode === "traditional" && job.skills) {
            // Split skills string into an array
            job.skills = job.skills.split(",").map((skill) => skill.trim());
          }
          return job;
        });

        setJobs(processedJobs);
      } catch (error) {
        toast.error("Failed to load posts. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty array means this will run once when the component mounts

  const handleEdit = (job) => {
    navigate("/create-post", { state: { job } }); 
  };

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the backend with the job id in the URL
      await apiClient.delete(`/deleteposts/${id}`); // Replace with your actual API endpoint for deletion

      // Remove the job from the local state
      setJobs(jobs.filter((job) => job.id !== id));

      toast.success("Job deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the job. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <div><LoadingSpinner/></div>; // You can display a loader here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toggle Buttons */}
        <div className="mb-6">
          <button
            onClick={() => setViewMode("traditional")}
            className={`px-4 py-2 mr-4 rounded-lg ${viewMode === "traditional" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Traditional View
          </button>
          <button
            onClick={() => setViewMode("visual")}
            className={`px-4 py-2 rounded-lg ${viewMode === "visual" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Visual View
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No jobs found</h3>
            </div>
          )}
          {jobs
            .filter((job) => job.mode === viewMode) // Filter jobs based on the selected view mode
            .map((job) => (
              viewMode === "traditional" ? (
                <PreviousJobCard
                  key={job.id}
                  job={job}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <VisualJobCard
                  key={job.id}
                  job={job}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            ))}
        </div>
      </main>
    </div>
  );
}

export default PreviousMainPage;
