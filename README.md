# calendar-system
Appointment system

# DataBase MongoDB
Database Name - calendar

# create two collection with the help of Model
1. users collection
2. Appoinment collection


# Api endpoints and their response

1. Login Api

# End point

http://localhost:8080/login

# Sample data

{
	"email": "aman@gmail.com",
	"password": "12345"
}

# OR

{
	"email": "test@gmail.com",
	"password": "12345"
}

# Response

{
    "message": "Login successfull.",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwidXNlcklkIjoiNWY3MDkxMWMxNDI1MDcxMDU4YWMyYmEzIiwiaWF0IjoxNjAxMjY4MTQ3LCJleHAiOjE2MDEyNzE3NDd9.xTmybZYvdUcoQMztw50qubcLXeCq8bHdkuBD8WN5pQQ",
        "userId": "5f70911c1425071058ac2ba3",
        "name": "Aman"
    }
}


2. Create Api

# End Point

http://localhost:8080/create/appointment


# Sample data

{
	"appointmentName": "Test appointment",
	"description": "Description",
	"appointmentDate": "2020-09-29"
}

# Response

{
    "message": "Appointment added successfully",
    "data": {
        "appointment": "Test appointment",
        "date": "2020-09-29"
    }
}

# Note: Need to pass Autherization header with the token


3. Update Api

# End Point

http://localhost:8080/update/appointment


# Sample data

{
	"appointmentName": "Doctors appointment",
	"description": "Description",
	"appointmentDate": "2020-09-28",
	"appointmentId": "5f70ac6a1065651b4734640e"
}

# Response

{
    "message": "Appointment updated successfully",
    "data": {
        "appointmentName": "Doctors appointment",
        "description": "Description",
        "date": "2020-09-28"
    }
}

# Note: Need to pass Autherization header with the token

4. Get Api

# End Point

http://localhost:8080/get/appointment


# Sample data

{
	"appointmentDate": "2020-09-28"
}

# Response

{
    "message": "Appointment get successfully",
    "data": [
        {
            "_id": "5f70ac6a1065651b4734640e",
            "appointmentName": "Testing appointment",
            "description": "Description",
            "appointmentDate": "2020-09-28T00:00:00.000Z",
            "userId": "5f70911c1425071058ac2ba3",
            "__v": 0
        }
    ]
}

# Note: Need to pass Autherization header with the token












