/*var click = document.getElementById('srch');
var input = document.getElementById('inp');
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    click.click();
  }
});*/

var click = document.getElementById('srch');
click.onclick = function (){
  var name = document.getElementById('inp').value;
  if(name !== "") {
    const b = document.getElementById('page');
    b.style.display = "none";
    const l = document.getElementById('load');
    l.style.display = "block";
    const lt = document.getElementById('loadtext');
    lt.style.display = "block";

    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.social-searcher.com/v2/search?q='+name+'&lang=en&limit=100&key=489b251c8c61b6396996e79670211b62', true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      l.style.display = "none";
      lt.style.display = "none";

      if (this.status >= 200 && this.status < 400) {
        data.posts.forEach(post => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');

          const h1 = document.createElement('h1');
          h1.setAttribute('class', 'head');
          h1.textContent = post.network;

          if(post.sentiment == 'positive') {
            h1.style = 'background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);';
          } else if(post.sentiment == 'neutral') {
            h1.style = 'background-image: linear-gradient(120deg, #e2a079 0%, #e6db7f 100%);';
          } else {
            h1.style = 'background-image: linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%);';
          }

          const p = document.createElement('p');
          p.setAttribute('class', 'para');
          p.textContent = 'Post : ' + post.text.substr(0,200) + '...';

          const img = document.createElement('img');
          img.setAttribute('class', 'image');
          img.setAttribute('src', post.user.image);
          img.setAttribute('height','150');
          img.setAttribute('width','150');

          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          card.appendChild(img);
        });
      } else {
        const errorMessage = document.createElement('p');
        //errorMessage.style.color = red;
        //errorMessage.style.fontSize = 30;
        errorMessage.textContent = 'Error 400 !';
        app.appendChild(errorMessage);
      }
    }

    request.send();
  } else {
    alert('Nothing Entered !!');
  }
}