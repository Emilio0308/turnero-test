import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  name: string | null;
  email: string | null;
  lastName: string | null;
  active: boolean;
  termAndConditions: boolean;
  image?: string | null; // Propiedad opcional
  emailVerified?: Date | null; // Propiedad opcional
}

export const generateJWT = (payload: Payload, expiresIn?: number) => {
  const secret = process.env.NEXTAUTH_SECRET as string;
  const customToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn || 3600,
  });
  return customToken;
};
