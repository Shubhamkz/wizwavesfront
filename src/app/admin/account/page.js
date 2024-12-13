import Header from "@/components/MainBody/Header/Header";
import MainHome from "@/components/MainBody/Home/Home";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import React from "react";

const page = () => {
  return (
    <>
      <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
        <div className="col-span-12 block md:hidden">
          <Header />
        </div>
        <MainSidebar content="Account" />
        <div className="col-span-9 py-20 px-12">
          <div>
            <h2 className="text-5xl font-bold mb-2">Welcome to WizWaves</h2>
          </div>
          <div>
            <p className="text-xl font-semibold">Welcome to WizWaves</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
