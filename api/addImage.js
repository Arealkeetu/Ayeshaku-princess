import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { url } = req.body;
  if (!url) return res.status(400).send('No URL provided');

  const filePath = join(process.cwd(), 'gallery.json');
  let data = [];

  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (err) {}

  data.push(url);
  writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true });
}