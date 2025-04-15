import { generateToken, getUserByCredentials } from "../../../lib/utils/auth";

export async function post({ request }) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Authenticate user
    const user = await getUserByCredentials(email, password);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user and token
    return new Response(
      JSON.stringify({ 
        user: { 
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }, 
        token 
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
        } 
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}