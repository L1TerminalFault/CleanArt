"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Loading from "@/components/loading";
import images from '@/_imagesImport'

export default function () {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null)
  const [users, setUsers] = useState(null)
  const [delivering, setDelivering] = useState(false)

  const fetchUsers = async () => {
    const res = (await (await fetch("/api/users/allUsers")).json()).users;
    setUsers(res)
  };

  const fetchProducts = async () => {
    const res = (await (await fetch("/api/products/allProducts")).json())
      .products;
    setProducts(res)
  };

  async function fetchOrders() {
    //    await new Promise(resolve => setTimeout(resolve, 2000))
    const res = (await (await fetch("/api/orders/allOrders")).json()).orders;
    setOrders(res);
  }

  useEffect(() => {
    const init = async () => {
      await fetchProducts()
      await fetchUsers()
      fetchOrders()
    }
    init()

  }, []);

  const deliver = async (id) => {
    setDelivering(true)
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
    await fetchOrders()
    setDelivering(false)
  }

  return (
    <div className="text-2xl flex items-center justify-center w-full h-[calc(100vh-160px)] text-white">
      {!orders ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : !orders.length ? (
        <div className="flex flex-col items-center justify-center">
          <div className="text-center text-gray-500 text-lg">No Orders</div>
        </div>
      ) : (
        <div className="overflow-scroll flex flex-col gap-2 p-2 w-full h-full">
          {orders.map((eachOrder) => (
            <div key={eachOrder._id} className="flex flex-col p-2 rounded-xl  bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900">
              <div className="flex flex-row items-center justify-between p-2 ">
                <div className="gap-2 max-w-[80%] flex items-center">
                  <Image
                    src={
                      products.find((eachProduct) => eachProduct._id === eachOrder.productId).image.includes('http') 
                      ? products.find((eachProduct) => eachProduct._id === eachOrder.productId).image
                      : images['img_' + products.find((eachProduct) => eachProduct._id === eachOrder.productId).image]
                    }
                    className="rounded-lg md:size-32 size-24"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <div className="p-2 pt-0">
                    <div className=" mb-1 md:text-xl text-sm font-semibold">
                      {
                        products.find(
                          (eachProduct) =>
                            eachProduct._id === eachOrder.productId,
                        ).title
                      }
                    </div>
                    <div className="text-xs max-w-[70%] md:text-sm">
                      {
                        products.find(
                          (eachProduct) =>
                            eachProduct._id === eachOrder.productId,
                        ).description
                      }
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 p-3 flex-col gap-3 items-end">
                  <Image
                    src={users.find(eachUser => eachUser._id === eachOrder.user).image}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full"

                  />
                  <div className="text-right text-xs">{users.find(eachUser => eachUser._id === eachOrder.user).username}</div>
                </div>
              </div>

              <div className="flex justify-between items-center flex-row rounded-full">
                <div className="text-sm ml-2 capitalize">{eachOrder.amount}</div>
                {delivering ? <div className="rounded-full text-sm bg-gray-800 py-1 px-3">Updating</div>
                :
                eachOrder.amount === 'pending' ? 
                  <div onClick={() => deliver(eachOrder._id)} className="rounded-full text-sm active:bg-orange-700 bg-orange-600 px-3 py-1">Mark Delivered</div>
                  : <div className="rounded-full text-sm bg-gray-800 py-1 px-3">Delivered</div>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
