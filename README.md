# WeatherApp Requirements Document

## Project Overview

The WeatherApp is a web-based application that provides users with **clothing recommendations based on current weather conditions** in their area. Users can **create accounts**, **add clothing items**, and **view recommendations from others**. The app will include **interactive weather animations** and offers the ability to **switch between Fahrenheit and Celsius temperatures**.

---

## Core Features

### 1. User Registration/Login

Users should be able to **sign up, log in, and log out** securely.

#### Functional Requirements:

- User registration requires **name, email, password, and optional avatar upload**.
- Passwords must be securely hashed.
- Users can update their profile, including their **name, avatar, and location**.
- Use **JWT-based authentication** for session management.

---

### 2. Clothing Card Creation/Deletion

Users can **add and delete clothing items** they’ve created.

#### Functional Requirements:

- A clothing card includes **name, weather condition, affiliate link, image, and isLiked status**.
- **Liking and like counting** <!-- Will be a later feature -->
- Users can **upload images to AWS S3** and store the image URLs in the database.
- Only the **owner of a card** can delete.

---

### 3. User Profile Management

Each user has a **personal page** showing their uploaded clothing cards.

#### Functional Requirements:

- Users can **view all clothing items they’ve posted**.
- Users can also **view other users' profiles and items**.
- Profiles should display **total number of cards and liked items**. <!-- Will be a later feature -->

---

### 4. Initial Card List Fetch

When users log in, they should be able to see a **list of clothing cards** based on their location’s weather condition.

#### Functional Requirements:

- The system fetches weather data from a **third-party weather API**.
- The clothing card list is filtered based on **matching weather conditions**.
- Cards should be **sortable by date posted and most liked**. <!-- Will be a later feature -->

---

### 5. Temperature Unit Switch (Fahrenheit/Celsius)

Users can switch between **Fahrenheit (°F)** and **Celsius (°C)** temperatures.

#### Functional Requirements:

- Temperature units should default to **user's location preference** but be **manually adjustable**. <!-- Will be a later feature -->
- Switching the unit updates **all temperature displays** across the app.

---

### 6. Weather Condition Animations

The app should display **animated weather visuals** that match the current weather condition. <!-- Will be a later feature -->

#### Functional Requirements:

- Weather conditions like **rain, snow, clear skies, or thunderstorms** should trigger **different animations**. <!-- Will be a later feature -->
- The animations should be **optimized for both desktop and mobile devices**. <!-- Will be a later feature -->

---

## Non-Functional Requirements

### Performance

- Images should be **stored on AWS S3** and **cached using Redis**. <!-- Will be a later feature -->

### Security

- Passwords must be **hashed using bcrypt**.
- All API routes must be **protected using JWT authentication**.

### Scalability

- The backend is built with **MySQL** for managing user data and clothing items.

### Usability

- The app must be **responsive** across desktop, tablet, and mobile devices. <!-- Will be a later feature -->

---

## Image Storage

Images will be **uploaded to AWS S3**. <!-- Will be a later feature -->

#### S3 Requirements:

- Store images in **separate folders** by user ID. <!-- Will be a later feature -->
- Image URLs will be **saved in the SQL database**.

---

## API Endpoints Overview

| **Endpoint**            | **Method** | **Description**            |
| ----------------------- | ---------- | -------------------------- |
| /user/signup            | POST       | Register a new user        |
| /user/signin            | POST       | Log in a user              |
| /users/me               | GET        | Get current user profile   |
| /users/me               | PATCH      | Update Current User        |
| /clothing-items         | GET        | Fetch clothing items       |
| /clothing-items         | POST       | Create a new clothing card |
| /clothing-items/:itemId | DELETE     | Delete a clothing card     |
