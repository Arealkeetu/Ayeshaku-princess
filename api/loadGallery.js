// api/loadGallery.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res){
  const filePath = path.join(process.cwd(), 'gallery.json');
  let gallery = [];

  if(fs.existsSync(filePath)){
    gallery = JSON.parse(fs.readFileSync(filePath));
  }

  res.status(200).json(gallery);
}
