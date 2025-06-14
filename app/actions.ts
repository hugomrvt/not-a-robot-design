"use server"

import { visitorService } from '@/lib/visitor-service'
import type { VisitorStats } from '@/lib/visitor-service'

/**
 * Increment visitor count with optional request for unique visitor tracking
 */
export async function incrementVisitorCount(request?: Request): Promise<VisitorStats> {
  return visitorService.incrementVisitorCount(request)
}

/**
 * Get current visitor count statistics
 */
export async function getVisitorCount(): Promise<VisitorStats> {
  return visitorService.getVisitorCount()
}
