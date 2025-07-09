const admin = require("firebase-admin");

// Path to your service account key JSON file
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace with the user's UID you want to make admin
const uid = "HcRnJMthoteoOyqj71x42K7oaYR2";

admin
  .auth()
  .setCustomUserClaims(uid, { role: "admin" })
  .then(() => {
    console.log("Custom claim set for user", uid);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error setting custom claim:", error);
    process.exit(1);
  });
