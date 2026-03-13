export default async function handler(req, res) {

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")

try{

const response = await fetch(
`https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
{
headers:{
Authorization:`Basic ${auth}`
}
}
)

const data = await response.json()

const images = data.resources.map(img => img.secure_url)

res.status(200).json({images})

}catch(err){

res.status(500).json({error:"Failed to load gallery"})

}

}
