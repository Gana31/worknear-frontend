import React, { useEffect, useState } from "react";
import { FaBriefcase, FaCode, FaFileImage, FaClock, FaGlobe, FaTag, FaBuilding } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector, } from "react-redux";
import { createPost } from "../../Services/Operations/postoperation";
import { useLocation, useNavigate } from "react-router-dom";
function JobPostForm() {
    const coverPhoto =
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    const { user } = useSelector((state) => state.auth);
    const [mode, setMode] = useState("traditional"); // 'traditional' or 'visual'
    const location = useLocation();
    const usedispatch = useDispatch();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("")
    const [formData, setFormData] = useState({
        name: user.name || "",
        title: "",
        profilePicture: user.avatar || "",
        description: "",
        jobType: "Full-Time", // Full-Time, Part-Time, Contract
        jobMode: "Onsite", // Onsite, Remote, Hybrid
        skills: "",
        location: "",
        city: "",
        mobile: "",
        mode: mode,
        salary: "",
        postMode: "Draft",
    });
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({}); // State to track field errors


    useEffect(() => {
        // Check if we are in edit mode and prefill the form data if available
        if (location.state && location.state.job) {
            const job = location.state.job;
            setFormData({
                name: job.name || user.name,
                title: job.title || "",
                profilePicture: job.profilePicture || user.avatar,
                description: job.description || "",
                jobType: job.jobType || "Full-Time",
                jobMode: job.jobMode || "Onsite",
                skills: job.skills || "",
                location: job.location || "",
                city: job.city || "",
                mobile: job.mobile || "",
                mode: job.mode || "traditional",
                salary: job.salary || "",
                postMode: job.postMode || "Draft",
            });
            if(job.mode == "visual"){
                setImageUrl(job.image);
            }
            // Disable mode toggle in edit mode
            setMode(job.mode || "traditional");
        }
    }, [location.state, user]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: name === "mobile" ? value.slice(0, 10) : value, // Limit mobile to 10 digits
        }));

        // Validate inputs as the user types
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };


    const handleModeToggle = (newMode) => {
        setMode(newMode);
        setFormData((prev) => ({
            ...prev,
            mode: newMode,
        }));
        setErrors({});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageUrl(URL.createObjectURL(file))
            setImageFile(file); // Store the image file separately
        }
    };

    const handleQuillChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            description: value,
        }));

        // Clear description error if user types
        setErrors((prev) => ({
            ...prev,
            description: value ? "" : "Description is required.",
        }));
    };

    const validateField = (name, value) => {
        if (mode == "traditional") {
            switch (name) {
                case "title":
                    return value.trim() === "" ? "Job title is required." : "";
                case "mobile":
                    if (value.trim() === "") return "Mobile number is required.";
                    if (!/^\d{10}$/.test(value))
                        return "Mobile number must be exactly 10 digits.";
                    return "";
                case "skills":
                    return value.trim() === "" ? "Skills are required." : "";
                case "location":
                    return value.trim() === "" ? "Location is required." : "";
                case "city":
                    return value.trim() === "" ? "City is required." : "";
                case "salary":
                    return value.trim() === "" ? "Salary is required." : "";
                case "description":
                    return value.trim() === "" ? "Description is required." : "";
                default:
                    return "";
            }
        }
    };
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const form = new FormData();
            // Append form data to FormData object
            Object.keys(formData).forEach((key) => {
                form.append(key, formData[key]);
            });

            // Append the image file if it exists
            if (imageFile) {
                form.append("images", imageFile);
            }

            // Dispatch action to create post
            usedispatch(createPost(form, navigate)); // Sending FormData to the backend
            console.log("Form Data Submitted:", formData);
        } else {
            console.log("Validation Errors:", errors);
        }
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
                        <div >
                            <img
                                src={formData.profilePicture}
                                alt={formData.name}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0 cursor-pointer"

                            />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
                    </div>

                    {/* Job Post Form */}
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">  {location.state ? "Update Job Post" : "Create Job Post"}</h1>

                        {!location.state && (
                            <div className="flex text-sm md:text-lg space-x-4 mb-6">
                                <button
                                    onClick={() => handleModeToggle("traditional")}
                                    className={`px-4 py-2 rounded-lg ${mode === "traditional" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    Traditional Mode
                                </button>
                                <button
                                    onClick={() => handleModeToggle("visual")}
                                    className={`px-4 py-2 rounded-lg ${mode === "visual" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    Visual Mode
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Common Field: Description */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Post Mode</label>
                                <select
                                    name="postMode"
                                    value={formData.postMode}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="Onsite">Draft</option>
                                    <option value="Remote">Public</option>
                                </select>
                                {errors.postMode && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.postMode}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <ReactQuill
                                    value={formData.description}
                                    onChange={handleQuillChange}
                                    className="bg-gray-100 rounded-lg"
                                    placeholder="Write the job description here..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

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
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    maxLength={"10"}
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mumbai"
                                    className="w-full p-2 border rounded-lg"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.city}
                                    </p>
                                )}
                            </div>

                            {/* Traditional Mode */}
                            {mode === "traditional" && (
                                <>


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
                                            {errors.jobType && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.jobType}
                                                </p>
                                            )}
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
                                            {errors.jobMode && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.jobMode}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                                        <input
                                            type="number"
                                            name="mobile"
                                            maxLength={"10"}
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 123456789"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                        {errors.mobile && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.mobile}
                                            </p>
                                        )}
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
                                        {errors.skills && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.skills}
                                            </p>
                                        )}
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
                                        {errors.location && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.location}
                                            </p>
                                        )}
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
                                        {errors.salary && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.salary}
                                            </p>
                                        )}
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
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="mt-4 w-full max-w-sm rounded-lg shadow-lg"
                                        />
                                    )}
                                    {errors.imageUrl && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.imageUrl}
                                        </p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                {location.state ? "Update Post" : "Submit Post"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobPostForm;
