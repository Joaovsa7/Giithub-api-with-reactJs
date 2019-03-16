import React, { Component } from 'react';
import * as Styles from './styles/style.scss'
import CardUser from './components/cardUser';
import Profile from './components/profile';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Repos from './components/repositories';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: [{
        username: undefined,
        login: undefined,
        avatar_url: undefined,
        followers: undefined,
        following: undefined,
        location: undefined,
        html_url: undefined,
        id: undefined,
      }],
      errorInfo: false,
      anyError: false,
      showRep: false,
      value: ''
    }
    this.fetchData = this.fetchData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    if(this.state.username === undefined) return false;
    this.fetchData();
  }
  fetchData = () => {
    const controller = new AbortController();
    const signal = controller.signal
    if(this.state.value === ""){
      this.setState({anyError: true, errorInfo: "O campo não pode estar vazio"})
      controller.abort()
      return false
    }
    const urlTofetch = `https://api.github.com/users/${this.state.value}`
    fetch(urlTofetch)
    .catch(err => {this.setState({ anyError: true, errorInfo: `${err}`})
      return false;
    })
    .then(response => {
      if(response.status === 403){
        this.setState({anyError: true, errorInfo: "Você realizou muitas solicitações erradas, tente novamente em alguns minutos"})
      }
      if(response.status === 404){
        this.setState({anyError: true, errorInfo: "O Usuário não foi encontrado"})
      }
      if(response.status === 200){
        response.json()
        .then(response => {this.setState({ user:[response], showRep: true, value: ''})})
      }
    })
    .catch(err => {this.setState({anyError: true, errorInfo: `${err}`})});
  }
  handleChange(event){
      this.setState({
        value: event.target.value.trim(),
        username: event.target.value.trim(),
        anyError: false,
      })
    }

  toConcat = (cardUser) => {
    this.setState(state => ({
      user: state.user.concat([state]),
      bigThanTwo: true
  }))
}

  render() {
    
    return (
            <div className="App"> 
                  <Switch>
                      <Route exact path="/" render={() => <Profile state={this.state}  handleChange={this.handleChange} toConcat={this.toConcat}  fetchData={this.fetchData} />
                  } />
                      <Route exact path="/repos" render={() => <Repos state={this.state} name={this.state.user.name} handleChange={this.handleChange} toConcat={this.toConcat}  fetchData={this.fetchData} />
                  } />
                  </Switch>
            </div>
        );
      }
    }

  export default App;
  