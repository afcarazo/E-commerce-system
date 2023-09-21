function createdUser() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const dniCuit = document.getElementById("dniCuit").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const postalCode = document.getElementById("codNumber").value;

  const user = {
    firstName: firstName,
    lastName: lastName,
    dniCuit: dniCuit,
    address: address,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    postalCode: postalCode,
  };

  const userJSON = JSON.stringify(user);

  localStorage.setItem("user", userJSON);

  console.log(user);
}

const form = document.getElementById("form-checkout");

form.addEventListener("submit", (event) => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword && password != "" && confirmPassword != "") {
        event.preventDefault();
        createdUser();
        console.log("aca");
        console.log(password,confirmPassword);
        window.location.href = "../pages/payment.html";
    } else { 
        console.log(password, confirmPassword);
        event.preventDefault();
        const passwordMismatch = document.getElementById("passwordMismatch");
        passwordMismatch.style.display = "block";
    }
});
