function getname() {
  const e = document.getElementById('inp');
  var name = e.value;
  return name;
}
const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

var request = new XMLHttpRequest();
var name = getname();
request.open('GET', 'https://api.social-searcher.com/v2/search?q='+name+'&limit=100&key=489b251c8c61b6396996e79670211b62', true);
request.onload = function () {
  var data = JSON.parse(this.response);
  if (this.status >= 200 && this.status < 400) {
    data.posts.forEach(post => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = post.network;

      const p = document.createElement('p');
      p.textContent = "Post : " + post.text + "\nSentiment : " + post.sentiment + "\nLink : " + post.url;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('p');
    //errorMessage.style.color = red;
    //errorMessage.style.fontSize = 30;
    errorMessage.textContent = "Error 400 !";
    app.appendChild(errorMessage);
  }
}

request.send();
