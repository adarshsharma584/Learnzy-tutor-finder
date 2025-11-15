# 📘 API Documentation

This file provides all API endpoints used in the application.  
Base API URL: 

```
/api
```

---

# 🧑‍💻 USER ROUTES
**Base URL: `/api/user`**

---

## 🔐 AUTH ROUTES

### **POST /api/user/register**
Register a new user (supports profile photo upload).

**Form-Data Fields:**
- `name`
- `email`
- `phone`
- `password`
- `profilePhoto` (file)
- `role` (student, teacher, parent)

**Success Response:**
```json
{
    "success": true,
    "statusCode": 201,
    "data": {
        "createdUser": {
            "_id": "69184622f1dd70610ec2e322",
            "name": "Teacher",
            "email": "teacher2@test.com",
            "phone": "9876575432",
            "role": "teacher",
            "profilePhoto": "url stirng",
            "isVerified": false,
        }
    },
    "message": "User registered successfully. Check email for verification code."
}
```

---

### **POST /api/user/verify**
Verify user using an OTP sent to email.

**Body:**
```json
{
  "email": "example@mail.com",
  "verificationCode": "123456"
}
```

**Response:**
```json

{
    "success": true,
    "statusCode": 200,
    "message": "User Verified successfully"
}

```
---

### **POST /api/user/login**
Login and receive authentication token.

**Body:**
```json
{
  "email": "example@mail.com",
  "password": "password"
}
```

**Response:**
```json
{
    "success": true,
    "statusCode": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVs4",
    "message": "User logged in successfully"
}
```

---

### **DELETE /api/user/logout** *(Auth Required)*  
Logout the current user.

---

## 🔑 PASSWORD ROUTES

### **POST /api/user/forgot-password**
Send reset link to email.

```json
{ "email": "example@mail.com" }
```

---

### **PATCH /api/user/reset-password**
Reset password with token.

```json
{
    "resetPasswordToken": "68e790403e9f27f5e2b2c670e9692e08",
    "password": "John@1234"
}
```

---

## 👤 USER ROUTES (PROTECTED)

### **GET /api/user/me**
Return currently logged-in user.

---

### **PATCH /api/user/update**
Update profile (supports profile photo upload). : same body and response as register

---

### **DELETE /api/user/delete**
Delete the user account.

---

# 📚 TUITIONS ROUTES
**Base URL: `/api/tuitions`**

---

### **GET /api/tuitions**
Get all tuitions.

**Response:**

```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "subject": {
                "name": "Mathematics",
                "grade": "10"
            },
            "location": {
                "type": "Point",
                "coordinates": [
                    77.5946,
                    12.9716
                ],
                "address": "Bangalore, India"
            },
            "mode": "offline",
            "isActive": true,
            "_id": "6906057dbd7a1f1cd49e27ed",
            "teacher": null,
            "students": [],
            "batch": [
                {
                    "name": "Batch A",
                    "startDate": "2025-01-10T00:00:00.000Z",
                    "endDate": "2025-03-10T00:00:00.000Z",
                    "recurringDays": [
                        "Monday",
                        "Wednesday",
                        "Friday"
                    ],
                    "timeSlot": {
                        "startTime": "10:00",
                        "endTime": "11:00"
                    },
                    "_id": "6906057dbd7a1f1cd49e27ee"
                }
            ],
            "sessions": [],
            "progressReports": []
        },
        {
            "subject": {
                "name": "Mathematics",
                "grade": "10"
            },
            "location": {
                "type": "Point",
                "coordinates": [
                    77.5946,
                    12.9716
                ],
                "address": "Koramangala, Bengaluru"
            },
            "_id": "690753b6783cfe243b960d26",
            "teacher": {
                "_id": "69074e7c38ab82aaaff7dd70"
            },
            "title": "Math Foundation Batch for Class 10",
            "description": "Comprehensive course for board exam preparation",
            "mode": "offline",
            "isActive": true
        }
    ],
    "message": "Tuitions retrieved successfully"
}
```

---

### **GET /api/tuitions/:id**
Get tuition details by ID.

---

### **POST /api/tuitions/create**
Create a new tuition entry.

Example Body:
```json
{
  "teacher": "69074e7c38ab82aaaff7dd70",
  "subject": {
    "name": "Mathematics",
    "grade": "10"
  },
  "title": "Math Foundation Batch for Class 10",
  "description": "Comprehensive course for board exam preparation",
  "mode": "offline",
  "location": {
    "type": "Point",
    "coordinates": [77.5946, 12.9716],
    "address": "Koramangala, Bengaluru"
  },
  "batch": [
    {
      "name": "Morning Batch",
      "start_date": "2025-11-10",
      "end_date": "2026-02-28",
      "start_time": "08:00",
      "end_time": "09:30",
      "days_of_week": ["Mon", "Wed", "Fri"],
      "max_students": 15,
      "fees": 2500
    },
    {
      "name": "Evening Batch",
      "start_date": "2025-11-12",
      "start_time": "17:00",
      "end_time": "18:30",
      "days_of_week": ["Tue", "Thu", "Sat"],
      "max_students": 12,
      "fees": 2800
    }
  ]
}

```

---

# 🧑‍🏫 TEACHER ROUTES
**Base URL: `/api/teacher`**

---

### **GET /api/teacher/all**
Get all teacher profiles.

**Response:**

```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "_id": "69074e7c38ab82aaaff7dd70",
            "userId": {
                "_id": "69074cf238ab82aaaff7dd64",
                "name": "Teacher",
                "email": "teacher1@test.com",
                "profilePhoto": ""
            },
            "subjects": [
                {
                    "name": "Mathematics",
                    "boards": [
                        "CBSE",
                        "ICSE"
                    ],
                    "class": [
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    "_id": "69074e7c38ab82aaaff7dd71"
                },
                {
                    "name": "Physics",
                    "boards": [
                        "CBSE"
                    ],
                    "class": [
                        "11",
                        "12"
                    ],
                    "_id": "69074e7c38ab82aaaff7dd72"
                }
            ],
            "qualifications": [
                {
                    "degree": "B.Sc. in Physics",
                    "year": 2018,
                    "testGrades": 90,
                    "_id": "69074e7c38ab82aaaff7dd73"
                },
                {
                    "degree": "M.Sc. in Physics",
                    "year": 2020,
                    "_id": "69074e7c38ab82aaaff7dd74"
                }
            ],
            "experience": 4,
            "bio": "Passionate physics and mathematics teacher with over 5 years of experience helping students excel in board exams.",
            "isVerified": false
        }
    ]
}

```
---

### **GET /api/teacher/:id**
Get teacher by ID.

---

### **POST /api/teacher/create** *(Auth Required)*  
Create a teacher profile.

**Body:**

```json
{
  "experience": 5,
  "subjects": [
    {
      "name": "Mathematics",
      "boards": ["CBSE", "ICSE"],
      "class": ["9", "10", "11", "12"]
    },
    {
      "name": "Physics",
      "boards": ["CBSE"],
      "class": ["11", "12"]
    }
  ],
  "qualifications": [
    {
      "degree": "B.Sc. in Physics",
      "year": 2018,
      "testGrades": 90
    },
    {
      "degree": "M.Sc. in Physics",
      "year": 2020
    }
  ],
  "bio": "Passionate physics and mathematics teacher with over 5 years of experience helping students excel in board exams."
}

```



---

### **PATCH /api/teacher/update** *(Auth Required)*  
Update teacher profile.

---

# ✔️ Notes for Frontend Developers

### 🔸 Authentication
Protected routes require:

```
Authorization: Bearer <token>
```

### 🔸 File Upload
Routes using `multer` require:


### 🔸 Response Format (Success)
```json
{ 
  "success": true,
  "data": { ... }
}
```

### 🔸 Response Format (Error)
```json
{ 
  "success": false,
  "message": "Error details…" 
}
```

---

# ✅ End of Documentation
