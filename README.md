
# ADMIN-USER

It is a Role based auth website where admin and users both have different access to specific routes.
It make use of the jwt token that send the user role as one of the payload so that the middleware can easily detect the user and admin.



## Run Locally

Clone the project

```bash
  git clone https://github.com/nischay-chauhan/admin.git
```

Go to the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
``` 

Install dependencies in Server file

```bash
cd server
npm install
```
Run the server 
```bash
nodemon server
```
or 
```bash
node server
```


To run this project, you will need to add the following environment variables to your .env file

In the Client folder make .env and add 

VITE_API_BASE_URL="your backend localhost URL"

Similary in the server folder create a .env file and put 
```
PORT="Your PORT"
MONGO_URI="Your mongodb uri"
JWT_SECRET="Your JWT SECRET"
SMTP_USER="Your SMTP email"
SMTP_PASS="YOur SMTP password"
```

You can get the SMTP USER and SMTP PASS from making an account on the Etheral.mail
Here You go : https://ethereal.email/


## Features

- Allow a person to register either as a admin or a simple user
- Based on the role authorities are provided for eg. An admin can post news , See all other users , delete someone suspicious person except admin etc.
- It make use of the tailwind css and react-hot-toast and formik to make the frontend a bit more minimalist 

## License

[MIT](https://choosealicense.com/licenses/mit/)

