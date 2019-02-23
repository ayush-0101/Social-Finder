var input = document.getElementById('inp');
var search_button = document.getElementById('search');

input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search_button.click();
  }
});

search_button.onclick = function() {
  document.getElementById('title_sf').style.display = 'none';
  document.getElementById('page').style.display = 'none';
  document.getElementById('load').style.display = 'block';
  var query = input.value;

  document.getElementById('root').parentNode.removeChild(document.getElementById('root'));
  const app = document.createElement('div');
  app.setAttribute('id','root');
  document.getElementById('bd').appendChild(app);

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.social-searcher.com/v2/search?q='+query+'&lang=en&limit=100&key=489b251c8c61b6396996e79670211b62', true);
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
        // card.innerHTML = post.network.bold();

        const logo = document.createElement('a');
        logo.target = '_blank';
        logo.href = post.url;

        const logoattr = document.createElement('img');
        logoattr.setAttribute('height','30px');
        logoattr.setAttribute('width','30px');

        switch(post.network) {
          case 'twitter' : logoattr.src = 'assets/img/twitter.svg'; break;

          case 'facebook' : logoattr.src = 'assets/img/fb.svg'; break;

          case 'googleplus' : logoattr.src = 'assets/img/google_plus.svg'; break;

          case 'web' : logoattr.src = 'assets/img/web.svg'; break;

          case 'reddit' : logoattr.src = 'assets/img/reddit.svg'; break;

          case 'youtube' : logoattr.src = 'assets/img/youtube.svg'; break;

          case 'vkontakte' : logoattr.src = 'assets/img/vkontakte.svg'; break;

          case 'vimeo' : logoattr.src = 'assets/img/vimeo.svg'; break;

          case 'tumblr' : logoattr.src = 'assets/img/tumblr.svg'; break;

          case 'instagram' : logoattr.src = 'assets/img/Instagram.svg'; break;

          case 'flickr' : logoattr.src = 'assets/img/flickr.svg'; break;

          case 'dailymotion' : logoattr.src = 'assets/img/dailymotion.svg'; break;
        }

        if(post.sentiment == 'positive' || post.sentiment == 'neutral') {
          card.style = 'background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)';
        // } else if(post.sentiment == 'neutral') {
          // card.style = 'background-image: linear-gradient(120deg, rgb(164, 222, 120) 0%, rgb(104, 191, 92) 100%)';
        } else {
          card.style = 'background-image: linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%)';
        }

        const card_body = document.createElement('div');
        card_body.setAttribute('class','card-body');

        /*
        const post_date = document.createElement('h5');
        post_date.setAttribute('class','card-subtitle mb-2 text-muted');
        post_date.innerHTML = post.posted.substr(0,19);
        */

        /*
        const link1 = document.createElement('a');
        link1.setAttribute('class','card-link');
        link1.href = post.url;
        link1.target = '_blank';
        link1.innerHTML = 'Link to Post';
        */

        app.appendChild(container);
        container.appendChild(card);
        card.appendChild(logo);
        logo.appendChild(logoattr);
        container.appendChild(card_body);

        const title_link = document.createElement('a');
        title_link.href = post.user.url;
        title_link.target = '_blank';

        const title = document.createElement('h4');
        title.setAttribute('class','card-title');
        if(post.user.location !== undefined) {
          title.innerHTML = post.user.name + ' (' + post.user.location + ')  ';
        } else {
          title.innerHTML = post.user.name + '  ';
        }

        card_body.appendChild(title_link);
        title_link.appendChild(title);

        if(post.user.image !== '') {
          const profile = document.createElement('img');
          profile.src = post.user.image;
          profile.setAttribute('height','40px');
          profile.setAttribute('width','40px');
          profile.setAttribute('style','border-radius:50%;');
          title.appendChild(profile);
        }

        const text = document.createElement('p');
        text.setAttribute('class','card-text');
        if(post.text.length <= 300) {
          text.innerHTML = '<br>' + post.text + '<br>';
        } else {
          text.innerHTML = '<br>' + post.text.substr(0,300) + '...<br>';
        }

        //card_body.appendChild(post_date);
        card_body.appendChild(text);

        if(post.image !== '') {
          const post_link = document.createElement('a');
          post_link.href = post.url;
          post_link.target = '_blank';
          const img = document.createElement('img');
          img.src = post.image;
          img.setAttribute('height','250px');
          img.setAttribute('width','250px');
          img.style = 'border-radius: 10%';
          card_body.appendChild(post_link);
          post_link.appendChild(img);
        }
        // card_body.appendChild(link1);
      });
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.style = 'color:red';
      errorMessage.style = 'fontSize:40px';
      errorMessage.textContent = 'Error 40* !';
      app.appendChild(errorMessage);
    }
  }

  request.send();
}
