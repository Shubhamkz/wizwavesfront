import MainGenre from "@/components/Genre/MainGenre";
import MainSidebar from "@/components/Sidebar/MainSidebar";

export default function Genre() {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Genres" />
      <div className="col-span-12 md:col-span-9">
        <MainGenre />
      </div>
    </main>
  );
}
