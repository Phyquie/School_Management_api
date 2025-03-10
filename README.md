# School Management System

## Installation

```bash
npm install
node server.js
```

## Usage

```bash
node server.js
```

Endpoints:

- GET /api/schools/listSchools?latitude=latitude&longitude=longitude
  - Returns a list of schools sorted by distance from the given latitude and longitude.
- POST /api/schools/addSchool
  - Adds a new school to the database.
  - Pass the name(string), address(string), latitude(float), and longitude(float) in the request body.
