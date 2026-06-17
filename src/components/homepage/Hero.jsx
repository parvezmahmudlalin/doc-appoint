"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Stethoscope } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Book Appointments With Trusted Doctors",
    description:
      "Find experienced specialists and schedule appointments in just a few clicks.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600",
    alt: "Doctor consulting with patient in modern clinic",
  },
  {
    title: "Healthcare Made Simple & Accessible",
    description:
      "Connect with qualified doctors and manage your appointments effortlessly.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600",
    alt: "Medical team discussing patient care",
  },
  {
    title: "Your Health, Our Priority",
    description:
      "Get quality healthcare services and book appointments anytime, anywhere.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600",
    alt: "Professional doctor providing healthcare service",
  },
];

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-lg relative">
      {/* Background Glow Effects */}
      <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop
        className="rounded-sm"
        aria-label="Hero slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[620px] md:min-h-[720px] lg:min-h-[750px]">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />

              {/* Content */}
              <div className="relative z-10 mx-auto flex min-h-[620px] md:min-h-[720px] lg:min-h-[750px] max-w-7xl items-center px-6 lg:px-10">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-3xl text-white"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2.5 text-sm backdrop-blur"
                  >
                    <Stethoscope className="h-4 w-4" />
                    Trusted Healthcare Platform
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg"
                  >
                    {slide.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex flex-wrap gap-4"
                  >
                    <Link
                      href="/doctors"
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 hover:scale-[1.03] active:scale-95"
                    >
                      <Stethoscope className="h-5 w-5" />
                      Find a Doctor
                      <ArrowRight className="h-5 w-5" />
                    </Link>

                    <Link
                      href="/appointments"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:scale-[1.03] active:scale-95"
                    >
                      <Calendar className="h-5 w-5" />
                      Book Appointment
                    </Link>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-xl"
                  >
                    {[
                      { number: "50+", label: "Expert Doctors" },
                      { number: "10K+", label: "Happy Patients" },
                      { number: "24/7", label: "Support" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className="transition"
                      >
                        <h3 className="text-3xl font-bold sm:text-4xl">
                          {stat.number}
                        </h3>
                        <p className="mt-1 text-sm text-gray-300">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}