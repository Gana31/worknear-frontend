import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filters } from "./Filter";
import { ViewToggle } from "./ToggleView";
import JobCard from "./JobCard";
import { toast } from "react-toastify";
import apiClient from "../../Services/ApiConnector";
import LoadingSpinner from "../../Component/Common/Spinner";
import SearchBar from "../../Component/Common/Searchbar";

function JobMain() {
  const [viewMode, setViewMode] = useState("normal");
  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for category
  const [dateFilter, setDateFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [searchParams] = useSearchParams();

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiClient.get("/getallpublicposts", { params });
      const fetchedJobs = response.data.data;
      // console.log(response.data.data)
      setJobs(fetchedJobs);
    } catch (error) {
      toast.error("Failed to load posts. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keywords = searchParams.get("keywords") || "";
    const location = searchParams.get("location") || "";

    const initialSearchParams = {};
    if (keywords) initialSearchParams.keywords = keywords;
    if (location) initialSearchParams.location = location;

    fetchJobs(initialSearchParams);
  }, [searchParams]);

  const handleSearch = async ({ keywords, location }) => {
    const searchParams = {};
    if (keywords) searchParams.keywords = keywords;
    if (location) searchParams.location = location;

    // Update URL search parameters
    const queryParams = new URLSearchParams(searchParams).toString();
    window.history.pushState(null, "", `/job?${queryParams}`);

    await fetchJobs(searchParams);
  };

  const filteredJobs = useMemo(() => {
    const filteredByViewMode = jobs.filter((job) => {
      if (viewMode === "normal") return job.mode !== "visual";
      if (viewMode === "instagram") return job.mode === "visual";
      return true;
    });

    return filteredByViewMode.filter((job) => {
      if (selectedLocations && selectedLocations !== "" && job.city !== selectedLocations) {
        return false;
      }

      if (selectedCategory && selectedCategory !== "" && job.category !== selectedCategory) {
        return false; // Filter jobs based on the selected category
      }

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
  }, [jobs, viewMode, selectedLocations, selectedCategory, dateFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-100 lg:w-[100%] flex justify-center items-center text-center py-6">
        <div className="w-full px-3 lg:w-[60%]">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">Job Board</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </button>
            {filtersVisible && (
              <Filters
                locations={Array.from(new Set(jobs.map((job) => job.city)))}
                categories={Array.from(new Set(jobs.map((job) => job.category)))}
                selectedLocations={selectedLocations}
                selectedCategory={selectedCategory} // Pass selected category to Filters
                onLocationChange={setSelectedLocations}
                onCategoryChange={setSelectedCategory} // Pass function to update category
                onDateChange={setDateFilter}
              />
            )}
          </div>
          <div className="md:w-3/4">
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            <div className="grid gap-6">
              {filteredJobs.length === 0 ? (
                <div className="flex justify-center items-center text-gray-500 text-xl">
                  No posts available
                </div>
              ) : (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} viewMode={viewMode} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobMain;
