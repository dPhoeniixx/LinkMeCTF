# LinkMe Web Challenge
LinkMe is a public figure shareable card creator, it creates a link for you that shows a short introduction about through simple card present Name, Job, Bio, Accounts. LinkMe Challenge was inspired by real-world scenario to learn you new tricks and extend your thinking about application security mind-set. 

## How to Get the Challenge Up?

This project is using Docker, you can simply build and run it:
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