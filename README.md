# Token Factory ERC-20

## Overview
Token Factory ERC-20 is a decentralized application (dApp) that allows users to create their own ERC-20 tokens effortlessly. The frontend is built with React.js and uses the Ethers.js library to interact with the Ethereum blockchain.

## Features
- Connect and disconnect MetaMask wallet
- Create custom ERC-20 tokens by providing:
  - Token Name
  - Token Symbol
  - Total Supply
  - Recipient Address
- Displays transaction messages (success or failure)
- Supports multiple networks via a predefined `NETWORKS` configuration

## Technologies Used
- **React.js**: Frontend framework
- **Ethers.js**: Blockchain interaction
- **Semantic UI React**: UI components
- **MetaMask**: Wallet connection
- **Solidity**: Smart contract development

## Prerequisites
Ensure you have the following installed before running the project:
- **Node.js** (v16+ recommended)
- **MetaMask Extension**
- **Ethereum Test Network Access** (e.g., Soneium, Sepolia, Goerli, etc.)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/furidngrt/TokenFactory.git
   ```
2. Navigate into the project folder:
   ```sh
   cd TokenFactory
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
1. Update `networks.js` with your supported networks and factory contract addresses.
2. Ensure the ABI file (`TokenFactoryABI.json`) matches your deployed smart contract.

## Running the Project
Start the development server:
```sh
npm start
```
The app will be available at `http://localhost:3000/`.

## Connecting MetaMask
1. Open MetaMask and ensure you are on a supported network.
2. Click the "Connect Wallet" button on the website.
3. Approve the connection request.

## Creating a Token
1. Enter token details:
   - **Name**: e.g., "MyToken"
   - **Symbol**: e.g., "MTK"
   - **Total Supply**: e.g., "1000000"
2. Click "Create Token"
3. Confirm the transaction in MetaMask.
4. View the token on the blockchain explorer.

## Deployment
To deploy the frontend to Vercel:
```sh
npm run build
vercel
```
