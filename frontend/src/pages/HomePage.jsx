import Header from "@/components/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/authContext";
import { PopoverContent } from "@radix-ui/react-popover";
import React from "react";
import { FaStar, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <div className="fixed top-4  w-full z-5">
        <Header />
      </div>
      <Toaster />
      <section className="bg-gradient-to-r from-[#FF6F61] to-[#FFC1B6] min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center lg:gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Book Your Next Salon Appointment in Seconds!
              </h1>
              <h3 className="text-lg md:text-xl lg:text-2xl text-white mb-8">
                Find trusted salons, compare services, and book hassle-free from
                the comfort of your home.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <button
                  className="px-6 py-3 bg-white text-[#FF6F61] font-semibold rounded shadow hover:bg-[#FFC1B6] transition duration-200"
                  onClick={() => navigate("/salon")}
                >
                  Explore Salons
                </button>
                {user?.role !== "salon_owner" ? (
                      <button onClick={()=>navigate("/salon/register")} className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-[#FF6F61] transition duration-200">
                        Register Your Salon
                      </button>
                    
                ) : (
                  <div>Dashboard</div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-white justify-center lg:justify-start">
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  <span>Trusted by 10,000+ Users</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2" />
                  <span>Top-rated Salons</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                <img
                  src="/salon.png"
                  alt="Salon scene"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Search for Top Salons",
                description:
                  "Use advanced filters to find the perfect salon for you.",
              },
              {
                title: "Easy Online Booking",
                description: "Book instantly from anywhere, anytime.",
              },
              {
                title: "Trusted Reviews & Ratings",
                description: "Read genuine feedback from happy customers.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#FF6F61]">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
