import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaCut } from "react-icons/fa";
import api from "@/config/api";

export const SalonsPage = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const response = await api.get("/api/salon/allsalon");
      setSalons(response.data.salons); 
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch salons. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatOpeningHours = (hours) => {
    if (!hours || !hours.start || !hours.end) return "Hours not available";
    return `${hours.start} - ${hours.end}`;
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Card key={`skeleton-${index}`} className="w-full">
          <CardHeader>
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <div className="fixed top-4 w-full z-5">
        <Header />
      </div>
      <main className="min-h-screen bg-gradient-to-r from-[#FF6F61] to-[#FFC1B6] pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-white">
            Discover Salons Near You
          </h1>
          
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salons.map((salon) => (
                <Card key={salon._id} className="w-full hover:shadow-lg transition-shadow bg-red-200 bg-opacity-35">
                  <CardHeader>
                    <div className="h-[200px] w-full overflow-hidden rounded-t-lg bg-black">
                      {salon.images && salon.images.length > 0 ? (
                        <img
                          src={salon.images[0]}
                          alt={salon.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <CardTitle className="mt-4">{salon.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{salon.rating > 0 ? `${salon.rating}/5` : 'No ratings yet'}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>{salon.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <span>{salon.contactNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span>{formatOpeningHours(salon.openingHours)}</span>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <FaCut className="text-gray-400" />
                          Services:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {salon.services.map((service) => (
                            <div 
                              key={service._id}
                              className="text-xs p-2 bg-gray-50 rounded-md"
                            >
                              <p className="font-medium">{service.name}</p>
                              <p className="text-gray-500">₹ {service.price} /-</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = `/salon/${salon._id}`}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SalonsPage;