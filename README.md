# learning-groups

This web-app was designed to help independent study groups track student achievements.

## Development

1. Copy .env.example to .env.local and update the variables:

```bash
cp .env.example .env.local
```

1. Install dependencies and generate prisma client:

```bash
npm install && npx prisma generate
```

1. Start the dev server:

```bash
npm run dev
```

## Project progress

- [ ] Write clear requirements for the app concept
- [x] Design database
- [ ] Build & documented backend - API routes
- [ ] Design & build frontend - GUI
- [ ] Write tests (CI)
- [ ] Setup automated deployement (CD)

## Tech Stack

When starting any development project the software architect must weigh the expected tradeoffs from any given stack. For this specific build, these are the technology decisions I settled on. _Our goal is keep the project simple._ We expect the majority of the devs to be juniors out of college with minimal working experience.

- Server: SvelteKit
- Database: Postgres using Prisma ORM
- UI Library: Shadcn-svelte

## Skills practiced

- Architect software requirements
- Design an efficient database
- Build and test reliable software
- Practice good authentication practices
