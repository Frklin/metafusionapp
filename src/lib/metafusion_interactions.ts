// import { ethers } from "hardhat";
import { ethers } from "ethers";
import { Contract } from "ethers";
import type { ContractRunner } from "ethers";


///////////// CONSTANTS ///////////////

const contract_name = "MetaFusionPresident"
const contract_address = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const abi = `[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "CardTransfered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        }
      ],
      "name": "CreateImage",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "imageId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "userId",
          "type": "address"
        }
      ],
      "name": "DestroyImage",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "IPFSCid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "imageId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "ImageCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "blacksmith",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "packetId",
          "type": "uint32"
        }
      ],
      "name": "PacketForged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "opener",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint32[]",
          "name": "prompts",
          "type": "uint32[]"
        }
      ],
      "name": "PacketOpened",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "PacketTransfered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "IPFSCid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "PromptCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "PromptTransfered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isListed",
          "type": "bool"
        }
      ],
      "name": "UpdateListImage",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "id",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isListed",
          "type": "bool"
        }
      ],
      "name": "UpdateListPacket",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "id",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isListed",
          "type": "bool"
        }
      ],
      "name": "UpdateListPrompt",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "WillToBuyImage",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "WillToBuyPacket",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "WillToBuyPrompt",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "NUM_PROMPT_TYPES",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PACKET_SIZE",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "imageId",
          "type": "uint256"
        }
      ],
      "name": "burnImageAndRecoverPrompts",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        }
      ],
      "name": "buyCard",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "packetId",
          "type": "uint32"
        }
      ],
      "name": "buyPacket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        }
      ],
      "name": "buyPrompt",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "collection",
          "type": "uint16"
        }
      ],
      "name": "checkCollectionExistence",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32[6]",
          "name": "prompts",
          "type": "uint32[6]"
        }
      ],
      "name": "createImage",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "_collection",
          "type": "uint16"
        }
      ],
      "name": "forgeCollection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "collection",
          "type": "uint16"
        }
      ],
      "name": "forgePacket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        }
      ],
      "name": "getCardURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "packetId",
          "type": "uint32"
        }
      ],
      "name": "getPacketURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        }
      ],
      "name": "getPromptURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "IPFSCid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "imageId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "imageMinted",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "listCard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "packetId",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "listPacket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "listPrompt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "packetID",
          "type": "uint32"
        }
      ],
      "name": "openPacket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOfCard",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOfPacket",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOfPrompt",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "IPFSCid",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "promptMinted",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "refund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "imageId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "val",
          "type": "uint256"
        }
      ],
      "name": "transferCard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "packetId",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "val",
          "type": "uint256"
        }
      ],
      "name": "transferPacket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "val",
          "type": "uint256"
        }
      ],
      "name": "transferPrompt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cardId",
          "type": "uint256"
        }
      ],
      "name": "unlistCard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "packetId",
          "type": "uint32"
        }
      ],
      "name": "unlistPacket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "promptId",
          "type": "uint32"
        }
      ],
      "name": "unlistPrompt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`

var PACKET_COST = "0.1";
var PACKET_OPENING_FEES = "0.01";
var GENERATION_FEES = "0.1";  // The cost of generating an image
var DESTRUCTION_FEES = "0.001";  // The fees for image destruction
var TRANSACTION_FEES = "0.01";  // The fees for the transaction

var NUM_PROMPT_TYPES = 6;  // The number of different prompt types
var PACKET_SIZE = 8;  // The number of different prompt types

///////////// VARIABLES ///////////////


export var provider: any = null;
export var signer: any = null;
export var contract: any = null;


///////////// FUNCTIONS ///////////////

async function setSigner() {
    let prov = new ethers.BrowserProvider(window.ethereum);
    let sig = await prov.getSigner()
    provider = prov;
    signer = sig
}

async function setContract() {
    await setSigner()
    contract = new ethers.Contract(contract_address, abi, signer)
    contract = contract.connect(signer)
}

  
async function forgeCollection(collection: number) {
    let tx = await contract.forgeCollection(collection);
    await tx.wait();
    return tx;
}
  
async function forgePacket(collection: number, fees = PACKET_COST) {
    let tx = await contract.forgePacket(collection, {value: ethers.parseEther(fees)});
    await tx.wait();
    return tx;
}

async function listPacket(packetId: number, price: string) {
  let tx = await contract.listPacket(packetId, ethers.parseEther(price));
  await tx.wait();
  return tx;
}

async function unlistPacket(packetId: number) {
  let tx = await contract.unlistPrompt(packetId);
  await tx.wait();
  return tx;
}  

async function buyPacket(packetId: number, price: string, txFees = TRANSACTION_FEES) {
    let val = ethers.parseEther(price) + ethers.parseEther(txFees);
    let tx = await contract.buyPacket(packetId, {value: val});
    await tx.wait();
    return tx;
}
  
async function getOwnerOfPacket(packetId: number) {
    return await contract.ownerOfPacket(packetId);
}
  
async function openPacket(packetId: number, fees = PACKET_OPENING_FEES) {
    let tx = await contract.openPacket(packetId, { value: ethers.parseEther(fees) });
    await tx.wait();
    return tx;
}
  
async function listPrompt(promptId: number, price: string) {
    let tx = await contract.listPrompt(promptId, ethers.parseEther(price));
    await tx.wait();
    return tx;
}

async function unlistPrompt(promptId: number) {
  let tx = await contract.unlistPrompt(promptId);
  await tx.wait();
  return tx;
}
  
async function buyPrompt(promptId: number, price: string, txFees = TRANSACTION_FEES) {
    let val = ethers.parseEther(price) + ethers.parseEther(txFees);
    let tx = await contract.buyPrompt(promptId, {value: val});
    await tx.wait();
    return tx;
}
  
async function getOwnerOfPrompt(promptId: number) {
    return await contract.ownerOfPrompt(promptId);
}
  
async function createImage(promptIds: number[], fees = GENERATION_FEES) {
    let tx = await contract.createImage(promptIds, { value: ethers.parseEther(fees) });
    await tx.wait();
    return tx;
}
  
async function listImage(imageId: number, price: string) {
    let tx = await contract.listCard(imageId, ethers.parseEther(price));
    await tx.wait();
    return tx;
}

async function unlistImage(imageId: number) {
    let tx = await contract.unlistCard(imageId);
    await tx.wait();
    return tx;
}
  
async function buyImage(imageId: number, price: string, txFees = TRANSACTION_FEES) {
    let val = ethers.parseEther(price) + ethers.parseEther(txFees);
    // console.log(contract)
    // console.log(signer)
    let tx = await contract.buyCard(imageId, {value: val});
    await tx.wait();
    return tx;
}
  
async function getOwnerOfImage(imageId: number) {
    return await contract.ownerOfCard(imageId);
}
  
async function destroyImage(imageId: number, fees = DESTRUCTION_FEES) {
    let tx = await contract.burnImageAndRecoverPrompts(imageId, {value: ethers.parseEther(fees)});
    await tx.wait();
    return tx;
}

export {
    PACKET_COST,
    PACKET_OPENING_FEES,
    GENERATION_FEES,
    DESTRUCTION_FEES,
    TRANSACTION_FEES,
    NUM_PROMPT_TYPES,
    PACKET_SIZE,
    forgeCollection,
    forgePacket,
    listPacket,
    unlistPacket,
    buyPacket,
    getOwnerOfPacket,
    openPacket,
    listPrompt,
    unlistPrompt,
    buyPrompt,
    getOwnerOfPrompt,
    createImage,
    listImage,
    unlistImage,
    buyImage,
    getOwnerOfImage,
    destroyImage,
    setContract,
    setSigner
}