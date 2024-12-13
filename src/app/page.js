import MainSidebar from "@/components/Sidebar/MainSidebar";
import MainHome from "@/components/MainBody/Home/Home";

export default function Home() {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Home" />
      <div className="col-span-12 md:col-span-9">
        <MainHome />
      </div>
    </main>
  );
}
