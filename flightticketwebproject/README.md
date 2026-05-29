# Flight Ticket Tracker

An application that tracks the flight prices from time to time and notifies users when prices drop. <br>
There are three version (Desktop, Web and Mobile) for users.
This is the **Web version**.<br>
Project main page: https://github.com/CY-Marowak/FlightTicketProject

	
## Tech Stack
1. 運行 React + Vite
2. 語言 TypeScript

## How to use
Go to webiste:<br>
https://flightticketwebproject.onrender.com/

## Web project structure
:::spoiler
src/<br>
│<br>
├─ api/                 # 所有 API 呼叫<br>
│   ├─ client.ts        # Axios Client（自動帶 JWT）<br>
│   ├─ auth.ts<br>
│   ├─ flights.ts<br>
│   ├─ notifications.ts<br>
│   ├─ profiles.ts<br>
│<br>
├─ auth/<br>
│   ├─ AuthContext.tsx             # 全站登入狀態<br>
│   ├─ AuthProvider.tsx<br>
│<br>
├─ hooks/<br>
│   ├─ useAuth.ts<br>
│<br>
├─ pages/<br>
│   ├─ Login.tsx<br>
│   ├─ Register.tsx<br>
│   ├─ Dashboard.tsx<br>
│   ├─ Flights.tsx<br>
│   ├─ TrackedFlights.tsx<br>
│   ├─ Notifications.tsx<br>
│   ├─ Profile.tsx<br>
│<br>
├─ components/<br>
│   ├─ FlightTable.tsx<br>
│   ├─ NotificationTable.tsx<br>
│   ├─ PriceChart.tsx<br>
│<br>
├─ routes/<br>
│   └─ AppRoutes.tsx<br>
│<br>
├─ styles/<br>
│   └─ table.css<br>
│<br>
├─ types/<br>
│   └─ auth.ts<br>
│   └─ common.ts<br>
│   └─ flights.ts<br>
│   └─ notifications.ts<br>
│   └─ profile.ts<br>
│<br>
├─ utils/<br>
│   └─ token.ts #Token 管理<br>
│<br>
├─ App.tsx<br>
└─ main.tsx<br>
:::
