// proxy.ts — Next 16 replacement for the deprecated middleware file convention
import { NextResponse } from 'next/server'

export default async function proxy(_req: Request) {
  // Auth is enforced client-side by AdminShell (user.isAdmin); kept as a hook for future redirects
  return NextResponse.next()
}
