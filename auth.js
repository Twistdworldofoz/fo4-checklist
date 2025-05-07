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

// Always set persistent session
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(console.error);

// Wait until Firebase tells us if user is signed in
auth.onAuthStateChanged(user => {
  if (user) {
    // ✅ Already logged in
    if (typeof onUserSignedIn === "function") onUserSignedIn(user);
  } else {
    // ❌ Not signed in — show popup once
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if (typeof onUserSignedIn === "function") onUserSignedIn(result.user);
      })
      .catch(err => {
        const statusEl = document.getElementById("status");
        if (statusEl) statusEl.innerText = "Auth error: " + err.message;
      });
  }
});
