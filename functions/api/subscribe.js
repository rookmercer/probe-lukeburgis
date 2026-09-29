export async function onRequestPost(context) {
  const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
  try {
    const body = await context.request.json();
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return new Response(JSON.stringify({ ok: false }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    if (body.website) return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    const res = await fetch('https://api.beehiiv.com/v2/publications/' + (context.env.BEEHIIV_PUBLICATION_ID || 'pub_53234055-ef5c-4686-a57b-bf76fed2d76c') + '/subscriptions', {
      method: 'POST', headers: { 'Authorization': 'Bearer ' + context.env.BEEHIIV_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: body.email, reactivate_existing: true, send_welcome_email: true, utm_source: 'lukeburgis.com', utm_medium: body.source || 'home-band', referring_site: 'https://lukeburgis.com' }),
    });
    return new Response(JSON.stringify({ ok: res.ok }), { status: res.ok ? 200 : 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch (e) { return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }); }
}
export async function onRequestOptions() { return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } }); }
