const loggedOutLinks = document.querySelectorAll('.signup-link');
const loggedInLinks = document.querySelectorAll('.login-link');
const accountDetails = document.querySelector('.account-details');
const jumbotron = document.querySelector('.jumbotron-section');

function showPasswordSignup() {
    var x = document.getElementById("signup-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  function showPasswordLogin() {
    var x = document.getElementById("login-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const setupUI = (user) => {
    if(user){
     
     db.collection('users').doc(user.uid).get().then(doc => {
       //Account info
      const html = `
      <div>Logged in as : <br>
      <b>Name</b> : ${doc.data().name} <br>
      <b>Email</b> : ${user.email}
      <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
     `;
     accountDetails.innerHTML = html;
     });
      
      //toggle UI elements
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
      jumbotron.style.display = 'none';
    }
    else{
      //Hide account info
      //adminItems.forEach(item => item.style.display = 'none');
      accountDetails.innerHTML ='';
   
     loggedInLinks.forEach(item => item.style.display = 'none');
     loggedOutLinks.forEach(item => item.style.display = 'block');
     jumbotron.style.display = 'block';
    }
   };