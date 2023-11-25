## Instruction

### For locally run the project

- command: npm run start:dev

### 1.For creating user :

- Method : post
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/
- Request Body :

```ts
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

### 2. Retrieve a list of all users

- Method : get
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/

### 3. Retrieve a specific user by ID

- Method : get
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/:userId

### 4. Update user information

- Method : put
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/:userId
- Request Body:

```json
{
  "userId": 5,
  "username": "ujasahbb",
  "password": "mdsffffffffffffffffs",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 30,
  "email": "john@example.com",
  "isActive": "true",
  "hobbies": ["reading", "coding"],
  "address": {
    "street": "123 Main St",
    "city": "Cityville",
    "country": "Countryland"
  }
}
```

### 5. Delete a user

- Method : delete
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/:userId
- Response :

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

### 6. Add New Product in Order

- Method : put
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/:userId/orders
- Request Body:

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

### 7. Retrieve all orders for a specific user

- Method : get
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/:userId/orders
- Response :

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

### 8. Calculate Total Price of Orders for a Specific User

- Method : get
- Endpoint : https://handsome-fish-kerchief.cyclic.app/api/users/:userId/orders/total-price
- Response :

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```
