"use server"

import { promises as fs } from 'fs'
import path from 'path'

const COUNTER_FILE = path.join(process.cwd(), 'visitor-count.json')

interface VisitorData {
  totalVisits: number
  uniqueVisitors: Set<string>
  lastUpdated: string
}

// Helper function to read visitor data from file
async function readVisitorData(): Promise<VisitorData> {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    return {
      totalVisits: parsed.totalVisits || 0,
      uniqueVisitors: new Set(parsed.uniqueVisitors || []),
      lastUpdated: parsed.lastUpdated || new Date().toISOString()
    }
  } catch (error) {
    // File doesn't exist or is corrupted, return default data
    return {
      totalVisits: 0,
      uniqueVisitors: new Set(),
      lastUpdated: new Date().toISOString()
    }
  }
}

// Helper function to write visitor data to file
async function writeVisitorData(data: VisitorData): Promise<void> {
  const serializable = {
    totalVisits: data.totalVisits,
    uniqueVisitors: Array.from(data.uniqueVisitors),
    lastUpdated: data.lastUpdated
  }
  await fs.writeFile(COUNTER_FILE, JSON.stringify(serializable, null, 2))
}

// Generate a visitor ID based on IP and User Agent (simplified fingerprinting)
function generateVisitorId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  // Create a simple hash of IP + User Agent
  const combined = `${ip}-${userAgent}`
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

export async function incrementVisitorCount(request?: Request) {
  try {
    const data = await readVisitorData()
    
    // Always increment total visits
    data.totalVisits += 1
    
    // If we have request headers, try to track unique visitors
    if (request) {
      const visitorId = generateVisitorId(request)
      data.uniqueVisitors.add(visitorId)
    }
    
    data.lastUpdated = new Date().toISOString()
    
    await writeVisitorData(data)
    
    return {
      totalVisits: data.totalVisits,
      uniqueVisitors: data.uniqueVisitors.size
    }
  } catch (error) {
    console.error('Error updating visitor count:', error)
    // Return a fallback count
    return {
      totalVisits: 1,
      uniqueVisitors: 1
    }
  }
}

export async function getVisitorCount() {
  try {
    const data = await readVisitorData()
    return {
      totalVisits: data.totalVisits,
      uniqueVisitors: data.uniqueVisitors.size
    }
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return {
      totalVisits: 0,
      uniqueVisitors: 0
    }
  }
}
