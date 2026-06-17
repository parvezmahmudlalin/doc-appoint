import { h1 } from 'framer-motion/client';
import React from 'react';

const DoctorsPage = async() => {
    const res = await fetch('http://localhost:5000/doctors');
    const doctors = await res.json();

    console.log(doctors)
    return (
        <div>
            <h1>All Doctors</h1>

            <div>
                {
                    doctors.map(doctors => <h1 key={doctors._id}>{doctors.name}</h1>)
                }
            </div>
        </div>
    );
};

export default DoctorsPage;