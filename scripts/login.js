console.log("login.js is working...");

// Implements User Login.
document.getElementById("signin-btn").addEventListener("click", () => {
  const inputName = getValueFromInputField("username");
  const inputPassword = getValueFromInputField("password");

  console.log(`Username entered: ${inputName}`);
  console.log(`Password entered: ${inputPassword}`);

  if (inputName === "admin" && inputPassword === "admin123") {
    window.location.assign("./home.html");
    alert("Login Successful.");
  } else {
    alert("Login Failed.");
  }
});
