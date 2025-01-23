import Header from "@/components/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "@/config/api";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "salon_owner") {
      navigate("/login");
    } else {
      fetchAppointments();
    }
  }, [user, navigate]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/salon/appointment/view");
      setAppointments(response.data.appointment);
    } catch (error) {
      console.error(error);
      toast({
        title:"Failed to fetch Salon Data",
        variant:"destructive"
      })
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `/api/appointments/${appointmentId}/handle`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert(response.data.message);
      fetchAppointments(); // Refresh the list after handling
    } catch (error) {
      console.error("Error updating appointment status:", error.message);
    }
  };

  return (
    <>
      <div className="fixed top-4 w-full z-5">
        <Header />
      </div>
      <Toaster />
      <section className="bg-gradient-to-r from-[#FF6F61] to-[#FFC1B6] min-h-screen py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-6">Salon Dashboard</h1>
          {loading ? (
            <p className="text-white">Loading appointments...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {appointments.map((appointment) => (
                <Card key={appointment._id} className="bg-white shadow-lg">
                  <CardContent>
                    <CardTitle className="text-[#FF6F61] font-bold mb-2">
                      {appointment.salon.name}
                    </CardTitle>
                    <p className="text-gray-700 mb-2">
                      <strong>Customer:</strong> {appointment.user.name}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Status:</strong> {appointment.status}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAppointmentStatus(appointment._id, "approved")}
                        className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAppointmentStatus(appointment._id, "rejected")}
                        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
