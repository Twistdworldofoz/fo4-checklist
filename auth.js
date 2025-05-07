// auth.js

const firebaseConfig = {
  apiKey: "AIzaSyA5tEVBQeoWAJjZsjO3TJvEKuffy_uilDM",
  authDomain: "fo4-checklist.firebaseapp.com",
  projectId: "fo4-checklist",
  storageBucket: "fo4-checklist.appspot.com",
  messagingSenderId: "8298158004",
  appId: "1:8298158004:web:f8fe5e16b4fc93f9397921"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    if (!auth.currentUser) {
      return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  })
  .then(result => {
    const user = auth.currentUser || result.user;
    if (user && typeof onUserSignedIn === "function") {
      onUserSignedIn(user);
    }
  })
  .catch(err => {
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "Auth error: " + err.message;
  });

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  }
});
