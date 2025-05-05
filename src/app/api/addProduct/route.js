import { Product } from "@/db/db";

export const POST = async (req, res) => {
  try {
    const body = await req.json();
    
    await Product.insertOne({ ...body, image });

    return Response.json({ success: true });
  } catch (err) {
    console.log(err)
    return Response.json({ error: "Error: Couldn't upload image" });
  }
};
