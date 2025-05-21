import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-4 bg-white dark:bg-black w-full">
        {children}
      </main>
    </div>
  );
}
