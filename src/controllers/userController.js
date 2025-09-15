import { registerUser, loginUser } from "../services/userService.js";

//Register User
export async function register(req, res) {
  try {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "All fields are required"
      });
    }

    const user = await registerUser(user_name, email, password);
    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong"
    });
  }
}

//Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Email and password are required"
      });
    }

    const result = await loginUser(email, password);
    res.status(200).json({
      message: "Login successful",
      ...result
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong"
    });
  }
}

