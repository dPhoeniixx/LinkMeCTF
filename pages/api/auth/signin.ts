import { NextApiRequest, NextApiResponse } from "next";
import * as JWT from "jsonwebtoken";
import prisma from "@/prisma/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    const userData = await prisma.user.findUnique({
      where: { email, password },
    });

    if (userData) {
      const cookieName = "session_token";
      const cookieValue = JWT.sign(
        { id: userData.id, email: userData.email },
        process.env.SECRET_KEY || "default_secret_key",
      );
      const maxAge = 60 * 60 * 24; // 1 day in seconds
      const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
      const cookieString = `${cookieName}=${cookieValue}; Path=/; Expires=${expires}; HttpOnly;`;

      // Set the cookie header
      res.setHeader("Set-Cookie", cookieString);
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "Email or Password is invalid" });
    }
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ error: message });
  }
}
