import { OrdersModel } from "../models/OrdersModel.js";
import { verifyrequiredparams } from "../utils/Common.js";
import { setMongoose } from "../utils/Mongoose.js";
import { sendEmail } from "../utils/nodemailer.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      userID,
      totalAmount,
      name,
      email,
      phone,
      address,
      city,
      area,
      province,
      postal_code,
      delivery_instruction
    
    } = req.body;

    if (items?.length === 0) {
      throw new Error("No Items In Cart");
    };

    await verifyrequiredparams(req.body,[
      'userID',
      'totalAmount',
      'name',
      'email',
      'phone',
      'address',
      'city',
      'area',
      'province',
      'postal_code',
      'items'
     
    ])
   
  const order = await OrdersModel.create({
    userID,
      items,
      totalAmount,
      name,
      email,
      phone,
      address,
      city,
      area,
      province,
      postal_code,
      delivery_instruction
     
    });

    await sendEmail({
      name,
      phone,
      OrderID: order.OrderID,
      address,
      postal_code,
      totalAmount,
      subject: "New Order",
    });

    return res.status(201).json({ success:true, message: "Order PLaced Succcessfully" , OrderID: order.OrderID,});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllOrdersForUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("User id is required");
    const orders = await OrdersModel.find({ userID: id }).sort({
      createdAt: -1,
    });
    setMongoose();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id, orderProgress } = req.body;
    if (!id) {
      throw new Error("No ID Provided");
    }
    const order = await OrdersModel.findById(id);
    if (!order) {
      throw new Error("No Order Data Found");
    }
    //Remove It For Admin
    if (order.status === "Dispatched") {
      throw new Error("This Order has been already been Dispatched");
    }
    await OrdersModel.findByIdAndUpdate(id, { orderProgress: orderProgress });
    return res.status(200).json({ message: "Order Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createOrderAsGuest = async (req, res, next) => {
  try {
    const {
      items,
      totalAmount,
      name,
      email,
      phone,
      address,
      city,
      area,
      province,
      postal_code,
      delivery_instruction
    } = req.body;

    if (items?.length === 0) {
      throw new Error("No Items In Cart");
    };

    await verifyrequiredparams(req.body,[
      'totalAmount',
      'name',
      'email',
      'phone',
      'address',
      'city',
      'area',
      'province',
      'postal_code',
      'items'
    ])
   
  const order = await OrdersModel.create({
      items,
      totalAmount,
      name,
      email,
      phone,
      address,
      city,
      area,
      province,
      postal_code,
      delivery_instruction
     
    });

    await sendEmail({
      email,
      name,
      phone,
      OrderID: order.OrderID,
      address,
      postal_code,
      totalAmount,
      subject: "New Order",
    });

    return res.status(201).json({ success:true, message: "Order PLaced Succcessfully" , OrderID: order.OrderID,});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const trackOrder = async (req, res, next) => {
  try {
    const { OrderID } = req.body;
    if (!OrderID) {
      throw new Error("Order ID is required");
    }
    const order = await OrdersModel.findOne({OrderID});
    if (!order) {
      throw new Error("Invalid order tracking information");
    }
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
