import { verifyWebhook } from '@clerk/nextjs/webhooks'
export async function POST(req) {
  try {
    const rawBody = await req.text(); 
    const evt = await verifyWebhook({
      req,
      rawBody,
    });
    const eventType = evt.type;
    if (eventType === 'session.created') {
      console.log(`User signed in: ${evt.data.user_id}`);
    }
    if (eventType === 'user.created') {
      console.log("user created");
    }
    if (eventType === 'user.deleted') {
      console.log("user deleted");
    }
    if (eventType === 'user.updated') {
      console.log("user updated");
    }
    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
