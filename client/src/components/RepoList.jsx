import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {
      props.repos.map((repo, index) => {
      if (index === 0){
        return repo.login
      }
    })
    }' repos:

    {
      props.repos.map((repo, index) =>{
        if (index < 25){
          return <div>{index+1}: <a href={`${repo.url}`}>{repo.url}</a></div>
        }
      })
    }

    <div>
    There are total {props.repos.length > 25 ? 25 : props.repos.length} repos.
    </div>
  </div>
)

export default RepoList;