import fetch from "node-fetch";

export default async function handler(req, res) {
  const cloudName = "dxyl0aoi0"; // your Cloudinary cloud name
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const folder = "my-gallery"; // the folder where images are stored

  // Basic auth for Cloudinary
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=${folder}/`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();
    // Send only the secure URLs
    const images = data.resources.map(img => img.secure_url);
    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
}