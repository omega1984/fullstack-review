import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount(){
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        console.log("refreshed data", data);
        this.setState({
          repos: data
        })
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: "/repos",
      type: "POST",
      data: {username: term},
      success: (data) =>{
        $.ajax({
          url: '/repos',
          type: 'GET',
          success: (data) =>{
            console.log("data received by client", data);
            this.setState({
              repos: data
            })
          }
        })
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));