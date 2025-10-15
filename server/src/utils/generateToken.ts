import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  //   if (!id) return null;
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};
