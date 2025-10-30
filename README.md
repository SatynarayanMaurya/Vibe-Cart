# 🛒 VibeCart – Full Stack Shopping Cart App

A full-stack mock e-commerce shopping cart application built using **React.js**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**.  
This project demonstrates product listing, add/remove cart items, quantity updates, and a mock checkout flow — all through RESTful APIs.

---

## 🚀 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios (for API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

**Tools:**
- Nodemon (for backend auto-reload)
- Concurrently (to run frontend & backend together)
- Git & GitHub (for version control)

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SatynarayanMaurya/Vibe-Cart.git
cd Vibe-Cart
```

### 2️⃣ Install Dependencies
#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables
#### Create a .env file in the backend folder:
```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV = "development"
```
#### Create a .env file in the frontend folder:
```bash
VITE_BASE_URL = "http://localhost:4000"
```


### 4️⃣ Run the Application ( Both Frontend and backend )
```bash
npm run dev 
```

## 🧩 API Endpoints

Below is the list of all the available API routes used in this project, grouped by functionality.

---

### 🔐 **Authentication Routes**

| Method | Endpoint | Description |
|:------:|:----------|:-------------|
| `POST` | `/api/signup` | Register a new user account. Requires user details like name, email, and password. |
| `POST` | `/api/login` | Authenticate a user and return a JWT token for future requests. |

---

### 🛍️ **Product Routes**

| Method | Endpoint | Description |
|:------:|:----------|:-------------|
| `GET` | `/api/products` | Fetch all available products. |
| `GET` | `/api/cart` | Get all products currently in the user's cart. (Requires authentication) |
| `POST` | `/api/addToCart` | Add a specific product to the user's cart. (Requires authentication) |
| `POST` | `/api/removeItemFromCart` | Remove a single product from the user's cart by name. (Requires authentication) |
| `DELETE` | `/api/removeAllItemFromCart` | Remove all products from the user's cart. (Requires authentication) |
| `PUT` | `/api/increaseQuantity` | Increase the quantity of a specific product in the user's cart. (Requires authentication) |
| `PUT` | `/api/decreaseQuantity` | Decrease the quantity of a specific product in the user's cart. (Requires authentication) |

---


### 🧪 **Demo Account (For Quick Access)**

If you don't want to register a new account, you can use the following **dummy user credentials** to explore all the features of the app:

```bash
Email: johndoe@gmail.com
Password: 1234
```


## 🖼️ Screenshots

### Home Page
![Sign In Screenshot](https://drive.google.com/uc?export=view&id=1PADUY0ZFVdSCgooiU0WX82G8wl5J-ikt)


### Cart Side bar
![Dashboard Screenshot](https://drive.google.com/uc?export=view&id=15LvDn8HS4GfhObtb8FvgKUBGSmkVLkud)

### Check Out Page
![Schedules Screenshot](https://drive.google.com/uc?export=view&id=1Q8ys8sTzat26uOTCAWKc5mKCTfk43NW2)

### Order Placed
![Users Screenshot](https://drive.google.com/uc?export=view&id=1PlkNZet32CM_ZTObYQxOfR7jzLhmqdRz)


---

