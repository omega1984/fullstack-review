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
      data: 'json',
      success: (data) => {
        console.log(data);
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
      statusCode: {
        200: (data) => {
          console.log("get route working", data);
          $.ajax({
            url: '/repos',
            type: 'GET',
            data: 'json',
            success: (data) =>{
              this.setstate({
                repos: data
              })
            }
          })
        },
        400: () => {
          console.log("send username from client to server failed")
        }
      }
    })
    // $.post('/repos', {username: term}, (data1)=>{
    //   console.log("post data: ", data1);
    //   $.get('/repos', (data2)=>{
    //     console.log("get data from database: ", data2);
    //     this.setState({
    //       repos: data2
    //     })
    //   })
    // })
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