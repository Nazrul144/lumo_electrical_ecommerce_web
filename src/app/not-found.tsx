import BtnLink from '@/components/shared/BtnLink';
import React from 'react';

const NotFound = () => {
    return (
        <div className='flex flex-col gap-5 justify-center items-center h-screen'>
            <h1 className='text-4xl'><span className='text-red-700'>404</span> Page Not Found</h1>
            <BtnLink text='Back to Home' link='/'/>
        </div>
    );
};

export default NotFound;