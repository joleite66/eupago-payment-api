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

    // Retrieve Client ID and Secret from Cloudflare Environment Variables
    const CLIENT_ID = env.EUPAGO_CLIENT_ID;
    const CLIENT_SECRET = env.EUPAGO_CLIENT_SECRET;

    try {
      // Step 1: Get Authentication Token from EuPago
      const authResponse = await fetch("https://sandbox.eupago.pt/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        }),
      });

      const authData = await authResponse.json();
      const accessToken = authData.access_token;

      if (!accessToken) {
        throw new Error("Failed to obtain access token from EuPago.");
      }

      // Step 2: Query Payment Status Using Access Token
      const response = await fetch(`https://sandbox.eupago.pt/api/consulta-pagamentos?userID=${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      const paid = data.status === "pago";

      return new Response(JSON.stringify({ userID, status: paid ? "paid" : "pending" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error checking payment status", details: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

