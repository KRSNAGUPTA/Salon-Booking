import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Trash2, PlusCircle } from "lucide-react";
import Header from "@/components/Header";
import api from "@/config/api";
import { useAuth } from "@/contexts/authContext";

const SalonRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {user} = useAuth()

  const [salonData, setSalonData] = useState({
    salonName: "",
    address: "",
    contactNumber: "",
    services: [{ name: "", price: "", duration: "" }],
    openingHours: "",
    images: [],
  });
  useEffect(()=>{
    if (user?.role === "salon_owner"){
        navigate("/salon/dashboard")
    }
  },[])

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...salonData.services];
    updatedServices[index][name] = value;
    setSalonData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const addService = () => {
    setSalonData((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", price: "", duration: "" }],
    }));
  };

  const removeService = (index) => {
    const updatedServices = salonData.services.filter((_, i) => i !== index);
    setSalonData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSalonData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    const updatedImages = salonData.images.filter((_, i) => i !== index);
    setSalonData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!salonData.salonName.trim()) {
      newErrors.salonName = "Salon Name is required";
    }
    if (!salonData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!salonData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required";
    }
    if (
      salonData.services.length === 0 ||
      salonData.services.some(
        (service) =>
          !service.name.trim() ||
          !service.price.trim() ||
          !service.duration.trim()
      )
    ) {
      newErrors.services = "At least one complete service is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await api.post("/api/salon/register", salonData);
      if (res.status == 201) {
        toast({
          title: "Registration Successful",
          description: "Your salon has been registered!",
        });
        navigate("/salon/dashboard")
      }else{
        toast({
          title: "Registration Failed",
          description: `${res.response.data.message}`,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please check the form and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF6F61] to-[#FFC1B6] flex items-center justify-center p-6">
      <div className="fixed top-4  w-full z-5">
        <Header />
      </div>
      <Toaster />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-[#FF6F61]">
            Register Your Salon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Salon Name *</Label>
                <Input
                  name="salonName"
                  value={salonData.salonName}
                  onChange={handleInputChange}
                  placeholder="Enter salon name"
                  className={errors.salonName ? "border-red-500" : ""}
                />
                {errors.salonName && (
                  <p className="text-red-500 text-sm">{errors.salonName}</p>
                )}
              </div>
              <div>
                <Label>Contact Number *</Label>
                <Input
                  name="contactNumber"
                  value={salonData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className={errors.contactNumber ? "border-red-500" : ""}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Address *</Label>
              <Input
                name="address"
                value={salonData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div>
              <Label>Opening Hours</Label>
              <div className="flex justify-between ">
                <Input
                  value={salonData.openingHours}
                  name="openingHours"
                  onChange={handleInputChange}
                  placeholder="mon-sat: 09:00-18:00"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Services *</Label>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addService}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </div>
              {salonData.services.map((service, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <Input
                    name="name"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, e)}
                    placeholder="Service Name"
                    required
                  />
                  <Input
                    name="price"
                    value={service.price}
                    onChange={(e) => handleServiceChange(index, e)}
                    placeholder="Price"
                    type="number"
                    required
                  />
                  <div className="flex">
                    <Input
                      name="duration"
                      value={service.duration}
                      onChange={(e) => handleServiceChange(index, e)}
                      placeholder="Duration (mins)"
                      type="number"
                      required
                    />
                    {salonData.services.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="ml-2"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {errors.services && (
                <p className="text-red-500 text-sm">{errors.services}</p>
              )}
            </div>

            

            <Button
              type="submit"
              className="w-full bg-[#FF6F61] hover:bg-[#FFC1B6]"
            >
              Register Salon
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonRegistration;
