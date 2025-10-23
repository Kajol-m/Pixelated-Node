import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { addToWishlist, createUser, findUserByEmail, ifProductWishlistedByUser,productWishlistId } from "../models/userModel.js";
import jwt from "jsonwebtoken";

//Registering user
export async function registerUser(user_name, email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email already in use");
    error.code = "User alrady exists";
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user_id=uuidv4();

  const userId = await createUser({
    user_id:user_id,
    user_name,
    email,
    password: hashedPassword,
  });

  return { user_id, user_name, email };
}

//Login user

export async function loginUser(email, password) {

  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("User is not registered");
    error.code = "USER_NOT_REGISTERED";
    error.status = 401;
    throw error;
  }

  //compare password
  const isMatch=await bcrypt.compare(password,user.password_hash);
  if(!isMatch){
    const error = new Error("Invalid email or password");
    error.code = "INVALID_CREDENTIALS";
    error.status = 401;
    throw error;
  }

  //generate JWT
  const accessToken=jwt.sign(
    {user_id:user.user_id,email:user.email},
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )
 
  //generate Refresh Token
  const refreshToken=jwt.sign(
    {user_id:user.user_id,email:user.email},
    process.env.REFRESH_SECRET,
    {expiresIn:"7d"}
  );

  return {
    accessToken,
    refreshToken,
    user: {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email
    }
  };
}

export async function productWishlist(user_id,product_id){
  const ifAlreadyWishList= await ifProductWishlistedByUser(user_id,product_id);
  if(ifAlreadyWishList){
    const response="Added to Wishlist !";
  }

  const wishlist_id=await productWishlistId();

  const wishlistId=await addToWishlist({
    wishlist_id:wishlist_id,
    user_id,
    product_id
  });

  return {wishlistId};
}