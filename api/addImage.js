// api/addImage.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res){
  const filePath = path.join(process.cwd(), 'gallery.json');

  if(req.method === 'POST'){
    const { url } = req.body;

    let gallery = [];
    if(fs.existsSync(filePath)){
      gallery = JSON.parse(fs.readFileSync(filePath));
    }

    gallery.push(url);
    fs.writeFileSync(filePath, JSON.stringify(gallery));

    res.status(200).json({message: 'Saved'});
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
