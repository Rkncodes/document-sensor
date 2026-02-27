import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import AdminUploadsTable from "@/components/AdminUploadsTable";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const uploads = await prisma.documentUpload.findMany({
    include: {
      user: {
        select: { email: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Layout>
      <div className="p-6">
        <AdminUploadsTable uploads={uploads} />
      </div>
    </Layout>
  );
}