const contractAddress = "0x417Bf7C9dc415FEEb693B6FE313d1186C692600F"; // Replace with your deployed contract address
const contractABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "_name", "type": "string"},
            {"internalType": "string", "name": "_location", "type": "string"},
            {"internalType": "uint256", "name": "_price", "type": "uint256"},
            {"internalType": "uint256", "name": "_shares", "type": "uint256"}
        ],
        "name": "addProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3;
let contract;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask.");
    }
});

document.getElementById("propertyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;
    const shares = document.getElementById("shares").value;
    
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.addProperty(name, location, price, shares)
            .send({ from: accounts[0] });
        
        document.getElementById("status").innerText = "Property added successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Error adding property.";
    }
});
