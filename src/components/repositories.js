import React, { Component, Fragment } from 'react'
import Container from './container';

class Repos extends Component {
    constructor(props){
        super(props)
        this.state = {
            repos: [],
            showSearch: false
        }
        this.FetchRepositories = this.FetchRepositories.bind(this);
    }
    componentDidMount(){
         this.FetchRepositories()
    }
    FetchRepositories(){
        const urlTofetch = `https://api.github.com/users/${this.props.state.username}/repos?sort=desc`
        if(this.props.state.username === undefined){
            return false;
        }
        fetch(urlTofetch)
        .then(response => response.json()) 
        .then(data => {this.setState({repos:data})})
      }

    render(){
        return(
            <div>
               <Container state={this.props.state} estado={this.state} handleChange={this.props.handleChange} toConcat={this.props.toConcat}  FetchRepositories={this.props.FetchRepositories} >
                    <div id="repoInfos">{this.state.repos.map((repositorio) => (
                        <div key={repositorio.id}>
                            <h4><span>Nome: </span>{repositorio.name}</h4>
                            <h4><span>Linguagem: </span>{repositorio.language}</h4>
                            <h4><a href={repositorio.html_url} target="_blank">Mais detalhes no github</a></h4>
                        </div>
                    ))}</div>
                </Container>
              </div>
        )
    }
}

export default Repos