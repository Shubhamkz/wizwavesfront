import MainSidebar from "@/components/Sidebar/MainSidebar";
import ManageMusic from "@/components/Manage/Music/ManageMusic";

export default function Home() {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Music" />
      <ManageMusic />
    </main>
  );
}
