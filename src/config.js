let _Url =
  process.env.REACT_APP_STAGE !== "production"
    ? "http://localhost:3000/contactform-app"
    : "https://jyotij-2021.github.io/contactform-app";

export { _Url };
