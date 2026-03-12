import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: 'No URL provided' });

    const filePath = path.join(process.cwd(), 'gallery.json');
    let gallery = [];

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      gallery = JSON.parse(data);
    } catch (err) {
      console.log('JSON read error:', err);
    }

    gallery.push(url);
    fs.writeFileSync(filePath, JSON.stringify(gallery, null, 2));

    return res.status(200).json({ message: 'Image added', gallery });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
