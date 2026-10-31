# 🌍 WanderLust – Explore the World, One Journey at a Time

<div align="center">

### ✈️ Discover destinations. Plan your journey. Create unforgettable memories.

**Your next adventure starts here.**

WanderLust is a modern travel and destination booking web application where users can explore beautiful destinations, discover travel packages, and book their next adventure.

Built with Next.js, React, Express.js, and MongoDB, WanderLust provides a responsive travel experience with user authentication and destination management.

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Better_Auth-6C47FF?style=for-the-badge" alt="Better Auth" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p>
  <a href="#-features">Features</a> •
  <a href="#-pages-and-functionality">Pages</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-getting-started">Installation</a>
</p>

</div>

---

## 🌿 About the Project

**WanderLust** is a travel and destination booking platform designed to help travelers discover destinations and organize their journeys.

Users can explore available travel destinations, view destination details, check travel prices and schedules, and make bookings through a simple interface.

The application also includes authentication and destination management features, making it possible to manage travel information through a connected frontend and backend.

The main goal is to provide a smooth and accessible travel booking experience with a clean interface and practical functionality.

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🌍 Explore Destinations</h3>
      Browse available travel destinations with images, descriptions, locations, and prices.
    </td>
    <td width="50%">
      <h3>⭐ Featured Destinations</h3>
      Discover selected destinations displayed in an interactive carousel.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📖 Destination Details</h3>
      View detailed travel information, including country, category, price, duration, and departure date.
    </td>
    <td width="50%">
      <h3>🎫 Travel Booking</h3>
      Book destinations and save booking information for future reference.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>👤 Authentication</h3>
      Register and sign in using Better Auth with session management.
    </td>
    <td width="50%">
      <h3>🧳 My Bookings</h3>
      View previously created bookings and cancel bookings.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>➕ Add Destinations</h3>
      Authenticated users can add new destination information.
    </td>
    <td width="50%">
      <h3>✏️ Manage Destinations</h3>
      Update and delete destination records through backend API operations.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📱 Responsive Design</h3>
      Responsive layouts for desktop, tablet, and mobile devices.
    </td>
    <td width="50%">
      <h3>🔐 Protected Operations</h3>
      JWT verification protects destination creation and update operations.
    </td>
  </tr>
</table>

## 🖥️ Pages and Functionality

| Section | Functionality |
|---|---|
| 🏠 Home | Introduces WanderLust and highlights travel destinations |
| 🧭 Navbar | Navigation links, brand identity, and authentication controls |
| 🌄 Hero Banner | Main introduction and travel exploration call to action |
| ⭐ Featured Destinations | Displays selected destinations using a carousel |
| 🌍 Destinations | Displays available destinations |
| 📖 Destination Details | Shows detailed information about an individual destination |
| 🎫 Booking | Allows users to book a selected destination |
| 🧳 My Bookings | Displays and manages user bookings |
| ➕ Add Destination | Form for adding new destination records |
| ✏️ Edit Destination | Updates existing destination information |
| 🔐 Login | User sign-in |
| 📝 Signup | New user registration |
| 🦶 Footer | Additional navigation and project information |

## 🎨 Design and User Experience

WanderLust follows a modern travel-focused visual style designed to make destination discovery enjoyable.

**Design principles**

- Clean layouts with clear content hierarchy.
- Large destination photography to create a travel-focused experience.
- Consistent spacing and reusable UI components.
- Responsive destination cards and carousel layouts.
- Clear navigation between destinations and booking pages.
- Simple authentication and booking interactions.
- Loading, error, and empty states for a better user experience.

## ⚙️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework and App Router |
| React 19 | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling |
| shadcn/ui | Reusable UI components |
| Express.js | Backend REST API |
| MongoDB | Database and document storage |
| MongoDB Node.js Driver | Database connectivity and CRUD operations |
| Better Auth | Authentication and session management |
| JOSE | JWT verification |
| Vercel | Frontend and backend deployment |

## 🔌 API Reference

**Backend Base URL**

```text
https://wanderlust-backend-rho.vercel.app
```

### Destination APIs

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| GET | `/destinations` | Retrieve all destinations | Public |
| GET | `/destinations/:id` | Retrieve one destination | Public |
| GET | `/featured-destinations` | Retrieve up to five featured destinations | Public |
| POST | `/destinations` | Add a new destination | Required |
| PATCH | `/destination/:id` | Update a destination | Required |
| DELETE | `/destinations/:id` | Delete a destination | Public |

### Booking APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/booking` | Create a booking |
| GET | `/myBookings/:email` | Retrieve bookings by email |
| DELETE | `/myBookings/:id` | Cancel a booking |

### Example API Request

Retrieve all destinations:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL

const response = await fetch(`${API_URL}/destinations`, {
  cache: "no-store",
})

if (!response.ok) {
  throw new Error("Failed to fetch destinations")
}

const destinations = await response.json()
```

Retrieve a specific destination:

```ts
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`,
  {
    cache: "no-store",
  }
)

if (!response.ok) {
  throw new Error("Failed to fetch destination")
}

const destination = await response.json()
```

## 🗄️ Database Structure

WanderLust uses MongoDB with a database named `wanderlust`.

**Database collections**

| Collection | Purpose |
|---|---|
| `destination` | Stores destination and travel package information |
| `bookings` | Stores booking information submitted by users |

**Destination document example**

```json
{
  "_id": "6adfaab7f9c7dda83f008907",
  "name": "Sajek Valley Adventure",
  "country": "Bangladesh",
  "category": "Mountain",
  "price": 12000,
  "duration": "3 Days, 2 Nights",
  "departureDate": "2026-11-20",
  "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  "description": "Explore green hills, clouds, mountain viewpoints, and peaceful village scenery in Sajek."
}
```

## 🔐 Authentication and Security

WanderLust uses Better Auth for authentication and session management.

The backend uses JWT verification through the JOSE library and the Better Auth JWKS endpoint.

**Authentication features**

- User registration and sign-in.
- Session management.
- JWT-based backend authorization.
- Protected destination creation.
- Protected destination update operations.
- Trusted frontend origins.

Sensitive configuration values are stored in environment variables and should never be committed to GitHub.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB database
- A Better Auth configuration

### 1. Clone the repository

```bash
git clone https://github.com/NusrathChowdhury/Wonderlust.git
```

### 2. Enter the project directory

```bash
cd Wonderlust
```

### 3. Frontend Setup

Navigate to the frontend:

```bash
cd wanderlust_Client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the frontend directory:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

### 4. Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd WanderLust_Server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

If your backend `package.json` does not have a `dev` script, use the start command configured in that file.

Backend:

```text
http://localhost:5000
```

### 5. Verify the Application

Open the frontend in your browser:

```text
http://localhost:3000
```

Make sure:

- The backend connects successfully to MongoDB.
- Destinations load correctly.
- Featured destinations appear.
- User authentication works.
- Destination booking and management operations work.

## 📁 Project Structure

The project is organized into separate frontend and backend applications.

```text
WonderLust/
│
├── wanderlust_Client/
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── destinations/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── add-destination/
│   │   │   ├── myBookings/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── booking/
│   │   │   └── ui/
│   │   │
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   └── destinations.ts
│   │   │
│   │   └── ...
│   │
│   ├── .env.local
│   ├── package.json
│   └── ...
│
├── WanderLust_Server/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── ...
│
└── README.md
```

*Note: This is a representative structure based on the shared project files. Some component and route filenames may differ from your latest local version.*

## 🌐 Deployment

The application is being prepared for production deployment using Vercel.

| Application | Deployment Status |
|---|---|
| Frontend | Coming Soon |
| Backend | Deployed |
| Database | MongoDB Atlas |

Deployment links will be added here once the final production website is ready.

## 🔗 Project Links

| Resource | Link |
|---|---|
| 🌍 Live Website | Coming Soon |
| 💻 GitHub Repository | [NusrathChowdhury/Wonderlust](https://github.com/NusrathChowdhury/Wonderlust) |
| ⚙️ Backend API | [WanderLust Backend](https://wanderlust-backend-rho.vercel.app) |

## 👩‍💻 Author

**Fouzia Nusrath Chowdhury**

BSc in Computer Science and Engineering  
North East University Bangladesh

- GitHub: [NusrathChowdhury](https://github.com/NusrathChowdhury)

---

<div align="center">

### ✈️ WanderLust

**Explore more. Travel farther. Make memories.**

<sub>Built with ❤️ using Next.js, Express.js, MongoDB, and Better Auth.</sub>

</div>