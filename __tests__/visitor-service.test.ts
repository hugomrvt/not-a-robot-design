import { VisitorService } from '@/lib/visitor-service'
import { promises as fs } from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}))

const mockFs = fs as jest.Mocked<typeof fs>

describe('VisitorService', () => {
  let visitorService: VisitorService
  const testCounterFile = path.join(process.cwd(), 'visitor-count.json')

  beforeEach(() => {
    visitorService = new VisitorService()
    jest.clearAllMocks()
  })

  describe('readVisitorData', () => {
    it('should return default data when file does not exist', async () => {
      mockFs.readFile.mockRejectedValue(new Error('File not found'))

      const result = await visitorService.readVisitorData()

      expect(result.totalVisits).toBe(0)
      expect(result.uniqueVisitors.size).toBe(0)
      expect(result.lastUpdated).toBeDefined()
    })

    it('should parse existing file data correctly', async () => {
      const mockData = {
        totalVisits: 100,
        uniqueVisitors: ['visitor1', 'visitor2'],
        lastUpdated: '2023-01-01T00:00:00.000Z'
      }
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData))

      const result = await visitorService.readVisitorData()

      expect(result.totalVisits).toBe(100)
      expect(result.uniqueVisitors.size).toBe(2)
      expect(result.uniqueVisitors.has('visitor1')).toBe(true)
      expect(result.uniqueVisitors.has('visitor2')).toBe(true)
      expect(result.lastUpdated).toBe('2023-01-01T00:00:00.000Z')
    })
  })

  describe('writeVisitorData', () => {
    it('should serialize and write data correctly', async () => {
      const testData = {
        totalVisits: 50,
        uniqueVisitors: new Set(['visitor1', 'visitor2', 'visitor3']),
        lastUpdated: '2023-01-01T12:00:00.000Z'
      }

      await visitorService.writeVisitorData(testData)

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        testCounterFile,
        JSON.stringify({
          totalVisits: 50,
          uniqueVisitors: ['visitor1', 'visitor2', 'visitor3'],
          lastUpdated: '2023-01-01T12:00:00.000Z'
        }, null, 2)
      )
    })
  })

  describe('generateVisitorId', () => {
    it('should generate consistent ID for same headers', () => {
      const mockRequest = {
        headers: {
          get: jest.fn((header: string) => {
            if (header === 'x-forwarded-for') return '192.168.1.1'
            if (header === 'user-agent') return 'Mozilla/5.0 Test Browser'
            return null
          })
        }
      } as unknown as Request

      const id1 = visitorService.generateVisitorId(mockRequest)
      const id2 = visitorService.generateVisitorId(mockRequest)

      expect(id1).toBe(id2)
      expect(typeof id1).toBe('string')
    })

    it('should generate different IDs for different headers', () => {
      const mockRequest1 = {
        headers: {
          get: jest.fn((header: string) => {
            if (header === 'x-forwarded-for') return '192.168.1.1'
            if (header === 'user-agent') return 'Mozilla/5.0 Test Browser'
            return null
          })
        }
      } as unknown as Request

      const mockRequest2 = {
        headers: {
          get: jest.fn((header: string) => {
            if (header === 'x-forwarded-for') return '192.168.1.2'
            if (header === 'user-agent') return 'Mozilla/5.0 Different Browser'
            return null
          })
        }
      } as unknown as Request

      const id1 = visitorService.generateVisitorId(mockRequest1)
      const id2 = visitorService.generateVisitorId(mockRequest2)

      expect(id1).not.toBe(id2)
    })
  })

  describe('incrementVisitorCount', () => {
    it('should increment total visits and add unique visitor', async () => {
      const mockData = {
        totalVisits: 10,
        uniqueVisitors: ['existing-visitor'],
        lastUpdated: '2023-01-01T00:00:00.000Z'
      }
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData))
      mockFs.writeFile.mockResolvedValue()

      const mockRequest = {
        headers: {
          get: jest.fn((header: string) => {
            if (header === 'x-forwarded-for') return '192.168.1.1'
            if (header === 'user-agent') return 'Mozilla/5.0 Test Browser'
            return null
          })
        }
      } as unknown as Request

      const result = await visitorService.incrementVisitorCount(mockRequest)

      expect(result.totalVisits).toBe(11)
      expect(result.uniqueVisitors).toBe(2) // existing + new visitor
      expect(mockFs.writeFile).toHaveBeenCalled()
    })

    it('should handle errors gracefully', async () => {
      mockFs.readFile.mockRejectedValue(new Error('Read error'))
      mockFs.writeFile.mockRejectedValue(new Error('Write error'))

      const result = await visitorService.incrementVisitorCount()

      expect(result.totalVisits).toBe(1)
      expect(result.uniqueVisitors).toBe(1)
    })
  })

  describe('getVisitorCount', () => {
    it('should return current visitor statistics', async () => {
      const mockData = {
        totalVisits: 25,
        uniqueVisitors: ['visitor1', 'visitor2', 'visitor3'],
        lastUpdated: '2023-01-01T00:00:00.000Z'
      }
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData))

      const result = await visitorService.getVisitorCount()

      expect(result.totalVisits).toBe(25)
      expect(result.uniqueVisitors).toBe(3)
    })

    it('should handle read errors gracefully', async () => {
      mockFs.readFile.mockRejectedValue(new Error('Read error'))

      const result = await visitorService.getVisitorCount()

      expect(result.totalVisits).toBe(0)
      expect(result.uniqueVisitors).toBe(0)
    })
  })

  describe('toStats', () => {
    it('should convert VisitorData to VisitorStats correctly', () => {
      const testData = {
        totalVisits: 42,
        uniqueVisitors: new Set(['visitor1', 'visitor2', 'visitor3', 'visitor4']),
        lastUpdated: '2023-01-01T00:00:00.000Z'
      }

      const result = visitorService.toStats(testData)

      expect(result.totalVisits).toBe(42)
      expect(result.uniqueVisitors).toBe(4)
    })
  })
})