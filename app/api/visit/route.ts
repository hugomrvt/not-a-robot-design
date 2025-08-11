import { NextRequest, NextResponse } from 'next/server'
import { incrementVisitorCount, getVisitorCount } from '@/app/actions'

export async function POST(request: NextRequest) {
  try {
    const result = await incrementVisitorCount(request)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in visit API:', error)
    return NextResponse.json(
      { error: 'Failed to update visit count' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const result = await getVisitorCount()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in visit API:', error)
    return NextResponse.json(
      { error: 'Failed to get visit count' },
      { status: 500 }
    )
  }
}
