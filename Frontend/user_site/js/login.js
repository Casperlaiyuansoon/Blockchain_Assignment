const contractAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B"; // Replace with deployed contract address
const web3 = new Web3(window.ethereum); // Connect to MetaMask
const contract = new web3.eth.Contract(contractABI, contractAddress);

const contractABI = [ [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "LoginSuccessful",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ];

const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");
  const Web3 = require("web3");

  //Before interacting with the smart contract, prompt the user to connect their MetaMask:
  async function connectWallet() { 
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Wallet connected");
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

//This function calls the register function in the smart contract.
//Call registerUser(email, password) when the user clicks the register button.
async function registerUser(email, password) {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.register(email, password)
        .send({ from: accounts[0] })
        .on("receipt", function (receipt) {
            console.log("User registered:", receipt);
            alert("Registration successful!");
        })
        .on("error", function (error) {
            console.error("Registration failed:", error);
        });
}

//This function calls the login function in the smart contract.
//Call loginUser(password) when the user clicks the login button.
async function loginUser(password) {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.login(password).call({ from: accounts[0] });

    if (result) {
        alert("Login successful!");
        console.log("User logged in");
    } else {
        alert("Login failed. Incorrect password.");
    }
}




// js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// js code to appear signup and login form
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});

//remember me
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const loginButton = document.querySelector(".input-field.button input");

  // Load saved credentials if available
  if (localStorage.getItem("rememberMe") === "true") {
    emailInput.value = localStorage.getItem("email") || "";
    passwordInput.value = localStorage.getItem("password") || "";
    rememberMeCheckbox.checked = true;
  }

  loginButton.addEventListener("click", function () {
    if (rememberMeCheckbox.checked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", emailInput.value);
      localStorage.setItem("password", passwordInput.value);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    alert("For testing purpose can remove once completed Login successful!");
  });
});


