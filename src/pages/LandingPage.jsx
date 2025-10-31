import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Forms Clone</h1>
                <p className="text-gray-600 text-center mb-8">
                    Create forms Publish them. Get responses.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link to="/register">
                        <button className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Register
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
