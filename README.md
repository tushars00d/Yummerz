# Yummerz

Yummerz is a multi-role food delivery platform built to simulate how a real-world delivery product works across customers, restaurant owners, riders, and supporting backend services. The project was designed not only as a feature-complete application, but also as a practical exercise in learning how production-style systems are architected, integrated, containerized, and deployed.

The platform supports:

- Customers browsing nearby restaurants, searching menus, adding items to cart, placing orders, and tracking order progress
- Restaurant owners onboarding their restaurant, managing menu items, receiving orders, and updating preparation status
- Riders creating delivery profiles, going online/offline, accepting orders, and updating delivery progress
- Realtime and asynchronous workflows across services for order lifecycle updates

## Screenshots
![y1](https://github.com/user-attachments/assets/35cae9ca-e6f2-4d0f-bb31-ad311249d718)
![y2](https://github.com/user-attachments/assets/c84bc63c-d3c3-4f3c-8bb0-28552173024f)
![y3](https://github.com/user-attachments/assets/bce1a977-5ac6-4b9f-ae9b-a7221bc857b2)
![y4](https://github.com/user-attachments/assets/0430246b-bd06-4783-9b23-71135d920853)
![y5](https://github.com/user-attachments/assets/cb4e02dc-0d78-49d3-867b-09861511a81a)
![y6](https://github.com/user-attachments/assets/e3507b82-ab5b-4c7f-8148-45bf5ae5ff93)

## Why This Project

The motivation behind Yummerz was to move beyond a standard CRUD full-stack app and learn how modern products behave in realistic environments.

This project helped me explore:

- Multi-role product design
- Distributed backend architecture
- Event-driven workflows
- Realtime updates
- Cloud-based media storage
- Dockerized deployment
- Cross-service environment management
- Debugging production issues across frontend, backend, and infrastructure

## Core Features

### Customer Features

- Google OAuth based login
- Browse nearby restaurants using location-aware discovery
- Search restaurants by name
- View restaurant menus
- Add items to cart with quantity tracking
- Create and place orders
- View order history
- Track current order status

### Seller Features

- Register as a seller
- Add a restaurant profile
- Upload restaurant image
- Add restaurant location and contact details
- Create menu items with images and pricing
- Toggle menu item availability
- View incoming restaurant orders
- Update order preparation status
- Open/close restaurant for ordering

### Rider Features

- Register as a rider
- Create rider profile with identity details
- Upload profile image
- Toggle rider availability
- Fetch current assigned order
- Accept rider-eligible orders
- Update delivery progress

### Platform Features

- JWT-based cross-service authentication
- Event-driven order progression with RabbitMQ
- Realtime notifications through socket connections
- Cloudinary-based media upload handling
- Service-specific deployment on Render
- Frontend deployment on Vercel

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- React Hot Toast
- Socket-based realtime client integration

### Backend

- Node.js
- Express
- TypeScript
- JWT authentication
- Google OAuth

### Data and Infrastructure

- MongoDB Atlas
- RabbitMQ
- Cloudinary
- Docker
- Render
- Vercel

## Architecture

The backend is split into multiple domain-oriented services.

### `auth` service

Responsible for:

- Google OAuth login
- JWT token generation and verification
- user identity
- role assignment

### `restaurant` service

Responsible for:

- restaurant onboarding
- restaurant retrieval and geo-discovery
- menu item management
- cart management
- order creation and lifecycle updates

### `rider` service

Responsible for:

- rider profile creation
- availability updates
- current rider order handling
- rider-side order acceptance and status progression

### `utils` service

Responsible for:

- media upload handling
- utility workflows such as payment-related helpers

### `realtime` service

Responsible for:

- socket initialization
- room-based user and restaurant notifications
- realtime event delivery for order updates

### `admin` service

Responsible for platform-level admin functionality and extension points for moderation/management workflows.

## System Design Decisions

### Why a multi-service architecture

I intentionally avoided putting everything into one backend. The purpose of the project was also to understand how domain responsibilities can be separated in a real application.

This structure helped me learn:

- how service boundaries are defined
- when synchronous HTTP communication is sufficient
- when asynchronous messaging is more appropriate
- how environment variables and deployment setup become more important as systems become distributed

### Why RabbitMQ

Certain workflows are better modeled asynchronously than through direct request-response communication. Payment completion and rider-related events are examples of business events that should not tightly block other services.

RabbitMQ allowed me to:

- decouple services
- simulate real-world event-driven architecture
- handle order state progression more realistically

### Why MongoDB Atlas

MongoDB fit this project well because the data model includes:

- nested order items
- evolving user roles
- geospatial restaurant queries
- flexible rider and restaurant documents

It also allowed fast iteration while learning cloud-hosted database deployment.

### Why Cloudinary

Restaurant and rider images are real application assets and should not be stored in application containers. Cloudinary made media handling simpler and more realistic from a production standpoint.

### Why Docker + Render + Vercel

I wanted the project to reflect real deployment practices.

- Docker provided reproducible service packaging
- Render made it practical to deploy multiple backend services independently
- Vercel was a strong fit for frontend deployment

This setup exposed real deployment issues around:

- service URLs
- image platform mismatches
- OAuth origins
- database access
- internal service communication

## Key Workflows

### Authentication Flow

1. User signs in with Google
2. Auth service exchanges auth code for Google user identity
3. User record is created or fetched from MongoDB
4. JWT is issued
5. Role is assigned later based on product path

### Restaurant Onboarding Flow

1. Seller logs in and selects seller role
2. Seller submits restaurant details and image
3. Restaurant service forwards image upload to utils service
4. Utils service uploads media to Cloudinary
5. Restaurant profile is stored in MongoDB with geolocation data

### Menu Management Flow

1. Seller creates menu item
2. Item image is uploaded via utils service
3. Menu item is associated with restaurant
4. Availability can be toggled from seller dashboard

### Cart and Order Flow

1. Customer browses restaurants near current location
2. Customer adds menu items to cart
3. Cart enforces a single-restaurant ordering rule
4. Order is created using a snapshot of cart items
5. Payment state and order state are tracked separately
6. Restaurant receives order updates
7. Rider becomes eligible once order is ready

### Rider Assignment and Delivery Flow

1. Rider creates profile and goes online
2. Rider receives order opportunity
3. Rider accepts order
4. Order moves through delivery statuses
5. Customer and seller receive realtime updates

## Realtime and Async Communication

Two communication modes are used in the system.

### Synchronous HTTP

Used when an immediate response is required:

- auth APIs
- menu CRUD
- cart actions
- restaurant management

### Asynchronous/Event-Driven

Used when workflows span multiple services:

- payment success processing
- rider readiness and assignment
- background order lifecycle transitions

### Socket-Based Realtime

Used when users need live updates:

- customer order status
- restaurant order notifications
- rider assignment updates

## Deployment

### Frontend

- Deployed on Vercel

### Backend Services

- Deployed as Dockerized services on Render
- Services include:
  - `yummerz-auth`
  - `yummerz-restaurant`
  - `yummerz-utils`
  - `yummerz-rider`
  - `yummerz-realtime`
  - `yummerz-admin`

### Supporting Cloud Services

- MongoDB Atlas for database
- RabbitMQ for queue/event workflows
- Cloudinary for media uploads

## Local Development Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas or local MongoDB
- RabbitMQ
- Cloudinary account
- Google OAuth client

### Environment Variables

Each backend service uses its own `.env` file. Common environment variables across services include:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `INTERNAL_SERVICE_KEY`
- `RABBITMQ_URL`
- service URLs such as:
  - `UTILS_SERVICE`
  - `RESTAURANT_SERVICE`
  - `REALTIME_SERVICE`

Additional service-specific variables include:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- Cloudinary keys
- payment provider keys

### Running the Services

Each service can be started independently from its directory.

Typical pattern:

```bash
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## What I Learned

This project taught me far more than building pages and APIs.

### Product Thinking

- how different user roles shape product behavior
- how data models should reflect real business workflows
- why cart, delivery, and rider constraints exist in real food delivery products

### Backend Engineering

- JWT propagation across services
- OAuth integration in deployed environments
- event-driven communication with RabbitMQ
- geospatial data modeling for restaurant discovery
- snapshot-based order design

### Realtime Systems

- room-based socket communication
- realtime event targeting for users and restaurants
- the importance of consistent auth across HTTP and socket layers

### Deployment and Operations

- Docker image packaging and security hardening
- cross-service URL configuration
- cloud environment variable management
- Render and Vercel deployment workflows
- platform-specific issues such as `arm64` vs `linux/amd64`

### Debugging Production Issues

Some of the most valuable lessons came from solving real deployment and integration issues, including:

- missing or incorrect route mounts
- services calling `localhost` after deployment
- Google OAuth failing after moving from localhost to deployed origins
- JWT mismatches across services
- MongoDB Atlas access and deployment networking issues
- schema/data inconsistencies between code and stored records
- duplicated or misconfigured cloud services

## Challenges Faced

Some of the hardest parts of the project were:

- keeping service boundaries clear while still moving quickly
- debugging failures that surfaced in one service but originated in another
- handling environment differences between local development and deployment
- maintaining data consistency when schema mistakes were discovered after records already existed

The most difficult part overall was not building individual features. It was making all parts of the system work together reliably in a deployed environment.

## Future Improvements

- stronger centralized logging and observability
- better retry and resilience patterns around async workflows
- database migrations for schema evolution
- richer admin moderation flows
- test coverage across service boundaries
- improved infrastructure automation

## Interview Value

Yummerz represents more than a feature project. It demonstrates:

- full-stack product development
- distributed backend design
- role-based application architecture
- realtime systems
- event-driven workflows
- cloud deployment and debugging

In an interview, I position this project as evidence that I can think beyond isolated features and reason about systems, tradeoffs, and production behavior end-to-end.
