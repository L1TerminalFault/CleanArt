"use client";

import { useRef, useState, useEffect, useActionState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdCloudUpload } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: 'dgyebeipy',
//   api_key: '267816747737431',
//   api_secret: '1Kq0wb4gf4GHF-rvMjOoOg0ociI',
// });

import PopUp from "@/components/pop_up";

export default function () {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState({});
  const [popError, setPopError] = useState(false);
  const [popSuccess, setPopSuccess] = useState(false);

  const fileInputRef = useRef(null);
  const router = useRouter();

  const openFileDialogue = () => {
    fileInputRef.current.click();
  };

  const [formData, setFormData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSubmitting(uploading);
  }, [uploading]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setImage(base64Image);

      const formData = new FormData();

      formData.append(
        "file",
        `data:image/${file.type.split("/")[1]};base64,${base64Image}`,
      );
      formData.append("upload_preset", "client");
      setFormData(formData);
    };
  };

  const handleSubmit = async () => {
    let anyError = undefined;
    if (!image) {
      anyError = true;
      setError({ ...error, image: true });
    }
    if (!price) {
      anyError = true;
      setError({ ...error, price: true });
    }
    if (!time) {
      anyError = true;
      setError({ ...error, time: true });
    }
    if (!description) {
      anyError = true;
      setError({ ...error, description: true });
    }
    if (!title) {
      anyError = true;
      setError({ ...error, title: true });
    }
    if (!category) {
      anyError = true;
      setError({ ...error, category: true });
    }

    if (anyError) {
      setSubmitting(false);
      setUploading(false);
      return;
    }

    setUploading(true);

    try {


      const result = await (
        await fetch("https://api.cloudinary.com/v1_1/dgyebeipy/image/upload", {
          method: "POST",
          body: formData,
        })
      ).json();

      if (!result.secure_url) throw new Error();
      setImageUrl(result.secure_url);


      await new Promise(resolve => setTimeout(resolve, 400))
      if (!imageUrl) throw new Error()
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          title,
          description,
          time,
          price,
          image: imageUrl,
        }),
      });

      const { error } = await response.json();
      if (error) throw new Error();
      setPopSuccess(true);
      setTimeout(() => setPopSuccess(false), 8000);
      router.push("/products");
    } catch (error) {
      setPopError(true);
      setTimeout(() => setPopError(false), 8000);
    } finally {
      setUploading(false);
    }

    setUploading(false);
  };

  return (
    <div className="p-4 text-white w-full">
      {popError || popSuccess ? (
        <div className="absolute bottom-0 -translate-y-16 w-full flex items-center justify-center">
          <PopUp
            message={
              popSuccess
                ? "Product added successfully"
                : "Something went wrong. Could not add product"
            }
          />
        </div>
      ) : null}

      <form
        action={(e) => {
          setSubmitting(true);
          handleSubmit(e);
        }}
        className="w-full flex flex-col gap-4 mb-20"
      >
        <div className="font-bold text-lg pl-3 translate-y-2">
          Select Category
        </div>
        <div className="">
          <select
            name="category"
            id=""
            className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-600 outline-none"
            value={category}
            disabled={uploading}
            onChange={(e) => {
              setCategory(e.target.value);
              setError({ ...error, category: undefined });
            }}
          >
            <option disabled defaultChecked value="">
              Select Category
            </option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="abstract">Abstract</option>
            <option value="modern">Modern</option>
          </select>
          {error.category ? (
            <div className="h-3 text-red-500 ml-2 mt-1">
              This field is required.
            </div>
          ) : null}
        </div>

        <div className="font-bold text-lg pl-3 translate-y-2">
          Title of your Product
        </div>
        <div className="">
          <input
            type="text"
            placeholder=""
            name="title"
            className="outline-none px-3 py-1  bg-gray-800 border border-gray-600 focus:outline focus:outline-gray-600 w-full rounded-xl"
            value={title}
            disabled={uploading}
            onChange={(e) => {
              setTitle(e.target.value);
              setError({ ...error, title: undefined });
            }}
          />
          {error.title ? (
            <div className="text-red-500 ml-2 mt-1 h-3">
              This field is required.
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="font-bold text-lg pl-3 translate-y-2">Description</div>
        <div>
          <input
            type="text"
            placeholder=""
            name="description"
            className="outline-none px-3 py-1 bg-gray-800 border border-gray-600 focus:outline focus:outline-gray-600 w-full rounded-xl"
            value={description}
            disabled={uploading}
            onChange={(e) => {
              setDescription(e.target.value);
              setError({ ...error, description: undefined });
            }}
          />
          {error.description ? (
            <div className="h-3 text-red-500 ml-2 mt-1">
              This field is required.
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>

        <div className="font-bold text-lg pl-3 translate-y-2">
          Delivery Time
        </div>
        <div>
          <input
            type="text"
            placeholder=""
            name="time"
            className="outline-none px-3 py-1 bg-gray-800 border border-gray-600 focus:outline focus:outline-gray-600 w-full rounded-xl"
            value={time}
            disabled={uploading}
            onChange={(e) => {
              setTime(e.target.value);
              setError({ ...error, time: undefined });
            }}
          />
          {error.time ? (
            <div className="h-3 text-red-500 ml-2 mt-1">
              This field is required.
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>

        <div className="font-bold text-lg pl-3 translate-y-2">Price</div>
        <div>
          <input
            type="text"
            placeholder=""
            name="price"
            className="outline-none px-3 py-1 bg-gray-800 border border-gray-600 focus:outline focus:outline-gray-600 w-full rounded-xl"
            value={price}
            disabled={uploading}
            onChange={(e) => {
              setPrice(e.target.value);
              setError({ ...error, price: undefined });
            }}
          />
          {error.price ? (
            <div className="h-3 text-red-500 ml-2 mt-1">
              This field is required.
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>

        <div className="font-bold text-lg pl-3 translate-y-2">Image</div>
        <div
          onClick={openFileDialogue}
          className="h-52 overflow-hidden bg-gray-800 border border-gray-600 rounded-xl flex items-center justify-center"
        >
          {image ? (
            <Image
              src={image || null}
              alt=""
              width={300}
              height={200}
              className=""
              unoptimized
            />
          ) : (
            <div>
              <IoMdCloudUpload size={30} color="gray" />
            </div>
          )}
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              setError({ ...error, image: undefined });
              handleImageUpload(e);
            }}
            disabled={uploading}
          />
        </div>
        {error.image ? (
          <div className="text-red-500 ml-2 h-3 mt-1">
            This field is required.
          </div>
        ) : (
          <div className=""></div>
        )}
        {submitting ? (
          <div className="self-end mr-2 p-1 rounded-full bg-purple-700">
            <div className="bg-gradient-to-tr from-gray-200 to-gray-800 p-1 rounded-full animate-spin ">
              <div className="bg-purple-700 rounded-full p-2"></div>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="p-1 self-end mr-2 bg-purple-700 rounded-full "
          >
            <IoMdAdd size={26} color="white" />
          </button>
        )}
      </form>
    </div>
  );
}
