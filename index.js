// EuPago Payment Validation API for Cloudflare Workers
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");

    if (!userID) {
      return new Response(JSON.stringify({ error: "userID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔒 Secure API Key stored in Cloudflare Workers environment variables
    const API_KEY = env.EUPAGO_API_KEY;

    try {
      // Call EuPago API to check payment status
      const response = await fetch("https://api.eupago.pt/consulta-pagamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ userID }),
      });

      const data = await response.json();

      // Determine if the payment was completed
      const paid = data.status === "paid";

      return new Response(JSON.stringify({ userID, status: paid ? "paid" : "pending" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error checking payment status" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
