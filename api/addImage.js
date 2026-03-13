// /api/addImage.js
import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url, public_id } = req.body;

    if (!url || !public_id) {
      return res.status(400).json({ error: "Missing url or public_id" });
    }

    // Optional: you can use Cloudinary API to add tags to image
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Add a tag so your loadGallery can filter
    await cloudinary.uploader.explicit(public_id, {
      type: "upload",
      tags: ["my-gallery"],
    });

    return res.status(200).json({ message: "Image added successfully" });
  } catch (err) {
    console.error("Add image failed:", err);
    return res.status(500).json({ error: "Failed to add image" });
  }
}
