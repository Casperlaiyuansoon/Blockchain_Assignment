const step1 = document.querySelector(".step1"),
  step2 = document.querySelector(".step2"),
  step3 = document.querySelector(".step3"),
  step4 = document.querySelector(".step4"),
  emailAddress = document.getElementById("emailAddress"),
  verifyEmail = document.getElementById("verifyEmail"),
  inputs = document.querySelectorAll(".otp-group input"),
  nextButton = document.querySelector(".nextButton"),
  verifyButton = document.querySelector(".verifyButton");
changeButton = document.querySelector(".changeButton");

let OTP = "";
window.addEventListener("load", () => {
  emailjs.init("l54SkvVKPDgMZCl4S");
  step2.style.display = "none";
  step3.style.display = "none";
  step4.style.display = "none";
  nextButton.classList.add();
});

const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    nextButton.classList.remove("disable");
  } else {
    nextButton.classList.add("disable");
  }
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

inputs.forEach((input) => {
  input.addEventListener("keyup", function (e) {
    if (this.value.length >= 1) {
      e.target.value = e.target.value.substr(0, 1);
    }
    if (
      input[0].value != "" &&
      input[1].value != "" &&
      input[2].value != "" &&
      input[3].value != ""
    ) {
      verifyButton.classList.remove("disable");
    } else {
      verifyButton.classList.add("disable");
    }
  });
});

const serviceID = "service_xnbovhd";
const templateID = "template_3wkcx6d";
nextButton.addEventListener("click", () => {
  OTP = generateOTP();
  nextButton.innerHTML = "&#9889; Sending...";
  let templateParameter = {
    from_name: "Casper Lai Yuan Soon",
    OTP: OTP,
    message: "Please Find out the attached file",
    reply_to: "",
  };

  emailjs.send(serviceID, templateID, templateParameter).then(
    (res) => {
      console.log(res);
      nextButton.innerHTML = "Next &rarr;";
      step1.style.display = "none";
      step2.style.display = "block";
      step3.style.display = "none";
    },
    (err) => {
      console.log(err);
    }
  );
});

verifyButton.addEventListener("click", () => {
  let values = "";
  inputs.forEach((input) => {
    values += input.value;
  });

  if (OTP == values) {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
  } else {
    verifyButton.classList.add("error-shake");

    setTimeout(() => {
      verifyButton.classList.remove("error-shake");
    }, 1000);
  }
});

function changeMyEmail() {
  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";
}

// New Event Listener for Change Button (Step 3 -> Step 4)
changeButton.addEventListener("click", () => {
  step3.style.display = "none";
  step4.style.display = "block";
});
