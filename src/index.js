import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    //runs through babel and is turned into something that all browsers can understand
    state = {lat: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if(!this.state.lat && this.state.errorMessage){
            return <div>Error: {this.state.errorMessage}</div>
        } else if(this.state.lat && !this.state.errorMessage){
            //seasonDisplay will re-render itsel
            return <SeasonDisplay lat={this.state.lat} />;
        } else {
            return <div><Spinner message="Please accept location request" /></div>
        }
    }

    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));


/*
    Life Cycle Methods
    constructor
        - one time initializations or setup

    render
        - try to just return jsx only here
    
    *content loads on screen*
    
    componentDidMount
        - Called one time after our content gets loaded onto the screen
        - recomended to do data loading here(one time)

    *sit and wait for updates i.e. set state*
    
    componentDidUpdate
        - any time our component updates itself
        - good place to do more data loading when stat/props change that needs to be
        done whenever some state is updated

    *Sit and wait until this component is no longer shown*
    
    componentWillUnmount
        - Called when no longer showing this component
        - Clean up especially for non-React stuff
*/