// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import _ from "lodash";

import prisma from "@/prisma/prisma";


export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method == "GET") {
      // @ts-ignore
      res.status(200).json(
        _.omit(
          await prisma.user.findFirst({
            where: { id: parseInt(<string>req.query.id) },
          }),
          ["email", "password", "captcha"],
        ),
      );
    }
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}
