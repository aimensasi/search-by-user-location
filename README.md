# Github Search by location

## API

### Setup

1. Install dependencies

```bash
pnpm install
```

2. Setup .env file

```
ACCESS_TOKEN_SECRET=your_jwt_secret_key
GITHUB_TOKEN=your_github_personal_access_token

DB_HOST=localhost
DB_PORT=3308
DB_USERNAME=root
DB_PASSWORD=rootpassword
DB_NAME=myapp

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

3. Run the migration

```bash
pnpm run db:migrate
```

3. Start the development server

```bash
pnpm dev
```

## Client

### Setup

1. Install dependencies

```bash
pnpm install
```

2. Setup .env

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Start the development server

```bash
pnpm dev
```




