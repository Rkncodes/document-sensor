import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "ADMIN";

  const uploads = await prisma.documentUpload.findMany({
    where: isAdmin
      ? {}
      : {
        userId: session.user.id,
      },
    include: isAdmin
      ? {
        user: {
          select: {
            email: true,
          },
        },
      }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upload History
            </h1>
            <p className="text-lg text-gray-600">
              View all your past document uploads
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {uploads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No uploads yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Upload your first document to see it here.
                </p>
              </div>
            ) : ( 
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        File Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Censored Words
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Upload Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploads.map((upload: any) => (
                      <tr
                        key={upload.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-900">
                          {upload.fileName}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {upload.censoredCount}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(upload.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}