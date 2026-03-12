import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'gallery.json');
  let gallery = [];

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    gallery = JSON.parse(data);
  } catch (err) {
    console.log('JSON read error:', err);
  }

  res.status(200).json(gallery);
}
