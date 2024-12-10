import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Slices/authSlice.js";
import LoadingSpinner from "../../Component/Common/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { login, Register } from "../../Services/Operations/authoperation.js";

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "User", // Default to "organization"
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Validation function
    const validate = () => {
        const newErrors = {};
        if (isSignUp && !formValue.name) {
            newErrors.name = "Please enter a full name.";
        }
        if (!formValue.email || !/\S+@\S+\.\S+/.test(formValue.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (formValue.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }
        if (isSignUp && !formValue.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        }
        if (isSignUp && formValue.password !== formValue.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        dispatch(setLoading(true));
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        isSignUp
            ? dispatch(
                Register(
                    {
                        name: formValue.name,
                        email: formValue.email,
                        password: formValue.password,
                        account_type: formValue.accountType,
                    },
                    navigate
                )
            )
            : dispatch(
                login(
                    { email: formValue.email, password: formValue.password },
                    navigate
                )
            );
    }

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValue((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleAccountTypeChange = (type) => {
        setFormValue((prev) => ({ ...prev, accountType: type }));
    };

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center dark:bg-white">
            <div
                className={`grid transition-all duration-500 ${isSignUp ? "h-[100vh]" : "h-[60vh]"
                    }`}
            >
                <div
                    id="back-div"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
                >
                    <div className="border-[20px] border-transparent rounded-[20px] dark:bg-white bg-white shadow-lg p-6 sm:p-2 m-2">
                        <h1
                            className={`pb-4 font-bold dark:text-black text-center cursor-default ${isSignUp ? "text-3xl" : "text-5xl"
                                }`}
                        >
                            {isSignUp ? "Sign Up" : "Log In"}
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignUp && (
                                <>
                                    <div className="flex justify-center items-center space-x-4 mb-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAccountTypeChange("User")}
                                            className={`bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out ${formValue.accountType === "User" ? "opacity-100" : "opacity-50"
                                                }`}
                                        >
                                            Organization
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAccountTypeChange("Worker")}
                                            className={`bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out ${formValue.accountType === "Worker" ? "opacity-100" : "opacity-50"
                                                }`}
                                        >
                                            Worker
                                        </button>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 dark:text-black text-lg"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            className={`border p-3 dark:bg-white dark:text-black shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.name
                                                    ? "border-red-500"
                                                    : "dark:border-gray-700"
                                                }`}
                                            type="text"
                                            placeholder="Full Name"
                                            value={formValue.name}
                                            onChange={handleInputChange}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs">{errors.name}</p>
                                        )}
                                    </div>
                                </>
                            )}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 dark:text-black text-lg"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    className={`border p-3 dark:bg-white dark:text-black shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.email ? "border-red-500" : "dark:border-gray-700"
                                        }`}
                                    type="email"
                                    placeholder="Email"
                                    value={formValue.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 dark:text-black text-lg"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    className={`border p-3 shadow-md dark:bg-white dark:text-black placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.password ? "border-red-500" : "dark:border-gray-700"
                                        }`}
                                    type="password"
                                    placeholder="Password"
                                    value={formValue.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs">{errors.password}</p>
                                )}
                            </div>
                            {isSignUp && (
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 dark:text-black text-lg"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        className={`border p-3 shadow-md dark:bg-white dark:text-black placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.confirmPassword
                                                ? "border-red-500"
                                                : "dark:border-gray-700"
                                            }`}
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={formValue.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            )}
                            <button
                                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoadingSpinner color={"white"} />
                                ) : isSignUp ? (
                                    "SIGN UP"
                                ) : (
                                    "LOG IN"
                                )}
                            </button>
                        </form>
                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            {isSignUp ? (
                                <p
                                    className="group text-black transition-all duration-100 ease-in-out cursor-pointer"
                                    onClick={toggleSignUp}
                                >
                                    Already have an account?{" "}
                                    <span className="bg-left-bottom text-blue-400 bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Log In
                                    </span>
                                </p>
                            ) : (
                                <p
                                    className="group text-black transition-all duration-100 ease-in-out cursor-pointer"
                                    onClick={toggleSignUp}
                                >
                                    Don't have an account?{" "}
                                    <span className="bg-left-bottom text-blue-400 bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Sign Up
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
