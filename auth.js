
firebase.initializeApp({
  apiKey: "AIzaSyA5tEVBQeoWAJjZsjO3TJvEKuffy_uilDM",
  authDomain: "fo4-checklist.firebaseapp.com",
  projectId: "fo4-checklist",
  storageBucket: "fo4-checklist.firebasestorage.app",
  messagingSenderId: "8298150004",
  appId: "1:8298150004:web:f8fe5e16b4fc93f9937921"
  
});

const auth = firebase.auth();

// ✅ Set persistent login so it works across page reloads
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Only sign in if user is not already logged in
    if (!auth.currentUser) {
      return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  })
  .then((result) => {
    const user = auth.currentUser || result.user;
    if (user) {
      const statusEl = document.getElementById("status");
      if (statusEl) statusEl.innerText = `Signed in as ${user.email}`;
    }
  })
  .catch((err) => {
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "Auth error: " + err.message;
  });
