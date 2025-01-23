import Salon from "../model/salonModel.js";
import User from "../model/userModel.js";

export const registerSalon = async (req, res) => {
  const { _id } = req.user;
  const { salonName, address, contactNumber, services, openingHours, images } =
    req.body;

  if (!salonName || !address || !contactNumber) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

  try {
    const user = await User.findById(_id);
    if (user.role === "salon_owner" && user.salon) {
      return res.status(400).json({ message: "User already owns a salon" });
    }

    const existingSalon = await Salon.findOne({ owner: _id });
    if (existingSalon) {
      return res.status(400).json({ message: "You already own a salon" });
    }
    if (!images) {
      const randomImage = [
        "https://img.freepik.com/free-vector/hairdresser-team-concept-illustration_114360-10661.jpg?t=st=1737646986~exp=1737650586~hmac=4912bacd48d95a3311236cf96dcd7765213015d71610ea6019d5105715008f7a&w=1060",
        "https://img.freepik.com/free-vector/barbershop-team-concept-illustration_114360-10892.jpg?t=st=1737647156~exp=1737650756~hmac=efd32a780a1722bade285c65ede363e8a0595d9099d4b00ef054fa1a4a6b90b1&w=1060",
        "https://img.freepik.com/free-vector/hairdresser-team-concept-illustration_114360-10901.jpg?t=st=1737647198~exp=1737650798~hmac=2e3438dacea27422c7669ee7b42ca9d31c6d0e87671c1ef6b0235bf4bbfb8bb9&w=740",
      ];
      images = randomImage[Math.floor(Math.random() * randomImage.length)];
    }
    const salon = await Salon.create({
      name: salonName,
      owner: _id,
      address,
      contactNumber,
      services: services || [],
      openingHours: openingHours || { start: "09:00", end: "18:00" },
      images: images || [],
    });

    user.role = "salon_owner";
    user.salon = salon._id;
    await user.save();

    res.status(201).json(salon);
  } catch (error) {
    console.error("Error registering salon:", error.message);
    res
      .status(500)
      .json({ message: "Failed to register salon", error: error.message });
  }
};

export const getAllSalons = async (req, res) => {
  try {
    const salons = await Salon.find().populate("owner", "name email");
    return res.status(200).json({
      message: "Salons fetched successfully",
      salons,
    });
  } catch (error) {
    console.error("Error fetching salons:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch salons", error: error.message });
  }
};

export const getSalonById = async (req, res) => {
  const { id } = req.params;

  try {
    const salon = await Salon.findById(id).populate("owner", "name email");
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    res.status(200).json(salon);
  } catch (error) {
    console.error("Error fetching salon:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch salon", error: error.message });
  }
};

// Update salon details
export const updateSalon = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const salon = await Salon.findById(id);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    if (!salon.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this salon" });
    }

    Object.assign(salon, updates);
    await salon.save();

    res.status(200).json(salon);
  } catch (error) {
    console.error("Error updating salon:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update salon", error: error.message });
  }
};

// Add a service to a salon
export const addService = async (req, res) => {
  const { id } = req.params;
  const { name, price, duration } = req.body;

  if (!name || !price || !duration) {
    return res
      .status(400)
      .json({ message: "Please provide all service details" });
  }

  try {
    console.log("id", req.params);
    const salon = await Salon.findById(id);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    if (!salon.owner.equals(req.user._id)) {
      return res.status(403).json({
        message: "You are not authorized to add services to this salon",
      });
    }

    salon.services.push({ name, price, duration });
    await salon.save();

    return res.status(200).json(salon);
  } catch (error) {
    console.error("Error adding service:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add service", error: error.message });
  }
};

// Remove a service from a salon
export const removeService = async (req, res) => {
  const { id } = req.params;
  const { serviceId } = req.body;

  try {
    const salon = await Salon.findById(id);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    if (!salon.owner.equals(req.user._id)) {
      return res.status(403).json({
        message: "You are not authorized to remove services from this salon",
      });
    }

    salon.services = salon.services.filter(
      (service) => service._id.toString() !== serviceId
    );
    await salon.save();

    res.status(200).json(salon);
  } catch (error) {
    console.error("Error removing service:", error.message);
    res
      .status(500)
      .json({ message: "Failed to remove service", error: error.message });
  }
};

export const updateService = async (req, res) => {
  const { salonId, serviceId } = req.params;
  const { name, price, duration } = req.body;

  if (!name && !price && !duration) {
    return res
      .status(400)
      .json({ message: "Please provide at least one field to update" });
  }

  try {
    const salon = await Salon.findById(salonId);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    if (!salon.owner.equals(req.user._id)) {
      return res.status(403).json({
        message: "You are not authorized to update services for this salon",
      });
    }

    // Find the service to be updated
    const service = salon.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (name) service.name = name;
    if (price) service.price = price;
    if (duration) service.duration = duration;

    await salon.save();

    return res
      .status(200)
      .json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error("Error updating service:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update service", error: error.message });
  }
};

export const searchSalo = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const salons = await Salon.find({
      name: new RegExp(searchTerm, "i"),
    });
    res.status(200).json({
      message: "Salons fetched successfully",
      salons,
    });
  } catch (error) {
    console.error("Error searching salons:", error.message);
    res
      .status(500)
      .json({ message: "Failed to search salons", error: error.message });
  }
};
