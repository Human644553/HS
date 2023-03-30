import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export async function getAboutPageData() {
  const entry = await client.getEntry('6iaDv5fDnZH0S739bktu8Z')

  const title = entry.fields.pageTitle

  // Check if entry.fields.pageCopy is defined before accessing the 'content' property
  const pageCopy = entry.fields.pageCopy || { content: [] }

  return { title, pageCopy }
}
