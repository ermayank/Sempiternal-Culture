//Check the auth change
auth.onAuthStateChanged(user => {
    
    if (user) {
        //Get data from firestore (guides)
        db.collection('guides').onSnapshot(snapshot => {
            //setupGuides(snapshot.docs); // Function to get guides 
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
        sloginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })

});