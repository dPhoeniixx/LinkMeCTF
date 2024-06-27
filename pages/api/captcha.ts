import { NextApiRequest, NextApiResponse } from "next";
import generate from "vanilla-captcha";
import * as JWT from "jsonwebtoken";
import prisma from "@/prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const { answer, captcha } = await generate(5);

  const currentSession = JWT.verify(
    req.cookies["session_token"] || "",
    process.env.SECRET_KEY || "default_secret_key",
  );

  if (!currentSession)
    res.status(403).json({ message: "Please log in first." });

  await prisma.user.update({
    where: { email: (currentSession as any).email },
    data: {
      captcha: answer,
    },
  });

  res.setHeader("Content-Type", "image/png");
  res.status(200).send(captcha); //
}
