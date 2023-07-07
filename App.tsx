import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
  
}

class App extends Component<{}, IState> {
  state: {
    // data saves the server responds.
    // We use this state to parse data down to the child element (Graph) as element property
    showGraph: boolean,
    data: never[];
  };
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if(this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }   
  }


  getDataFromServer() {
    let x=0;
    const interval= setInterval(()=> {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
      
        this.setState({
           data: serverResponds,
          showGraph: true,
         });
      });

    
    x++;
    if (x>1000){
      clearInterval(interval);
    }
    
  },100);
  // setState(arg0: { data: ServerRespond[]; }) {
  //   throw new Error('Method not implemented.');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
