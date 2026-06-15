import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function deleteUploadedFile(url: string | null | undefined) {
  if (!url) return
  
  // Clean up paths starting with /images/uploads/ or /uploads/
  if (url.startsWith('/images/uploads/') || url.startsWith('/uploads/')) {
    try {
      const filePath = join(process.cwd(), 'public', url)
      if (existsSync(filePath)) {
        await unlink(filePath)
        console.log(`Successfully deleted file: ${filePath}`)
      }
    } catch (error) {
      console.error(`Failed to delete file at ${url}:`, error)
    }
  }
}
