module.exports={

  getBook: async (code) => {
    const fetch = require("node-fetch");
  return (
    await fetch(
      `https://openlibrary.org/api/books?bibkeys=${code}&format=json&jscmd=data`
    )
  ).json();
}
}
