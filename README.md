# 🏥 Clinic Patient Queue Management System

A full-stack web application designed to streamline clinic operations by efficiently managing patient flow, doctor assignments, and real-time queue updates. This system reduces patient waiting time and improves overall clinic productivity.

---

## 🚀 Project Overview

The **Clinic Patient Queue Management System** is built to automate and manage patient queues in a clinic environment.  
It supports **role-based access** for Admin, Doctor, and Patient, ensuring secure and organized workflows.

This project demonstrates real-world use of **full-stack development**, RESTful APIs, database integration, and responsive UI design.

---

## ✨ Key Features

### 👩‍💼 Admin
- Add and manage doctors
- Add and manage patients
- Assign patients to doctors
- View complete queue status

### 🩺 Doctor
- View assigned patient queue
- Update patient status:
  - Waiting
  - In Progress
  - Completed
- Real-time queue updates

### 🧑‍⚕️ Patient
- Join the queue
- View live queue position
- Track appointment status

### ⚙️ System Features
- Priority-based queue handling
- Auto-refresh queue updates
- Role-based navigation
- Clean and responsive UI
- Toast notifications for actions

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS (custom styling)
- React Router
- React Toastify

### Backend
- Java
- Spring Boot
- REST APIs
- JPA / Hibernate

### Database
- MySQL

### Tools & Technologies
- Git & GitHub
- VS Code
- Postman

---

## 📂 Project Structure

ClinicPatientQueueManagement/
│
├── backend/
│ ├── controller/
│ ├── service/
│ ├── repository/
│ └── model/
│
├── reactapp/
│ ├── src/
│ │ ├── pages/
│ │ ├── layout/
│ │ ├── utils/
│ │ ├── assets/
│ │ └── App.js
│ └── App.css
