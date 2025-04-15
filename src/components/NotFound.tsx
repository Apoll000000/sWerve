// components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
            <h1 className='font-[800] text-2xl text-red-500'>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/home" className='hover:underline text-green-500'>Go to Homepage</Link>
        </div>
    );
}

export default NotFound;