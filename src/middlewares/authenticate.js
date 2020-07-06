const admin = require("firebase-admin");
const serviceAccount = require("../../fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

function authenticate(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    const splitToken = authorization.split("Bearer ");
    const token = splitToken[1];
    admin
      .auth()
      .verifyIdToken(token)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
}

export default authenticate;
