import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    const filePath = join(process.cwd(), 'gallery.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    res.status(200).json({ images: data });
  } catch (err) {
    res.status(200).json({ images: [] }); // empty gallery if no file yet
  }
}