const loggedOutLinks = document.querySelectorAll('.signup-link');
const loggedInLinks = document.querySelectorAll('.login-link');
const accountDetails = document.querySelector('.account-details');
const jumbotron = document.querySelector('.jumbotron-section');
const taskSection = document.querySelector('.taskSection');
const BlogListHeading = document.querySelector('.BlogListHeading');
const authorNameList = document.querySelector('.author-name');
const modifyAuthorNameList = document.querySelector('#task-modify-author-email');
const adminItems = document.querySelectorAll('.admin-link');

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

// Show all assigned tasks
const assignedTasks = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const task = doc.data();
      let li = `
    <li class="card my-1 parent" id="${doc.id}">
      <div class="card-body">
        <div class="task-user-content">
          <div class="row">
            <div class="col-md-4">
              <p class="display-5">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-event text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
  <rect width="2" height="2" x="11" y="6" rx=".5"/>
</svg>
              <b>Publishing Date</b>  : ${task.pub_date}</p>
              <p>
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
  <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
</svg>
<b>Publishing Time </b>- ${task.pub_time}</p>
            </div>
            <div class="col-md-4">
              <p class="display-5">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <b>Author</b>  : ${task.author}</p>
              <p>
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-link-45deg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
  <path d="M5.712 6.96l.167-.167a1.99 1.99 0 0 1 .896-.518 1.99 1.99 0 0 1 .518-.896l.167-.167A3.004 3.004 0 0 0 6 5.499c-.22.46-.316.963-.288 1.46z"/>
  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
  <path d="M10 9.5a2.99 2.99 0 0 0 .288-1.46l-.167.167a1.99 1.99 0 0 1-.896.518 1.99 1.99 0 0 1-.518.896l-.167.167A3.004 3.004 0 0 0 10 9.501z"/>
</svg>
<b>Link </b>- <a href="${task.doc_link}">Document Link</a></p>
            </div>
            <div class="col-md-4">
              <center><h3><span class="badge badge-${task.status_color}">${task.status}</span>
              <button class="btn btn-outline-info modify_button admin-link"  onclick="modify_function(this)">Modify</button>
              </h3></p></center>
            </div>
            
          </div>
        </div>
      </li>
    `;
      html += li;

    })

    taskSection.innerHTML = html;
    BlogListHeading.innerHTML = `<b>Your blogs</b>`;


  } else {
    taskSection.innerHTML = '<h5 class="center-align">No blogs asigned yet !</h5>'
  }
};

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');

    };
    db.collection('users').doc(user.uid).get().then(doc => {
      //Account info
      const html = `
      <div>Logged in as : <br><br>
      <b>Name</b> : ${doc.data().name} <br>
      <b>Email</b> : ${user.email}
      <div class="text-danger">${user.admin ? 'Admin' : ''}</div>
     `;
      accountDetails.innerHTML = html;
    });

    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    jumbotron.style.display = 'none';
  } else {
    //Hide account info
    adminItems.forEach(item => item.style.display = 'none');
    accountDetails.innerHTML = '';

    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    jumbotron.style.display = 'block';
  }
};



//Get list of email address and give to create task
const userNames = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const userName = doc.data();
      let option = `
      <option value="${userName.email}">${userName.email}</option>
    `;
      html += option;
    });
    authorNameList.innerHTML = html;
  } else {
    authorNameList.innerHTML = 'There is some error! Contact Admin'
  }
};

//Get usernames for modify form
const modifyUserNames = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const userName = doc.data();
      let option = `
      <option value="${userName.email}">${userName.email}</option>
    `;
      html += option;
    });
    modifyAuthorNameList.innerHTML = html;
  } else {
    modifyAuthorNameList.innerHTML = 'There is some error! Contact Admin'
  }
};


//Modify form functionality
function modify_function(e){
  const modifyForm = document.querySelector('#task-modify-form');
  let id = e.closest(".parent").attributes["id"].value;
  //console.log(id);

  //Show modify form Modal
  $('#modify-task-modal').modal('show');

  //Get existing data in Modify modal
  db.collection('tasks').doc(id).get().then((doc) => {
    const task = doc.data();
    //console.log(task);

    modifyForm.reset();
    
    modifyForm['task-modify-author-email'].value = task.author;
    modifyForm['task-time'].value = task.pub_time;
    modifyForm['task-date'].value = task.pub_date;
    modifyForm['task-link'].value = task.doc_link;
    modifyForm['inputStatus'].value = task.status;
    modifyForm['doc_id'].value = id;
    
  });
};

function submitHandler() {
  const modifyForm = document.querySelector('#task-modify-form');
  event.preventDefault();
  //console.log('save button clicked');
  id = modifyForm['doc_id'].value;
  //console.log(id);

let status_color = '';
if (modifyForm['inputStatus'].value == 'Assigned') {
  status_color = 'secondary';
} else if (modifyForm['inputStatus'].value == 'Submitted') {
  status_color = 'warning';
} else if (modifyForm['inputStatus'].value == 'Passed') {
  status_color = 'primary';
} else if (modifyForm['inputStatus'].value == 'Published') {
  status_color = 'success';
} else if (modifyForm['inputStatus'].value == 'Rejected') {
  status_color = 'danger';
} else {
  status_color = 'dark';
}

//console.log(status_color);
db.collection('tasks').doc(id).update({
  author: modifyForm['task-modify-author-email'].value,
  status: modifyForm['inputStatus'].value,
  pub_date: modifyForm['task-date'].value,
  pub_time: modifyForm['task-time'].value,
  doc_link: modifyForm['task-link'].value,
  status_color: status_color
}).then(function () {
      //Close modal and reset form
      console.log('updated');
      $("#modify-task-modal").modal("hide");
      modifyForm.reset();
  })
  .catch(err => {
    console.log(err.message);
  });
  
};