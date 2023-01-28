const searchtheNews = (searchQuerry) => {
  fetch(
    `https://newsapi.org/v2/everything?apiKey=2c32171f9b3a4c1696af4da080da5ffd&q=${searchQuerry}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      let ihtml = [];
      for (let key in data.articles) {
        ihtml.push(`
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${data.articles[key].urlToImage}" alt="Card image cap">
          <div class="card-body" style="display: flex; flex-direction: column;">
            <h5 class="card-title">${data.articles[key].source.name}</h5>
            <p> ${data.articles[key].title}</p>
            <a href="${data.articles[key].url}" class="btn btn-primary" style="margin-top: auto;">Visit here</a>
          </div>
        </div>
    `);
      }
      document.getElementById("formSubmit").addEventListener("click", (e) => {
        e.preventDefault();
        const NewsBar = document.getElementById("NewsBar").value;
        document.getElementById("feedMessage").innerHTML =
          "Showing news feed on " + NewsBar;
        searchtheNews(NewsBar);
      });

      cardContainer.innerHTML = ihtml.join("");
    })
    .catch((err) => {
      console.log(err);
    });
};

searchtheNews("military");
