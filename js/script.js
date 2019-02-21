var input = document.getElementById('inp');
var search_button = document.getElementById('search');

search_button.onclick = function() {
  document.getElementById('title_sf').style.display = 'none';
  document.getElementById('load').style.display = 'block';
  var query = input.value;

  const app = document.getElementById('root');
  app.style.display = 'block';

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.social-searcher.com/v2/search?q=\''+query+'\'&lang=en&limit=100&key=489b251c8c61b6396996e79670211b62', true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    document.getElementById('bd').style = 'background-image: none';
    document.getElementById('load').style.display = 'none';
    document.getElementById('page').style.display = 'block';

    if (this.status >= 200 && this.status < 400) {
      data.posts.forEach(post => {

        const container = document.createElement('div');
        container.setAttribute('class','card card-nav-tabs text-center');

        const card = document.createElement('div');
        card.setAttribute('class','card-header card-header-primary');
        card.innerHTML = post.network.bold();

        if(post.sentiment == 'positive') {
          card.style = 'background-image: linear-gradient(120deg, rgb(204, 199, 52) 0%, rgb(134, 210, 124) 100%)';
        } else if(post.sentiment == 'neutral') {
          card.style = 'background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)';
        } else {
          card.style = 'background-image: linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%)';
        }

        const card_body = document.createElement('div');
        card_body.setAttribute('class','card-body');

        const title_link = document.createElement('a');
        title_link.href = post.user.url;
        title_link.target = '_blank';
        const title = document.createElement('h4');
        title.setAttribute('class','card-title');
        if(post.user.location !== undefined) {
          title.innerHTML = post.user.name + ' (' + post.user.location + ')';
        } else {
          title.innerHTML = post.user.name;
        }

        const post_date = document.createElement('h5');
        post_date.setAttribute('class','card-subtitle mb-2 text-muted');
        post_date.innerHTML = post.posted.substr(0,19);

        const text = document.createElement('p');
        text.setAttribute('class','card-text');
        text.innerHTML = post.text.substr(0,100) + '...';

        const link1 = document.createElement('a');
        link1.setAttribute('class','card-link');
        link1.href = post.url;
        link1.target = '_blank';
        link1.innerHTML = 'Link to Post';

        app.appendChild(container);
        container.appendChild(card);
        container.appendChild(card_body);
        card_body.appendChild(title_link);
        title_link.appendChild(title);
        card_body.appendChild(post_date);
        card_body.appendChild(text);
        card_body.appendChild(link1);

        if(post.image !== '') {
          const link2 = document.createElement('a');
          link2.setAttribute('class','card-link');
          link2.href = post.image;
          link2.target = '_blank';
          link2.innerHTML = 'Link to Image';
          card_body.appendChild(link2);
        }
      });

      const rel = document.createElement('script');
      rel.setAttribute('src','assets/js/script.js');
      app.appendChild(rel);
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.style = 'color:red';
      errorMessage.style = 'fontSize:40px';
      errorMessage.textContent = 'Error 400 : Bad Request !';
      app.appendChild(errorMessage);
    }
  }

  request.send();
}

input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    alert('Working...');
    search_button.click();
  }
});
