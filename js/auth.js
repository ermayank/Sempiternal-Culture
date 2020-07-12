//Check the auth change
auth.onAuthStateChanged(user => {
    
    if (user) {
        //Get data from firestore (guides)
        db.collection('tasks').onSnapshot(snapshot => {
            assignedTasks(snapshot.docs); // Function to get guides 
            setupUI(user);
        });
    } else {
        setupUI();
        //setupGuides([]);
    }
});


//User signup to firebase
const signupForm = document.querySelector('#signup-form');
signupForm.reset();
signupForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
   
    //Signup the user to firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['signup-name'].value
        }); 
    }).then(() => {
        const modal = document.querySelector('#signup-modal');
        $("#signup-modal").modal("hide");
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

//User logout system
const logout = document.querySelector('.logout-btn');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//User Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {

        $("#login-modal").modal("hide");
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })

});

//Save data to tasks to firebase
const createForm = document.querySelector('#task-create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let status_color='';
    if(createForm['inputStatus'].value == 'Assigned'){
        status_color = 'secondary';
    }
    else if(createForm['inputStatus'].value == 'Submitted'){
        status_color = 'warning';
    }
    else if(createForm['inputStatus'].value == 'Passed'){
        status_color = 'primary';
    }
    else if(createForm['inputStatus'].value == 'Published'){
        status_color = 'success';
    }
    else if(createForm['inputStatus'].value =='Rejected'){
        status_color = 'danger';
    }
    else{
        status_color = 'dark';
    }

    db.collection('tasks').add({
        author: createForm['task-author-email'].value,
        status: createForm['inputStatus'].value,
        pub_date: createForm['task-date'].value,
        pub_time: createForm['task-time'].value,
        doc_link: createForm['task-link'].value,
        status_color: status_color
    }).then(() =>{
        //Close modal and reset form
        $("#task-modal").modal("hide");
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})