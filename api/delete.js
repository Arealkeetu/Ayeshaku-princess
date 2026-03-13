import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { public_id, url } = req.body; // use public_id from Cloudinary

  try {
    // Delete from Cloudinary
    if (public_id) {
      await cloudinary.v2.uploader.destroy(public_id);
    }

    // Remove from gallery.json
    const filePath = path.join(process.cwd(), "gallery.json");
    let data = { images: [] };
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    data.images = data.images.filter(img => img !== url);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
}