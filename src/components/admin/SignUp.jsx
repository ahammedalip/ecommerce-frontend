import { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import axiosInstance from "../../axios/api";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        try {
            setLoading(true)
            const res = await axiosInstance.post('/admin/signup', data)
            const result = res.data
            if (result.success) {
                setLoading(false)
                toast.success('Signup Succesful')
                navigate('/admin/login')
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Something went wrong')
            toast.error('Something went wrong')
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Signup</h2>

                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format",
                            },
                        })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">

                    <button
                        type="submit"
                        className="bg-gray-500 text-white p-2 w-fit rounded hover:bg-gray-800"
                    >
                        {loading ? <PulseLoader size={7} color='#F4EEE0' /> : 'Sign Up'}
                    </button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                    <a href="/admin/login" className="text-blue-500 hover:underline ml-1">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
