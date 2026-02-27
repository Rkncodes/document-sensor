import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { censorText } from '@/lib/redaction';


function isAdmin(session: any): boolean {
  return session?.user?.role === 'ADMIN';
}

export async function DELETE(request: NextRequest) {
  // Server-side admin check
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !isAdmin(session)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const uploadId = searchParams.get('id');

  if (!uploadId) {
    return NextResponse.json(
      { error: 'Upload ID required' },
      { status: 400 }
    );
  }

  try {
    await prisma.documentUpload.delete({
      where: {
        id: uploadId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete upload error:', error);
    return NextResponse.json(
      { error: 'Failed to delete upload' },
      { status: 500 }
    );
  }
}


