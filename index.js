import listen from "./src/app.js";

listen.listen(3001, () => {
  console.log(`Server listening at port ${3001}`); // eslint-disable-line no-console
});
