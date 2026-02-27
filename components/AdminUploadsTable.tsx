'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UploadWithUser {
  id: string;
  fileName: string;
  censoredCount: number;
  createdAt: Date;
  user: {
    email: string;
  };
}

interface AdminUploadsTableProps {
  uploads: UploadWithUser[];
}

export default function AdminUploadsTable({ uploads }: AdminUploadsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this upload?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/delete-upload?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete upload');
      }
    } catch (error) {
      alert('Error deleting upload');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              User Email
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              File Name
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Sensitive Words
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Upload Date
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload) => (
            <tr
              key={upload.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-gray-900">
                {upload.user.email}
              </td>
              <td className="py-3 px-4 text-gray-900">
                {upload.fileName}
              </td>
              <td className="py-3 px-4 text-gray-700">
                {upload.censoredCount}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {new Date(upload.createdAt).toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDelete(upload.id)}
                  disabled={deletingId === upload.id}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                >
                  {deletingId === upload.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


