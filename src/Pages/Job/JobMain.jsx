import React, { useEffect, useMemo, useState } from "react";
import { Filters } from "./Filter";
import { ViewToggle } from "./ToggleView";
import JobCard from "./JobCard";
import { toast } from "react-toastify";
import apiClient from "../../Services/ApiConnector";

function JobMain() {
  const [viewMode, setViewMode] = useState("normal"); // "normal" for traditional posts, "instagram" for visual posts
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [salaryRange, setSalaryRange] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [jobs, setJobs] = useState([]); // Store all jobs fetched from the API
  const [loading, setLoading] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(true); // State to control filter visibility

  // Fetch jobs from API
  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await apiClient.get("/getallpublicposts");
        const fetchedJobs = response.data.data;
        setJobs(fetchedJobs); // Save the fetched jobs to state
      } catch (error) {
        toast.error("Failed to load posts. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Filtered jobs based on `viewMode`
  const filteredJobs = useMemo(() => {
    const filteredByViewMode = jobs.filter((job) => {
      if (viewMode === "normal") return job.mode !== "visual"; // Traditional posts
      if (viewMode === "instagram") return job.mode === "visual"; // Visual posts
      return true;
    });

    // Apply additional filters (location, salary, date)
    return filteredByViewMode.filter((job) => {
      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(job.city)) {
        return false;
      }

      // Salary filter
      if (salaryRange) {
        const [min, max] = salaryRange.split("-").map(Number);
        if (max) {
          if (job.salary < min || job.salary > max) return false;
        } else {
          if (job.salary < min) return false;
        }
      }

      // Date filter
      if (dateFilter) {
        const jobDate = new Date(job.createdAt);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - jobDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case "today":
            if (diffDays > 1) return false;
            break;
          case "week":
            if (diffDays > 7) return false;
            break;
          case "month":
            if (diffDays > 30) return false;
            break;
        }
      }

      return true;
    });
  }, [jobs, viewMode, selectedLocations, salaryRange, dateFilter]);

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Board</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="md:w-1/4">
            {/* Toggle button */}
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Filters section */}
            {filtersVisible && (
              <Filters
                locations={Array.from(new Set(jobs.map((job) => job.city)))}
                selectedLocations={selectedLocations}
                onLocationChange={handleLocationChange}
                onSalaryChange={setSalaryRange}
                onDateChange={setDateFilter}
              />
            )}
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />

            <div
              className={`grid gap-6 ${
                viewMode === "instagram" ? "grid-cols-1" : "grid-cols-1"
              }`}
            >
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobMain;
