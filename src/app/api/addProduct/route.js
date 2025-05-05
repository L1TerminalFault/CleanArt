import { Product } from "@/db/db";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PUT = async (req, res) => {
  try {
    const body = await req.json();
    console.log("contents of the body are", body);
    const result = await cloudinary.v2.uploader.upload(body.image, {
      resource_type: "auto",
    });
    const url = result.secure_url;

    await Product.insertOne({ ...body, image: url });

    return Response.json({ url });
  } catch (err) {
    return Response.json({ message: "Error: Couldn't upload image" });
  }
};
