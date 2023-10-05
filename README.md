# Varquiz

Varquiz is an educational platform that offers user authentication. Users can also CRUD study sets with flashcards. There are methods of memorizing cards, such as Flashcards and Test. Varquiz provides students with the tools they need to expand their knowledge and develop persistent thinking. In a world of increasing demands, Varquiz strives to reduce anxiety and exhaustion by building self-confidence in every student, regardless of their goals or aspirations.

## Technology Stack

Varquiz technologies:

 - Backend: Nest.js, RabbitMQ, MongoDB
       
 - Frontend: Angular, Angular Bootstrap

# How to run

## Using Docker Compose

If you have Docker and Docker Compose installed, follow these steps:
1. Go to backend folder.
2. Run the following command:
```bash
docker compose up
```

The API will be up and running, and you can access it at http://localhost:7777/api by default.

## Manual Setup

If you prefer to run the project manually (**you must have mongod, rabbitmq installed**), follow these steps:

1. Go to backend folder, go to user folder.
2. Install the dependencies by running:
 ```bash
 npm install
 ```
3. Once the installation is complete, start the development server by running:
```bash
npm run start:dev
```
4. Go to backend folder, go to email folder.
5. Install the dependencies by running:
 ```bash
 npm install
 ```
6. Once the installation is complete, start the development server by running:
```bash
npm run start:dev
```
7. Go to frontend folder.
8. Install the dependencies by running:
 ```bash
 npm install
 ```
9. Once the installation is complete, start the development server by running:
```bash
npm run start:dev
```

The frontend will be up and running, and you can acces it at http://localhost:4200 by default
The API will be up and running, and you can access it at http://localhost:7777/api by default
