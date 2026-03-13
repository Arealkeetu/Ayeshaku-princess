export default async function handler(req, res) {

  const cloudName = "dxyl0aoi0";
  const folder = "my-gallery";

  const url = `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`;

  try{

    const response = await fetch(url);
    const data = await response.json();

    const images = data.resources.map(img =>
      `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.${img.format}`
    );

    res.status(200).json({images});

  }catch(err){
    res.status(500).json({error:"failed"});
  }

}
