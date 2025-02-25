import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { EncodeToken } from "../utils/TokenHelper.js";
import PortfolioModel from "../models/PortfolioModel.js";

export const registrationService = async (req) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "All fields are required",
      };
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "Email already exists",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashpassword,
    };
    const data = await UserModel.create(payload);
    return {
      status: 201,
      success: true,
      error: false,
      message: "User registered successfully",
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const loginUserService = async (req) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return {
        status: 400,
        success: false,
        error: true,
        message: "All fields are required",
      };
    }

    let User = await UserModel.findOne({ email: email });

    if (!User) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "User not found",
      };
    }
    let matchPassword = await bcryptjs.compare(password, User.password);
    if (!matchPassword) {
      return {
        status: 401,
        success: false,
        error: true,
        message: "Invalid Password",
      };
    }
    const token = EncodeToken(email, User._id);

    return {
      status: 200,
      success: true,
      error: false,
      message: "User logged in successfully",
      token: token,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const createPortfolioService = async (req) => {
  try {
    const { title, description, img, codelink, livelink } = req.body;
    const portfolio = await PortfolioModel.create({
      userId: req.headers.user_id,
      title,
      description,
      img,
      codelink,
      livelink,
    });

    return {
      status: 200,
      success: true,
      error: false,
      message: "Portfolio Create Successfully",
      data: portfolio,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const getAllPortfoliosService = async (req) => {
  try {
    const portfolios = await PortfolioModel.find({
      userId: req.headers.user_id,
    });
    return {
      status: 200,
      success: true,
      error: false,
      message: "Portfolio Read Successfully",
      data: portfolios,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const updatePortfolioService = async (req) => {
  try {
    const { id } = req.params; // Get portfolio ID from the request params
    const { title, description, img, codelink, livelink } = req.body;

    // Find and update the portfolio
    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { _id: id, userId: req.headers.user_id },
      { title, description, img, codelink, livelink },
      { new: true } // Returns the updated document
    );

    if (!updatedPortfolio) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "Portfolio not found or unauthorized action",
      };
    }

    return {
      status: 200,
      success: true,
      error: false,
      message: "Portfolio updated successfully",
      data: updatedPortfolio,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};

export const deletePortfolioService = async (req) => {
  try {
    const { id } = req.params; // Get portfolio ID from the request params

    // Find and delete the portfolio
    const deletedPortfolio = await PortfolioModel.findOneAndDelete({
      _id: id,
      userId: req.headers.user_id,
    });

    if (!deletedPortfolio) {
      return {
        status: 404,
        success: false,
        error: true,
        message: "Portfolio not found or unauthorized action",
      };
    }

    return {
      status: 200,
      success: true,
      error: false,
      message: "Portfolio deleted successfully",
      data: deletedPortfolio,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    };
  }
};
