// app/api/webhooks/route.js
console.log("hello");
import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
if (!WEBHOOK_SECRET) {
  throw new Error('Missing Clerk Webhook Secret');
}

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const payload = await req.text();
    const headers = req.headers;

    const svixId = headers.get('svix-id');
    const svixTimestamp = headers.get('svix-timestamp');
    const svixSignature = headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('Missing Svix headers');
      return NextResponse.json({ error: 'Missing Svix headers' }, { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });

    console.log('✅ Verified webhook:', evt.type);
    console.log('Event data:', evt.data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Webhook verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }
}
