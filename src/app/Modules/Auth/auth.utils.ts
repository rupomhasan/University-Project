import jwt from "jsonwebtoken";
export const createToken = (
  jwtPayload: { id: string; role: string },
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn,
  });
};
