import jwt, { JwtPayload } from 'jsonwebtoken';
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

const generateJwtToken = (
  payload: any,
  secret_key: string,
  expire_in: number | string,
) => {
  const token = jwt.sign(payload, secret_key, { expiresIn: expire_in });
  return token;
};

export default generateJwtToken;
