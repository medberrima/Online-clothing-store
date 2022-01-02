import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
    <div>
      <div className="home " style={{height: 800, backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")', backgroundSize: 'cover'}}>
        <div className="font-weight-bold" style={{paddingTop: '15%', textAlign: 'center'}}>
          <p style={{fontSize: 120}} className="text-white font-weight-bold" href="#">Fash<span className="text-primary">Ion</span>.TN</p>
          <p style={{fontSize: 35, color: '#fff', fontWeight: 100, marginTop: '-50px'}}>The true elegance is here !</p>
        </div>
      </div>  
      <div className="container py-5 ">
        <header className="text-center ">
          <h1 className="display-4 font-weight-bold ">Clothes Fashion.TN</h1>
        </header>
          <hr></hr>
      </div>
  </div>

    )
  }
}
