import MainSidebar from "@/components/Sidebar/MainSidebar";
import ManageUsers from "@/components/Manage/Users/ManageUsers";

export default function Home() {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Users" />
      <ManageUsers />
    </main>
  );
}
