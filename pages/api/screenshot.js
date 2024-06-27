import crypto from "crypto";
import * as fs from "fs";

import _ from "lodash";

import prisma from "../../prisma/prisma";

import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const url = req.headers["referer"] || "";


  const userData = _.omit(
    await prisma.user.findFirst({
      where: {
        id: parseInt(url.split("/")[url.split("/").length - 1]),
      },
    }),
    ["email", "password", "captcha"],
  );

  if (!Object.keys(userData).length)
    res.status(401).json({ message: "Invalid User ID" });

  try {
    // Create a hash of the user data
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(userData))
      .digest("hex");

    res.setHeader("Cache-Hash", hash);

    if (fs.existsSync(`/tmp/${hash}.png`)) {
      res.setHeader("Content-Type", "image/png");
      res.send(fs.readFileSync(`/tmp/${hash}.png`));

      return; // this line wasn't there during the challenge :(
    }

    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--headless"],
    });

    const page = await browser.newPage();

    // Set viewport for consistent screenshot size
    await page.setViewport({ width: 1280, height: 720 });

    // Navigate to the page
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector('body[data-loaded="true"]');

    // Take a screenshot
    const element = await page.$(".descripcion");

    if (element) {
      const screenshot = await element.screenshot({
        path: `/tmp/${hash}.png`,
      });

      // Close the browser
      await browser.close();

      // Send the screenshot as a response
      res.setHeader("Content-Type", "image/png");
      res.send(screenshot);
    } else {
      res.status(500).json({ message: "Failed to take screenshot" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to take screenshot", error: error.message });
  }
}
