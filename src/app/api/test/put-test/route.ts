import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT test received:', body);
    
    return NextResponse.json({
      success: true,
      message: 'PUT method works!',
      received: body
    });
  } catch (error: any) {
    console.error('PUT test error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'PUT test API is working'
  });
}

export const runtime = 'nodejs';
