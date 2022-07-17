# Getting Start

```bash
yarn install
ntl dev -o
```

```bash
git push to deploy code
```

# Deploy

## Deployment Setup

```bash
ntl link
```

## Deployment Steps

Live - push to main branch to trigger CI/CD

OR

Manual

```bash
# get env file from netlify
ntl env:list
# export env key and value to .env.production.local
nano frontend/.env.production.local
ntl build
ntl deploy -p
```