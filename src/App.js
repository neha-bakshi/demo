import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {debounce} from 'throttle-debounce';

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      count:0,
      interval: "",
      respnseData : []
    }
    this.timer = debounce(3000, this.timer);
  }
  getData(){
    console.log(this.state.count, "hjhj");
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+this.state.count).
    then(response =>  response.json()).
    then(data => {
     let ress = data.hits.map(data => {
      return (
        <tr  key={data.title}><td>{data.title}</td><td>{data.url}</td><td>{data.author}</td><td>{data.created_at}</td></tr>
      )
      });
      
      this.setState({respnseData : ress})
    }
    )
      
  }
  componentDidUpdate(){
    this.timer()
  }
  abc(){
    console.log(this.state.count,"SFEFEWFE")
  }
  timer() {
    this.setState({ count: this.state.count + 1}, () => this.getData());
  }
  componentDidMount(){
    this.setState({ count: this.state.count + 1}, () => this.getData());
  }
 
  render(){
    console.log(this.state.count,"ssds")
     return(
     <div>
       <table>
         <thead>
         <tr>
           <th>Title</th>
           <th>Url</th>
           <th>Author</th>
           <th>Created At</th>
        </tr>
        </thead>
        <tbody>{this.state.respnseData.length > 0 ? this.state.respnseData  : ""}</tbody>
      </table>
      {this.state.respnseData.length > 0 ? <p className="green">{this.state.count}</p> : ""}
    </div>
     )
    
  }
}

export default App;
