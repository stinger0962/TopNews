import './NewsPanel.css';
import Auth from '../Auth/Auth';
import NewsCard from '../NewsCard/NewsCard';
import React from 'react';
import _ from 'lodash';

class NewsPanel extends React.Component {
  constructor() {
    super();
    // news: list of news to display
    // pageNum: page number of news when requesting more news
    // loadedAll: if all news from backend is loaded
    this.state = {
                  news: null,
                  pageNum: 1,
                  loadedAll: false
                  };
  }

  // load initial news and listen to mouse scroll event
  componentDidMount() {
    this.loadMoreNews();
    // load news is restricted to 1 call per second
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
    window.addEventListener('scroll', () => this.handleScroll());
  }

  render() {
    if (this.state.news) {
      return (
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return (
        <div id='msg-app-loading'>
          Loading...
        </div>
      );
    }

  }

  // load more news when user scrolls towards page bottom
  handleScroll() {
    // to support old browsers
    let scrollY = window.scrollY || window.pageYOffset ||
                  document.documentElement.scrollTop;
    if ( (window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      this.loadMoreNews();
    }


  }


  renderNews() {
    // DOM element: list of all news cards
    const news_card_list = this.state.news.map(one_news => {
      return (
        // key attribute is provided for virtual DOM to render quickly
        <a className='list-group-item' key={one_news.digest}
          href='#'>
          <NewsCard news={one_news} />
        </a>
      );
    });

    // return nicely wrapped news card list
    return (
      <div className='container-fluid'>
        <div className='list-group'>
          {news_card_list}
        </div>
      </div>
    );
  }

  // send request to load more news into this.state.news
  // request is sent with a token certificated from server
  loadMoreNews() {
    // backend has no more news to serve
    if (this.state.loadedAll == true) {
      return;
    }

    const news_url = 'http://' + window.location.hostname + ':3000'
                      + '/news/userId/' + Auth.getEmail()
                      + '/pageNum/' + this.state.pageNum;
    const request = new Request(news_url, {
       method:'GET',
       headers: {
         'Authorization': 'bearer ' + Auth.getToken(),
       }
     });
    fetch(request)
    .then(res => res.json())
    .then(more_news => {
      if (!more_news || more_news.length == 0) {
        this.setState({loadedAll: true});
      }

      this.setState({
        news: this.state.news ? this.state.news.concat(more_news): more_news,
        pageNum: this.state.pageNum + 1,
      });
    });

  }

}

export default NewsPanel;
