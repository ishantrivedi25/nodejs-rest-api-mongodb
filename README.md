# Book Club: NodeJS(Express) REST API with JWT Authentication, Mongoose & Joi validation

This is a basic project structure which helps you to start building your own REST APIs using Express and MongoDB with good structure practices based on clean MVC Architecture.

# Features
- Routing, Middleware, Manage Request and Response with [Express](https://expressjs.com/)
- CRUD operations & Data models with [Mongoose](https://mongoosejs.com/)
- Data validation & sanitization with [Joi](https://joi.dev/api/)
- Authentication & Authorization with [JWT](https://jwt.io/): login and signup
- Error handling
- Enviroment Varaibles
- Pre-defined response structures with proper status codes
- Included CORS & Data Encyption
- Included API collection for Postman

## Project structure

```sh
.
├── app.js
├── package.json
├── controllers
│   ├── AuthController.js
│   └── BookController.js
├── models
│   ├── BookModel.js
│   └── UserModel.js
├── routes
│   ├── auth.js
│   └── book.js
├── middlewares
│   ├── authorizeRequest.js
│   └── validators
│       ├── BookSchema.js
│       └── UserSchema.js
├── helpers
│   └── apiResponse.js
└── utils
    ├── common.js
    └── constants.js
```

## How to run

### Running API server locally

```bash
npm run dev
```

Check server is running by the output of the command `npm run dev`

```bash
DB Connected Successfully
Listening on port 3000

Press CTRL + C to stop the process.
```

## Improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.