// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/prisma/prisma";

import * as JWT from "jsonwebtoken";
import _ from "lodash";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {

    const currentSession = JWT.verify(
      req.cookies["session_token"] || "",
      process.env.SECRET_KEY || "default_secret_key",
    );

    if (currentSession && req.method == "GET") {
      res.status(200).json(
        _.omit(
          await prisma.user.findFirst({
            where: { id: (currentSession as any).id },
          }),
          ["email", "password", "captcha"],
        ),
      );
    }

    if (currentSession && req.method == "PATCH") {
      const {
        firstName,
        lastName,
        job,
        bio,
        BugCrowdHandle,
        HackerOneHandle,
        linkedInId,
      } = req.body;

      const user = await prisma.user.findFirst({
        where: { email: (currentSession as any).email },
      });

      var verified = user?.captcha != null && user.captcha == req.body.captcha;

      if (verified) {
        const updatedUser = _.omit(
          await prisma.user.update({
            where: { email: (currentSession as any).email },
            data: {
              firstName,
              lastName,
              job,
              bio,
              BugCrowdHandle,
              HackerOneHandle,
              linkedInId,
            },
          }),
          ["email", "password", "captcha"],
        );

        if (verified) {
          await prisma.user.update({
            where: { email: (currentSession as any).email },
            data: { captcha: null },
          });
        }

        res.json({
          ...updatedUser,
          message: "User data updated successfully.",
        });
      } else {
        res.json({ message: "Invalid Captcha." });
      }
    } else {
      res.status(401).json({
        message: "You must be logged in to access this endpoint.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}
