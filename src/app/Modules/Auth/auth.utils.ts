import jwt, { verify } from "jsonwebtoken";
export const createToken = (
  jwtPayload: { id: string; role: string },
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return verify(token, secret);
};
