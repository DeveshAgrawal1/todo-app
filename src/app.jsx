var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('firebase');
var Reactfire = require('reactfire');
var Header = require('./header');
var List = require('./list');

var rootUrl = 'https://radiant-heat-7027.firebaseio.com/';

var App = React.createClass({
  mixins: [Reactfire],
  getInitialState: function() {
    return {
      items:{},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl+'items/');
    this.bindAsObject(this.fb,'items');
    this.fb.on('value',this.handleDataLoaded);
  },
  render: function() {
    console.log(this.state);
    return <div className= "row panel panel-default">
      <div className = "col-md-8 col-md-offset-2">
        <h2 className="text-center">
        To do list
        </h2>
        <Header itemStore={this.firebaseRefs.items}/>
        <hr/>
        <div className={"content "+ (this.state.loaded? "loaded" : "")}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  deleteButton: function(){
    if(!this.state.loaded){
    return
    }
    else {
      return <div className= "text-center clear-complete">
        <hr />
        <button type="button"
          onClick = {this.onDeleteDoneClick}
          className = "btn btn-default"
        >
        Clear Complete
        </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items){
      if(this.state.items[key].done === true){
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded:true});
  }
});


var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
