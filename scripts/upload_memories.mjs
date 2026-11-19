import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://zqctadeszfnpnqopiamb.supabase.co'
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxY3RhZGVzemZucG5xb3BpYW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MjY1MjksImV4cCI6MjEwNTUwMjUyOX0.focyi4tpgjkGyOxA96mqT3WnAAu6pdR4CIEHUh-z-S0'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const MEMORIES_DIR = path.resolve(__dirname, '../public/memories')

const FILES_TO_UPLOAD = [
  'master_of_none_trap.jpg',
  'interactive_session.jpg',
  'society_orientation.jpg',
  'cohort_energy.jpg',
  'workshop_cohort.jpg',
]

async function uploadAll() {
  console.log('Connecting to Supabase Storage...')
  console.log(`Target Bucket: "memories"`)

  for (const fileName of FILES_TO_UPLOAD) {
    const filePath = path.join(MEMORIES_DIR, fileName)
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`)
      continue
    }

    const fileBuffer = fs.readFileSync(filePath)
    console.log(`Uploading ${fileName} (${fileBuffer.length} bytes)...`)

    const { data, error } = await supabase.storage
      .from('memories')
      .upload(fileName, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      })

    if (error) {
      console.error(`Failed to upload ${fileName}:`, error.message)
    } else {
      const { data: pubUrl } = supabase.storage.from('memories').getPublicUrl(fileName)
      console.log(`Successfully uploaded: ${fileName}`)
      console.log(`Public URL: ${pubUrl.publicUrl}`)
    }
  }
}

uploadAll()

