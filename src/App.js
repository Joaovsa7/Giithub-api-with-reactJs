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
        login: undefined,
        avatar_url: undefined,
        followers: undefined,
        following: undefined,
        location: undefined,
        html_url: undefined,
        id: undefined
      }],
      repos: [],
      noInput: false,
      anyError: false,
      bigThanTwo: false,
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
  fetchData(){
    const controller = new AbortController();
    const signal = controller.signal
    if(this.state.value === undefined || this.state.value === ''){
      this.setState({noInput: true, anyError: true})
      controller.abort();
      return false;
    }
    const urlTofetch = `https://api.github.com/users/${this.state.value}`
    fetch(urlTofetch)
    .then(response => response.json())
    .then(data => {
      this.setState({
        user:[data], 
        showRep: true, 
        value: ''})
      if(data.login === undefined){
        this.setState({anyError: true, showRep: false, value: ''})
        controller.abort();
      }
      if(data.id === undefined){
        this.setState({anyError: true})
      }
    })
    //preciso tratar melhor o erro do .catch
    .catch(err => {this.setState({anyError: true})});
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
                      <Route exact path="/" render={() => <Profile state={this.state} user={this.state.user} handleChange={this.handleChange} toConcat={this.toConcat}  fetchData={this.fetchData} />
                  } />
                      <Route exact path="/repos" render={() => <Repos state={this.state} user={this.state.user} handleChange={this.handleChange} toConcat={this.toConcat}  fetchData={this.fetchData} />
                  } />
                  </Switch>
            </div>
        );
      }
    }
  
  App.defaultState = {
    username: 'Search your user',
    showRep: false
  }

  export default App;
  