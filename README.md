# 🪑 Admin Panel : Technical Test "xionco furniture"

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 🖼️ Preview

![Furniture Admin Dashboard Preview](https://github.com/user-attachments/assets/3871038f-126c-4991-9154-73e29a69e0f2)

A comprehensive admin dashboard for managing furniture inventory, stock levels, and customer purchases.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Setup and Installation](#-setup-and-installation)
- [Database Structure](#-database-structure)
- [License](#-license)

## ✨ Features

- **Product Management** - Add and view furniture products with images and details
- **Stock Control** - Real-time tracking and updating of inventory levels
- **Purchase System** - Create sales records and manage order fulfillment
- **Order Cancellation** - Ability to cancel orders with automatic stock adjustment
- **Dashboard Overview** - Quick insights into business operations

## 🛠️ Tech Stack

- **Backend:** Node.js with Express.js framework
- **Frontend:** EJS templates with Bootstrap 5
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Bootstrap 5 for responsive UI components

## 📸 Screenshots

<details>
  <summary>Dashboard View</summary>
  <p>Overview of the admin dashboard with key metrics and navigation options</p>
  <!-- Image placeholder -->
</details>

<details>
  <summary>Product Management</summary>
  <p>Interface for viewing and managing furniture products</p>
  <!-- Image placeholder -->
</details>

<details>
  <summary>Purchase Creation</summary>
  <p>Form for creating new customer purchases with product selection</p>
  <!-- Image placeholder -->
</details>

## 🚀 Setup and Installation

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/furniture-admin.git
   cd furniture-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   # Create a .env file with your database connection string
   echo DATABASE_URL="postgresql://username:password@localhost:5432/furniture_db" > .env
   echo DATABASE_URL_UNPOOLED="postgresql://username:password@localhost:5432/furniture_db" >> .env
   ```

4. **Set up database**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed initial data**

   ```bash
   npm run prisma:seed
   ```

6. **Start the application**

   ```bash
   # For production
   npm start

   # For development with auto-reload
   npm run dev
   ```

7. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Structure

The application uses the following data model:

- **Product** - Stores furniture information (name, description, price, image)
- **Stock** - Tracks inventory levels for each product
- **Purchase** - Records customer orders with status tracking
- **PurchaseItem** - Individual items within each purchase

```
Product 1:1 Stock
Product 1:N PurchaseItem
Purchase 1:N PurchaseItem
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Xionco Furniture Team
