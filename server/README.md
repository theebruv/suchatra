# Suchatra API Server

## Getting started

### 1. Clone the repository and install dependencies

Clone this repository:

```
git clone

```

Install npm dependencies:

```
cd suchatra-api-server

yarn install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Start the REST API server

```
yarn dev
```

The server is now running on `http://localhost:4000`.
You can now run the API requests

## Using the REST API

You can access the REST API of the server using the following endpoints:
