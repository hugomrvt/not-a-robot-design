import { promises as fs } from 'fs'
import path from 'path'
import { VISIT_CONFIG, ERROR_MESSAGES } from './constants'

export interface VisitorData {
  totalVisits: number
  uniqueVisitors: Set<string>
  lastUpdated: string
}

export interface SerializableVisitorData {
  totalVisits: number
  uniqueVisitors: string[]
  lastUpdated: string
}

export interface VisitorStats {
  totalVisits: number
  uniqueVisitors: number
}

/**
 * Service for managing visitor data persistence
 */
export class VisitorService {
  private readonly counterFile: string

  constructor() {
    this.counterFile = path.join(process.cwd(), VISIT_CONFIG.COUNTER_FILE)
  }

  /**
   * Read visitor data from file
   */
  async readVisitorData(): Promise<VisitorData> {
    try {
      const data = await fs.readFile(this.counterFile, 'utf-8')
      const parsed: SerializableVisitorData = JSON.parse(data)
      return {
        totalVisits: parsed.totalVisits || 0,
        uniqueVisitors: new Set(parsed.uniqueVisitors || []),
        lastUpdated: parsed.lastUpdated || new Date().toISOString()
      }
    } catch (error) {
      // File doesn't exist or is corrupted, return default data
      return this.getDefaultVisitorData()
    }
  }

  /**
   * Write visitor data to file
   */
  async writeVisitorData(data: VisitorData): Promise<void> {
    const serializable: SerializableVisitorData = {
      totalVisits: data.totalVisits,
      uniqueVisitors: Array.from(data.uniqueVisitors),
      lastUpdated: data.lastUpdated
    }
    await fs.writeFile(this.counterFile, JSON.stringify(serializable, null, 2))
  }

  /**
   * Get default visitor data
   */
  private getDefaultVisitorData(): VisitorData {
    return {
      totalVisits: 0,
      uniqueVisitors: new Set(),
      lastUpdated: new Date().toISOString()
    }
  }

  /**
   * Convert VisitorData to VisitorStats
   */
  toStats(data: VisitorData): VisitorStats {
    return {
      totalVisits: data.totalVisits,
      uniqueVisitors: data.uniqueVisitors.size
    }
  }

  /**
   * Generate a visitor ID based on request headers
   */
  generateVisitorId(request: Request): string {
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

  /**
   * Increment visitor count
   */
  async incrementVisitorCount(request?: Request): Promise<VisitorStats> {
    try {
      const data = await this.readVisitorData()
      
      // Always increment total visits
      data.totalVisits += 1
      
      // If we have request headers, try to track unique visitors
      if (request) {
        const visitorId = this.generateVisitorId(request)
        data.uniqueVisitors.add(visitorId)
      }
      
      data.lastUpdated = new Date().toISOString()
      
      await this.writeVisitorData(data)
      
      return this.toStats(data)
    } catch (error) {
      console.error('Error updating visitor count:', error)
      // Return a fallback count
      return {
        totalVisits: 1,
        uniqueVisitors: 1
      }
    }
  }

  /**
   * Get current visitor count
   */
  async getVisitorCount(): Promise<VisitorStats> {
    try {
      const data = await this.readVisitorData()
      return this.toStats(data)
    } catch (error) {
      console.error('Error reading visitor count:', error)
      return {
        totalVisits: 0,
        uniqueVisitors: 0
      }
    }
  }
}

// Singleton instance
export const visitorService = new VisitorService()
