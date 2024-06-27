import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    res.setHeader(
      "Set-Cookie",
      "session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly;",
    );
    res.status(200).json({ success: true });
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
}
