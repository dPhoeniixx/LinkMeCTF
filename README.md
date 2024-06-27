# LinkMe Web Challenge
LinkMe is a public figure shareable card creator. It creates a link for you that displays a short introduction through a simple card presenting your name, job, bio, and accounts. The LinkMe Challenge was inspired by real-world scenarios to teach you new tricks.

## How to Get the Challenge Up?

This project uses Docker, you can simply build and run it:
```bash
docker build -t linkme-challenge .
docker run -p 3000:3000 linkme-challenge
```

or, run it locally:
```
npm install
npx prisma generate && npx prisma migrate dev --name init
npm run dev
```

### Write-Up

You can find the write-up of the solution here: https://dphoeniixx.xyz/blog/icmtc-ctf-2024-linkme
