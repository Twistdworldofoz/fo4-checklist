fetch("/getFirebaseConfig")
  .then(res => res.json())
  .then(config => {
    firebase.initializeApp(config);
    const auth = firebase.auth();

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(console.error);

    auth.onAuthStateChanged(user => {
      if (user) {
        if (typeof onUserSignedIn === "function") onUserSignedIn(user);
        showLogout(auth);
      } else {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(result => {
            if (typeof onUserSignedIn === "function") onUserSignedIn(result.user);
            showLogout(auth);
          })
          .catch(err => {
            const statusEl = document.getElementById("status");
            if (statusEl) statusEl.innerText = "Auth error: " + err.message;
          });
      }
    });
  })
  .catch(err => {
    console.error("Failed to load Firebase config:", err);
  });

function showLogout(auth) {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      });
    });
  }
}
