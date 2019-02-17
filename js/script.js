var click = document.getElementById("srch");
click.onclick = function (){
  var name = document.getElementById('inp').value;
  
  const b = document.getElementById('page');
  b.style.display = "none";
  const l = document.getElementById('load');
  l.style.display = "block";

  const app = document.getElementById('root');
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  app.appendChild(container);

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.social-searcher.com/v2/search?q='+name+'&limit=100&key=489b251c8c61b6396996e79670211b62', true);
  request.onload = function () {
    var data = JSON.parse(this.response);
    l.style.display = "none";

    if (this.status >= 200 && this.status < 400) {
      data.posts.forEach(post => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.setAttribute('class', 'head');
        h1.textContent = post.network;

        const p = document.createElement('p');
        p.setAttribute('class', 'para');
        p.textContent = "Post : " + post.text + "Sentiment : " + post.sentiment + "Link : " + post.url;

        const img = document.createElement('img');
        img.setAttribute('class', 'image');
        var imgsrc = post.user.image;
        img.setAttribute('src', imgsrc);

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(img);
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
}