import SideBar from "@/components/sidebar";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function ({ children }) {
  return (
    <div className="pt-10 items-stretch h-[calc(100vh-0px)] flex flex-row">
      <SideBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
