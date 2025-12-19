import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Layout from '@/components/Layout';
import AdminUploadsTable from '@/components/AdminUploadsTable';

const ADMIN_EMAIL = 'admin123@gmail.com';

function isAdmin(session: any): boolean {
  return session?.user?.email === ADMIN_EMAIL;
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Server-side admin check
  if (!session?.user?.id || !isAdmin(session)) {
    redirect('/');
  }

  // Fetch all uploads with user information
  const uploads = await (prisma as any).documentUpload.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage all document uploads
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {uploads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No uploads found.</p>
              </div>
            ) : (
              <AdminUploadsTable uploads={uploads} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

