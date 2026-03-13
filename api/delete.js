import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRET
})

export default async function handler(req,res){

if(req.method!=="POST"){
return res.status(405).end()
}

const {public_id}=req.body

try{

await cloudinary.uploader.destroy(public_id)

res.status(200).json({success:true})

}catch(err){

res.status(500).json({error:"Delete failed"})

}

}
