"use client";

import DoctorCard from '@/components/doctors/DoctorCard';
import { authClient } from '@/lib/auth-client';
import React, { useMemo, useState, useEffect } from 'react';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    // Search state added
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            const { data: tokenData } = await authClient.token();

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );

                const data = await res.json();
                setDoctors(data);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const categories = useMemo(() => {
        const unique = [
            ...new Set(
                doctors
                    .map((d) => d.specialty)
                    .filter(Boolean)
            ),
        ];

        return ['All', ...unique.sort()];
    }, [doctors]);

    // Updated filter with search
    const filteredDoctors = useMemo(() => {
        let filtered = doctors;

        // Category filter
        if (activeCategory !== 'All') {
            filtered = filtered.filter(
                (d) => d.specialty === activeCategory
            );
        }

        // Doctor name search
        if (searchTerm.trim()) {
            filtered = filtered.filter((d) =>
                d.name
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [doctors, activeCategory, searchTerm]);

    return (
        <div className='max-w-7xl mx-auto my-3 p-3'>
            <h1 className='font-bold text-3xl'>
                All Doctors
            </h1>

            {/* Search */}
            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Search by doctor name..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="w-full md:w-96 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-slate-400"
                />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-6 mb-8">
                {categories.map((cat) => {
                    const isActive =
                        activeCategory === cat;

                    return (
                        <button
                            key={cat}
                            onClick={() =>
                                setActiveCategory(cat)
                            }
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                isActive
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {loading ? (
                <p className="text-slate-500">
                    Loading doctors...
                </p>
            ) : filteredDoctors.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl py-20 px-6 text-center">
                    <p className="text-slate-800 font-semibold text-lg">
                        No doctors found
                    </p>

                    <p className="text-slate-500 text-sm mt-2">
                        Try searching with another doctor
                        name or selecting a different
                        category.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorsPage;