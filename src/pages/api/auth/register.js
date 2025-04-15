import { generateToken, hashPassword, users, USER_ROLES } from "../../../lib/utils/auth";

export async function post({ request }) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate input
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return new Response(
        JSON.stringify({ message: "User with this email already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create new user
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: (users.length + 1).toString(),
      username,
      email,
      password: hashedPassword,
      role: USER_ROLES.NORMAL // Default role for new users
    };

    // Add to mock database
    users.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    // Return user and token
    return new Response(
      JSON.stringify({ 
        user: { 
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        }, 
        token 
      }),
      { 
        status: 201, 
        headers: { 
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
        } 
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}