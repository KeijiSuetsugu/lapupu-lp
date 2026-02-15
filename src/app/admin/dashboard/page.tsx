import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function DashboardPage() {
  if (!isAuthenticated()) {
    redirect("/admin");
  }

  const content = await getContent();

  return <AdminDashboard initialContent={content} />;
}
