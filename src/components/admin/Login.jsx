import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PulseLoader from "react-spinners/PulseLoader";
import { jwtDecode } from 'jwt-decode';
import { setAdminDetails } from '../../features/adminSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password };
        console.log('Login data:', loginData);
        setEmail('');
        setPassword('');

        try {
            setLoading(true)
            console.log('login data', loginData);
            const res = await axiosInstance.post('/admin/login', loginData)
            console.log(res.data)
            const result = res.data
            if (result.success) {
                const token = result.token
                Cookies.set('authToken', token, { expires: 7 });

                const decodedToken = jwtDecode(token);
                console.log('decoded token is ', decodedToken)

                dispatch(setAdminDetails({ username: decodedToken.username, role: decodedToken.role }));
                navigate('/admin/dash')
                toast.success('Login Successful')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Something went wrong')
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className=" p-8 rounded-lg shadow-lg bg-white w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6  text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-semibold  mb-2">Email</label>
                        admin@gmail.com
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => (setEmail(e.target.value), setErrorMessage(''))}
                            required
                            placeholder="Enter your email"
                            className="w-full p-3 border  rounded-md "
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold  mb-2">Password</label>
                        password:123456
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => (setPassword(e.target.value), setErrorMessage(''))}
                            required
                            placeholder="Enter your password"
                            className="w-full p-3 border rounded-md   "
                        />
                    </div>
                    <div className='flex justify-center'>

                        <button type="submit" className="w-fit bg-gray-500 text-lightCream py-3 px-4 rounded-md hover:bg-darkGray transition duration-300">
                            {loading ? <PulseLoader size={9} color='#F4EEE0' /> : 'Login'}
                        </button>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-4">
                    New Admin?
                    <a href="/admin/signup" className="text-blue-500 hover:underline ml-1">Signup</a>
                </p>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;
