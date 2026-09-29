export async function onRequestPost(context) {
  const h = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  try {
    const b = await context.request.json();
    if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return new Response(JSON.stringify({ok:false}),{status:400,headers:{'Content-Type':'application/json',...h}});
    if (b.website) return new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json',...h}});
    const r = await fetch('https://api.beehiiv.com/v2/publications/'+(context.env.BEEHIIV_PUBLICATION_ID||'pub_53234055-ef5c-4686-a57b-bf76fed2d76c')+'/subscriptions',{
      method:'POST',headers:{'Authorization':'Bearer '+context.env.BEEHIIV_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({email:b.email,reactivate_existing:true,send_welcome_email:true,utm_source:'lukeburgis.com',utm_medium:b.source||'home-band',referring_site:'https://lukeburgis.com'})
    });
    return new Response(JSON.stringify({ok:r.ok}),{status:r.ok?200:502,headers:{'Content-Type':'application/json',...h}});
  } catch(e){return new Response(JSON.stringify({ok:false}),{status:500,headers:{'Content-Type':'application/json',...h}})}
}
export async function onRequestOptions(){return new Response(null,{headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'}})}
