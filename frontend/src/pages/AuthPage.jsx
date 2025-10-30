import React, { useState } from 'react';
import { User, Mail, Lock, ShoppingBag, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUserDetails } from '../redux/store/productStore';
import { apiConnector } from '../services/apiConnector';
import { authEndpoints } from '../services/apis';
import {toast} from "react-toastify"
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';
export default function AuthPage() {
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.product.loading)
    const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try{
        if (isLogin) {
            dispatch(setLoading(true))
            const result = await apiConnector("POST",authEndpoints.LOGIN,formData)
            dispatch(setUserDetails(result?.data?.existingUser))
            localStorage.setItem("token",result?.data?.token)
            toast.success(result?.data?.message)
            dispatch(setLoading(false))
            navigate("/")
        } else {
            dispatch(setLoading(true))
            const result = await apiConnector("POST",authEndpoints.SIGN_UP,formData)
            toast.success(result?.data?.message)
            dispatch(setLoading(false))
            setIsLogin(true)
        }
    }
    catch(error){
        console.log("Error in auth : ",error)
        dispatch(setLoading(false))
        toast.error(error?.response?.data?.message || error.message || "Error in authentication")
    }

  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setShowPassword(false);
  };
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-48 -right-48 animate-pulse delay-700"></div>
        <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-1000"></div>
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
            <ShoppingBag className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Vibe Commerce</h1>
          <p className="text-purple-100 text-lg">Your Ultimate Shopping Destination</p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex bg-gray-50">
            <button
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-4 text-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-4 text-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Section */}
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600 text-center">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Fill in your details to get started'}
              </p>
            </div>

            <div className="space-y-5">
              {/* Name Field (Only for Signup) */}
              {!isLogin && (
                <div className="transform transition-all duration-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-gray-200 focus:border-purple-500'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-purple-500'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-purple-500'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                type='submit'
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>{isLogin ? 'Login' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white text-sm mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleMode}
            className="font-bold underline hover:text-purple-200 transition-colors"
          >
            {isLogin ? 'Sign up now' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}