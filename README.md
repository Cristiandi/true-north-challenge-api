# true-north-challenge-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start:dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run unit tests
```
npm run test
```

### Live URL
- https://true-north-challenge-api-production.up.railway.app
- https://g0ry7vtj1c.execute-api.us-west-1.amazonaws.com/api (versioning not working)

---

# API Documentation

This documentation provides details about the endpoints.
## APIs

### 1. Users - Registration

- **Endpoint**: `POST /api/v1/users/registration`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
      "email": "stan.marsh@southpark.com",
      "password": "hola123"
  }
  ```

### 2. Records - Operation

- **Endpoint**: `POST /api/v1/records/operation`
- **Description**: Performs an operation on records.
- **Authentication**: Bearer Token
- **Request Body**:
  ```json
  {
      "userAuthUid": "MzSwkrzXTJfNaSDm0FKcHX4rdKd2",
      "operation": "subtraction",
      "a": 1,
      "b": 2
  }
  ```

### 3. Records - Get User Records

- **Endpoint**: `GET /api/v1/records`
- **Description**: Retrieves user records.
- **Authentication**: Bearer Token
- **Query Parameters**:
  - `userAuthUid`: O0IYvGjnPWXy4KxXlSc3YxnoxuZ2
  - `q`: (optional)
  - `take`: 5
  - `skip`: 0
  - `orderBy`: id
  - `order`: DESC

### 4. Records - Delete Record

- **Endpoint**: `DELETE /api/v1/records`
- **Description**: Deletes a record.
- **Query Parameters**:
  - `uid`: O0IYvGjnPWXy4KxXlSc3YxnoxuZ2

---