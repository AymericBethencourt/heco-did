# HECO DID

## DEMO VIDEO : [https://youtu.be/jllPk5pAd5U](https://youtu.be/jllPk5pAd5U)

## About

This project implements the [W3C's DID](https://www.w3.org/TR/did-core/) standard into the HECO Chain and is inspired from the [Uport project](https://github.com/uport-project/ethr-did)

Decentralized identifiers (DIDs) are a new type of identifier that enables verifiable, decentralized digital identity. A DID identifies any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) that the controller of the DID decides that it identifies.

HECO needs to have a DID service as many DeFi services require identification.

## Deploying the DID registry
You can skip this step if you want and use the contract we deployed on [0x4C74827FA00DD44C4eC1fC80C6EC2eB37fFf8fC9](https://testnet.hecoinfo.com/address/0x4C74827FA00DD44C4eC1fC80C6EC2eB37fFf8fC9)

To deploy a new DID registry :
```
yarn install
truffle compile
truffle migrate --network testnet
```

## Lanching the frontend

To  start the frontend :
```
yarn start
```

The frontend will automatically connect to the DID registry. If the registry has not been correctly deployed, you will see the error `HecoDidRegistry contract not deployed to the detected network.`.

The first step is to create a DID for your address. Click 'Create DID'. You should see a new DID as follows :

```
did:hecor:0x4C74827FA00DD44C4eC1fC80C6EC2eB37fFf8fC9
```

This represents the `did` scheme with `hecor` method (for HECO Registry) and method-specific identifier (your eth address).


You can now sign claims and get a JWT that a third party can verify. For this, enter any claim in json format, i.e :

```
{name : "John"}
```

Metamask will open to sign the transaction. You will then obtain your signed JWT.