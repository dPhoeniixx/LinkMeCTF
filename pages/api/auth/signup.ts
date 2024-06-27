// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import * as JWT from "jsonwebtoken";
import prisma from "@/prisma/prisma";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const newUser = await prisma.user.create({
        data: req.body,
      });

      const cookieName = "session_token";
      const cookieValue = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.SECRET_KEY || "default_secret_key",
      );
      const maxAge = 60 * 60 * 24; // 1 day in seconds
      const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
      const cookieString = `${cookieName}=${cookieValue}; Path=/; Expires=${expires}; HttpOnly;`;

      // Set the cookie header
      res.setHeader("Set-Cookie", cookieString);

      res.status(201).json(newUser);
    } catch (error) {
      if ((error as any).code === "P2002") {
        return res
          .status(500)
          .json({ message: "A user with this email already exists." });
      }

      return res.status(500).json({ message: (error as any).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
