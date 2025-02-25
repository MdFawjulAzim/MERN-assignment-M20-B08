import UserModel from "../models/UserModel.js";
import {
  loginUserService,
  registrationService,
  createPortfolioService,
  getAllPortfoliosService,
  updatePortfolioService,
  deletePortfolioService,
} from "../services/UserServices.js";

export const registration = async (req, res) => {
  let result = await registrationService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};

//User Login
export const loginUser = async (req, res) => {
  let result = await loginUserService(req);

  if (result.status === 200) {
    res.cookie("token", result.token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    });

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      token: result.token, // Send token if needed
    });
  } else {
    return res.status(result.status).json({
      success: result.success,
      message: result.message,
    });
  }
};

//User Logout
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
      httpOnly: false,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + err.toString(),
    });
  }
};

//User Create Portfolio
export const createPortfolio = async (req, res) => {
  let result = await createPortfolioService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};

//User Get Portfolio
export const getAllPortfolios  = async (req, res) => {
  let result = await getAllPortfoliosService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};

//User Update Portfolio
export const updatePortfolio  = async (req, res) => {
  let result = await updatePortfolioService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
    data: result.data,
  });
};

//User Delete Portfolio
export const deletePortfolio = async (req, res) => {
  let result = await deletePortfolioService(req);
  return res.status(result.status).json({
    success: result.success,
    error: result.error,
    message: result.message,
  });
};