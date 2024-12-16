import React, { useState } from "react";
import { FaBriefcase, FaCode, FaFileImage, FaClock, FaGlobe, FaTag, FaBuilding } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function JobPostForm() {
    const coverPhoto =
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    const companyName = "TechCorp"; // Replace with dynamic data if needed

    const [mode, setMode] = useState("traditional"); // 'traditional' or 'visual'
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        jobType: "Full-Time", // Full-Time, Part-Time, Contract
        jobMode: "Onsite", // Onsite, Remote, Hybrid
        skills: "",
        location: "",
        salary: "",
        tags: "",
        postMode: "Draft",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: URL.createObjectURL(file),
            }));
        }
    };

    const handleQuillChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            description: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Submit the formData to an API or state management
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Photo */}
            <div className="relative h-48 md:h-64 lg:h-80">
                <img
                    src={coverPhoto}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>

            {/* Job Post Form Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
                    {/* Company Icon and Name */}
                    <div className="flex items-center mb-6 space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <FaBuilding size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{companyName}</h2>
                    </div>

                    {/* Job Post Form */}
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>

                        {/* Toggle Between Modes */}
                        <div className="flex text-sm md:text-lg space-x-4 mb-6">
                            <button
                                onClick={() => setMode("traditional")}
                                className={`px-4 py-2 rounded-lg ${mode === "traditional" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Traditional Mode
                            </button>
                            <button
                                onClick={() => setMode("visual")}
                                className={`px-4 py-2 rounded-lg ${mode === "visual" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Visual Mode
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Common Field: Description */}
                            <div className="mb-4">
                                            <label className="block text-sm font-semibold mb-2">Post Mode</label>
                                            <select
                                                name="jobMode"
                                                value={formData.postMode}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg"
                                            >
                                                <option value="Onsite">Draft</option>
                                                <option value="Remote">Public</option>
                                            </select>
                                        </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <ReactQuill
                                    value={formData.description}
                                    onChange={handleQuillChange}
                                    className="bg-gray-100 rounded-lg"
                                    placeholder="Write the job description here..."
                                />
                            </div>

                            {/* Traditional Mode */}
                            {mode === "traditional" && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">Job Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Frontend Developer"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Job Type</label>
                                            <select
                                                name="jobType"
                                                value={formData.jobType}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg"
                                            >
                                                <option value="Full-Time">Full-Time</option>
                                                <option value="Part-Time">Part-Time</option>
                                                <option value="Contract">Contract</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Job Mode</label>
                                            <select
                                                name="jobMode"
                                                value={formData.jobMode}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg"
                                            >
                                                <option value="Onsite">Onsite</option>
                                                <option value="Remote">Remote</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">Skills Required</label>
                                        <input
                                            type="text"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleInputChange}
                                            placeholder="e.g., JavaScript, React, Node.js"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g., San Francisco, CA"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">Salary Range</label>
                                        <input
                                            type="text"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                            placeholder="e.g., $80,000 - $120,000"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">Tags (Comma Separated)</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            placeholder="e.g., frontend, javascript, react"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>
                                    
                                </>
                            )}

                            {/* Visual Mode */}
                            {mode === "visual" && (
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-2">Add Image</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="mt-4 w-full max-w-sm rounded-lg shadow-lg"
                                        />
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Submit Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobPostForm;
