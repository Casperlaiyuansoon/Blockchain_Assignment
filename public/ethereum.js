// Check if MetaMask is installed
if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");

  // Create a new Web3 instance using MetaMask's provider
  const web3 = new Web3(window.ethereum);

  // Request account access from MetaMask
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      const userAccount = accounts[0];
      console.log("Connected MetaMask Account:", userAccount);

      // Display account in the frontend
      document.getElementById("userAccount").innerText = userAccount;

      // Initialize contract interaction
      initContract(web3);
    })
    .catch((error) => {
      console.error("Error connecting MetaMask:", error);
    });
} else {
  alert("Please install MetaMask to use this DApp.");
}

// Initialize contract after MetaMask connects
async function initContract(web3) {
  try {
    const response = await fetch("http://localhost:3000/Ballot.json");
    const contractArtifact = await response.json();

    const abi = contractArtifact.abi;
    const deployments = Object.keys(contractArtifact.networks);
    const address =
      contractArtifact.networks[deployments[deployments.length - 1]].address;

    const contract = new web3.eth.Contract(abi, address);

    getContractData(contract);
  } catch (error) {
    console.error("Error initializing contract:", error);
  }
}

// Function to retrieve chairperson address from the contract
async function getContractData(contract) {
  try {
    const chairpersonAddress = await contract.methods
      .getChairPersonAddress()
      .call();
    console.log("Chairperson Address:", chairpersonAddress);

    // Display the chairperson address
    document.getElementById("chairperson").innerText = chairpersonAddress;
  } catch (error) {
    console.error("Error fetching contract data:", error);
  }
}

// Connect to MetaMask on page load
window.onload = () => {
  document.getElementById("connectButton").addEventListener("click", () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const userAccount = accounts[0];
          console.log("Connected MetaMask Account:", userAccount);
          document.getElementById("userAccount").innerText = userAccount;
          initContract(new Web3(window.ethereum));
        })
        .catch((error) => {
          console.error("Error connecting MetaMask:", error);
        });
    } else {
      alert("Please install MetaMask to use this DApp.");
    }
  });
};
