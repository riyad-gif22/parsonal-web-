
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Use POST to submit a message." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const data = await req.json();

    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Please fill in all fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact message received by backend."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request data." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};