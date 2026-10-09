```javascript
export default async (req) => {
  const headers = {
    "Content-Type": "application/json"
  };

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Use POST to submit a message." }),
      { status: 405, headers }
    );
  }

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Please fill in all fields." }),
        { status: 400, headers }
      );
    }

    const apiKey = Netlify.env.get("RESEND_API_KEY");

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is missing");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
      
       "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["ovronillre@gmail.com"],
        reply_to: email,
        subject: "Portfolio Contact: " + subject,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "Email sending failed.",
          details: result.message || result.name || "Resend error"
        }),
        { status: 502, headers }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact email sent successfully."
      }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Could not send contact email.",
        details: error.message
      }),
      { status: 500, headers }
    );
  }
};
```
