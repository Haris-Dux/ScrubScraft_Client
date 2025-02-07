import { SupportModel } from "../models/ContactModel.js";
import { verifyrequiredparams } from "../utils/Common.js";
import { sendEmail } from "../utils/nodemailer.js";

export const createSupport = async (req, res) => {
  try {
    const { name, message, phone, email } = req.body;
    await verifyrequiredparams(req.body,['name', 'message', 'phone', 'email'])
  
    await SupportModel.create({
      name,
      message,
      email,
      phoneNumber: phone,
    });

    await sendEmail({
      name,
      message,
      email,
      phone,
      subject: "Contact Notification",
    });

    return res
      .status(201)
      .json({
        msg: "Successfully submitted.Our Team will get in touch with you shortly.",
      });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
