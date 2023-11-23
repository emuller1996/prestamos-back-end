import listen from "./src/app.js";

listen.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`); // eslint-disable-line no-console
});
