import React, { Component } from "react";
import * as rxjs from 'rxjs';
import { timer } from 'rxjs';

import "./Timer.css";

class Timer extends Component{
    state = {
        countHrs: 0,
        countMin: 0,
        countSec: 0,
        countdown: 1000,
        myTimer: null
    };

    // getInterval = undefined;


// Logic for RxJs  ==============================================================================
    
    getSec() {
        const s = Math.floor((this.state.countdown % (1000 * 60)) / 1000);
        this.setState({countSec: s})
    };

    getMin() {
        const m = Math.floor((this.state.countdown % (1000 * 60 * 60)) / (1000 * 60));
        this.setState({countMin: m})
    };

    getHours() {
        const h = Math.floor((this.state.countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.setState({countHrs: h})
    };

    onRxClick = () => {
      this.state.myTimer = timer(1000, 1000).subscribe(data => {
            this.state.countdown += 1000;
      
            this.getHours();
            this.getMin();
            this.getSec();
        });
        
    };
//====================================================================================================== 
    
    // onStart = () => {
    //     clearInterval(this.getInterval);
    //     this.getInterval = setInterval(() => {
           
    //         }, 1000
    //     );
    // };

    onPause = () => {
         this.state.myTimer.unsubscribe();  
    };

    onStop = () => {
        this.state.myTimer.unsubscribe();
    
      this.setState({countSec: 0, countMin: 0, countHrs: 0, myTimer: null})
    };

    render() {
        
        const { countHrs, countMin, countSec } = this.state;
        return (
        <div className="container">
            <h2 className="container__title">Timer</h2>
                <span className="container__h">{countHrs < 10 ? `0${countHrs}` : countHrs }: </span>
                <span className="container__m">{countMin < 10 ? `0${countMin}` : countMin }: </span>
                <span className="container__s">{countSec < 10 ? `0${countSec}` : countSec } </span>
            <div>
                <button
                        type="button"
                        className="container__btn"
                        onClick={this.onRxClick}
                    >Start</button>
                <button
                        type="button"
                        className="container__btn"
                        onClick={this.onPause}
                    >Pause</button>
                <button
                        type="button"
                        className="container__btn"
                        onClick={this.onStop}
                    >Stop</button>
            </div>
        </div>  
        )
    };
};

export default Timer;