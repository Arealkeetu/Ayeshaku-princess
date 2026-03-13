import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "No URL provided" });

  const filePath = path.join(process.cwd(), 'gallery.json');

  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);

    data.images.push(url);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: "Image added", url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save image" });
  }
}
