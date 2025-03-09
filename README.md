# EuPago Payment API for Cloudflare Workers 🚀

A serverless API to validate payments with **EuPago** using **Cloudflare Workers**. This API receives a `userID`, queries the EuPago API, and returns the payment status (`paid` or `pending`).

## 📌 Features
- 🔐 **Secure** → **API Keys are stored** as environment variables.
- 💸 **Free** → Hosted for free on **Cloudflare Workers**.
- ⚡ **Fast** → Quickly returns the payment status.
- 📡 **Easy to use** → Simply call `GET /check-payment?userID=123`.

---

## 🚀 How to Use

### 1️⃣ **Clone the Repository**
```sh
 git clone https://github.com/your-user/eupago-payment-api.git
 cd eupago-payment-api
```

### 2️⃣ **Install Wrangler (Cloudflare Workers CLI)**
```sh
npm install -g wrangler
```

### 3️⃣ **Configure Cloudflare Workers**
1. Create a free account at [Cloudflare Workers](https://workers.cloudflare.com/)
2. Create a new Worker in the Cloudflare dashboard
3. **Add the EuPago API Key** as an environment variable:
```sh
wrangler secret put EUPAGO_API_KEY
```

### 4️⃣ **Deploy the API**
```sh
wrangler publish
```

---

## 📡 How to Use the API

### 🔹 Check a User's Payment Status
```sh
GET https://your-cloudflare-worker.com/check-payment?userID=123
```

### 🔹 JSON Response
```json
{
  "userID": "123",
  "status": "paid"
}
```

- `status: "paid"` → The payment has been completed ✅
- `status: "pending"` → The payment is still pending ⚠️

---

## 🔐 Security
- **Never expose the API Key in your source code**
- **Use environment variables** (`wrangler secret put EUPAGO_API_KEY`)
- **If additional security is needed, keep the repository private**

---

## 📜 License
This project is available under the **MIT** license. 🚀
