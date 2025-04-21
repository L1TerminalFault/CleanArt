// procedure
// fetch user data from clerk
// verify if it is inside the admin list
// if it doesn't just render some error component
// if it does
// fetch the order list from mongodb
// render some list ui and control setters to modify the status
// hopefully done

import { isAdmin } from "@/lib/utils";
import Header from "@/components/header";
import Loading from "@/components/loading";
import { Suspense } from "react";


export const metadata = {
  title: {
    default: "Orders"
  }
}


export default async function ({ children }) {
  if (!(await isAdmin()))
    throw new Error("Uncaught Error Make Sure You are the admin");


  return (
    <div className="opacity-0 page-slide flex w-full flex-col items-stretch">
      <Header title="Orders" />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
