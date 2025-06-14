"use server"

// This is a simple in-memory counter that will persist until the server restarts
let visitorCount = 0

export async function incrementVisitorCount() {
  visitorCount += 1
  return visitorCount
}
