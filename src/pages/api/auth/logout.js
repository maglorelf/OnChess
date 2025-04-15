export function get() {
  return new Response(
    JSON.stringify({ success: true }),
    { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Clear the auth cookie
        "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
      }
    }
  );
}