import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)
    const { id } = evt.data
    const eventType = evt.type
    if (eventType === 'user.created') {
        console.log("user created")
    }
    if (eventType === 'user.deleted') {
        console.log("user deleted")
    }
    if (eventType === 'user.updated') {
        console.log("user updated")
    }
    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}