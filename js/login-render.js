

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //**-- Carrega os dados do Usuario na sessao --*/
    sessionStorage.userID       = profile.getId();
    sessionStorage.userName     = profile.getName();
    sessionStorage.userImageURL = profile.getImageUrl();
    sessionStorage.userEmail    = profile.getEmail();
}

function onFailure(error) {
    console.log(error);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      sessionStorage.userID       = undefined;
      sessionStorage.userName     = undefined;
      sessionStorage.userImageURL = undefined;
      sessionStorage.userEmail    = undefined;
    });
}

function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
      });
}
