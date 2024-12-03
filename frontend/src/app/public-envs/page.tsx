import NavSidebar from "@/components/NavSidebar/page";

export default function PublicEnvs() {
  return (
    <main className="min-h-[calc(100vg - 1rem)] flex w-full gap-1 bg-[#333] p-1">
      <NavSidebar />
      <div className="h-[calc(100vh-1rem)] w-full rounded-md bg-[#111]"></div>
    </main>
  );
}
