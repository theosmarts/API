import app from "./app";

let port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})
