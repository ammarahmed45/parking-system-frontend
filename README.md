# Parking Reservation Frontend

A frontend interface for the Parking Reservation System, built with **React.js** and fully integrated with the backend (Express API + WebSocket).

---

## Purpose
This project was developed to demonstrate:
- Full integration with backend APIs.
- Displaying real-time parking data (zones, gates, subscriptions, reports).
- Supporting both **Admin** and **Employee** dashboards.
- Handling ticket **Check-in / Checkout** processes.

---

## Features
- Authentication (Admin / Employee).
- Manage subscriptions.
- View parking state reports.
- Update categories and rates.
- Open/close zones.
- Add rush hours.
- Add vacations.
- Ticket checkout (visitor or subscription).

---

## Backend Endpoints Used
- `POST /api/v1/auth/login`
- `GET  /api/v1/master/gates`
- `GET  /api/v1/master/zones`
- `GET  /api/v1/master/categories`
- `GET  /api/v1/subscriptions/:id`
- `POST /api/v1/tickets/checkin`
- `POST /api/v1/tickets/checkout`
- `GET  /api/v1/tickets/:id`
- `GET  /api/v1/admin/reports/parking-state`
- `PUT  /api/v1/admin/categories/:id`
- `PUT  /api/v1/admin/zones/:id/open`
- `POST /api/v1/admin/rush-hours`
- `POST /api/v1/admin/vacations`
- `GET  /api/v1/admin/subscriptions`

---

## Run Locally
1. Clone the project:
   ```bash
   git clone https://github.com/ammarahmed45/parking-system-frontend.git
   cd parking-system-frontend
