# Nethermind coding challenge

This is a coding challenge for a Nethermind Blockchain Engineer role. The ideia behind it is to provide an API to fetch historical data of a smart contract without using the Etherscan API.

## Requeriments

- The data should be fetched by the backend without using Etherscan API
- The backend should use ethers.js or web3.js to fetch all the events of a Uniswap swap contract (example link provided below)
- The backend should interact with authenticated users only, that are connected via metamask
- The frontend should fetch this historical data for display using the backend API only
- Additionally: add a cache for the queries on the backend side

## Instalation

1. Create an `.env` file on the root folder and populate with the following environment variables:

```
UNISWAP_SMARTCONTRACT_ADDRESS=
ETHEREUM_NODE_URL=
DEPLOYED_BLOCK=
SIGNATURE_MESSAGE=

# Auth

AUTH_JWT_SECRET

# Redis

REDIS_HOST=
REDIS_PORT=
REDIS_CLIENT=
```

2. Install [Docker & Compose](https://docs.docker.com/compose/install/compose-desktop/) e rode:

```
docker-compose up --build
```

3. Start the app and be happy

```
yarn start:dev
```
