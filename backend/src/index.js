import app from "./app.js";

const main = () => {
  app.listen(app.set("port"));
  console.log(
    `Hey my partner you are good Server is running on port ${app.set("port")}\nhola mundo esta todo bien `
  );
};

main();
