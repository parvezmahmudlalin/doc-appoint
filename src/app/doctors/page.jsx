import DoctorCard from '@/components/doctors/DoctorCard';
import { h1 } from 'framer-motion/client';
import React from 'react';

const DoctorsPage = async() => {
    const res = await fetch('http://localhost:5000/doctors');
    const doctors = await res.json();

    
    return (
        <div>
            <h1>All Doctors</h1>

           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    doctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor}/>)
                }
            </div>
        </div>
    );
};

export default DoctorsPage;