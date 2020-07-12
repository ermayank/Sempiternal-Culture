const loggedOutLinks = document.querySelectorAll('.signup-link');
const loggedInLinks = document.querySelectorAll('.login-link');
const accountDetails = document.querySelector('.account-details');
const jumbotron = document.querySelector('.jumbotron-section');
const taskSection = document.querySelector('.taskSection');

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

// Show all assigned tasks
const assignedTasks = (data) => {

  if(data.length){
  let html = '';
  data.forEach(doc => {
    const task = doc.data();
    let li = `
    <li class="card my-1">
      <div class="card-body">
        <div class="task-user-content">
          <div class="row">
            <div class="col-md-4">
              <p class="display-5"><b>Publishing date</b>  : ${task.pub_date}</p>
              <p><b>Publishing Time </b>- ${task.pub_time}</p>
            </div>
            <div class="col-md-4">
              <p class="display-5"><b>Author</b>  : ${task.author}</p>
              <p><b>Link </b>- <a href="${task.doc_link}">Document Link</a></p>
            </div>
            <div class="col-md-4">
              <p class="display-5"> <h3><span class="badge badge-${task.status_color}">${task.status}</span></h3></p>
              
            </div>
          </div>
        </div>
      </li>
    `;
    html += li;
  });
  taskSection.innerHTML = html;
}
else{
  taskSection.innerHTML = '<h5 class="center-align"> Login to view the guides</h5>' 
}
}