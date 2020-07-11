function showPassword() {
    var x = document.getElementById("signup-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }