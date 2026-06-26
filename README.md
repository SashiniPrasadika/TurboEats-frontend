# TurboEats Frontend

React + Vite + MUI frontend for the TurboEats food delivery platform.

## Quick Start

```bash
cd turboeats-frontend
npm install
npm start          # dev server on http://localhost:5173
npm run build      # production build
```

Make sure the backend is running on http://localhost:5000 first.

## Tech Stack
- **React 19** + **Vite 7**
- **MUI 7** (Material UI) — component library
- **React Router 7** — routing
- **Axios** — API calls
- **Formik + Yup** — form handling

## Pages & Routes

### Customer
| Route | Page |
|-------|------|
| `/` | Home — hero, categories, restaurant grid |
| `/restaurants` | All restaurants with search & filters |
| `/restaurants/:id` | Restaurant detail + menu + add to cart |
| `/cart` | Cart with qty controls, promo code, order summary |
| `/orders` | My orders + live delivery tracker |
| `/favorites` | Saved restaurants |
| `/profile` | Edit profile |
| `/security` | Change password |

### Admin Dashboard
| Route | Page |
|-------|------|
| `/dashboard` | Overview — stats cards + recent orders |
| `/dashboard/orders` | All orders table + inline status update |
| `/dashboard/restaurants` | CRUD restaurants |
| `/dashboard/users` | View + activate/deactivate users |

### Auth
| Route | Page |
|-------|------|
| `/login` | Email + password login with demo buttons |
| `/register` | New account registration |

## Demo Credentials
After starting the backend:
- **Admin**: admin@turboeats.lk / admin123  → redirects to `/dashboard`
- **Customer**: sashini@student.kdu.ac.lk / password123  → redirects to `/`

## Environment Variables
```
VITE_APP_BASE_NAME=/
VITE_API_BASE_URL=http://localhost:5000/api
```
