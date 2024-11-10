import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeDb } from './db/config';

export const config = {
  matcher: '/:path*',  // This is the correct syntax for matching all routes
};

export function middleware(request: NextRequest) {
  // Initialize DB if we're in a Cloudflare Pages environment
  if (process.env.CF_PAGES && (request as any).env?.DB) {
    initializeDb((request as any).env.DB);
  }
  
  return NextResponse.next();
}
