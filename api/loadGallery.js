export default async function handler(req, res) {

  const cloudName = "dxyl0aoi0";

  try {

    const response = await fetch(
      `https://res.cloudinary.com/${cloudName}/image/list/my-gallery.json`
    );

    const data = await response.json();

    const images = data.resources.map(img =>
      `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.${img.format}`
    );

    res.status(200).json({ images });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to load gallery" });

  }

}
