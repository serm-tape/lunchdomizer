import React from 'react'
import {render} from 'react-dom'
import dChoice from './choices'

function getOdd(choice){
    const odd = {}
    const sum = Object.keys(choice).map( c => choice[c].value ).reduce( (p, c) => p+c, 0)
    Object.keys(choice).map( k => odd[k] = (choice[k].value / sum * 100).toFixed(2))
    return odd
}

let choice = JSON.parse(localStorage.getItem('choice'))
if(!choice){
    localStorage.setItem('choice', JSON.stringify(dChoice))
    choice = dChoice
}
const odd = getOdd(choice)


const buttonStyle = {
    cursor: 'pointer',
    fontSize: 22,
    flex: '0 1 auto',
    margin: 5,
    padding: '20 5',
    border: 0,
    borderRadius: 10,
    backgroundColor: '#5C6773',
    color: '#D9D7CE',
    fontFamily:'"Ubuntu", sans-serif'
}

class App extends React.Component{
    state = { currentChoice: choice, result: '{tap random}', odd: odd }
    render(){
        return (
            <div>
                <div style={{padding: 4, position:'absolute', top:'5em', maxWidth:'30%', backgroundColor:'#343F4C', color:'#607080'}}>
                    {Object.keys(this.state.odd).map( k => <i key={k}>{k+': '+this.state.odd[k]+'%'} <br/></i>)}
                </div>
                <div style={{textAlign:'center', width:'100%', height:'100vh', display:'flex', flexFlow:'column', fontFamily:'"Ubuntu", sans-serif'}}>
                    <div style={{backgroundColor:'#FFCC66', color: '#000'}}><h1>Lunchdomizer</h1></div>
                    <h1 style={{flex:'1 1 auto', display:'flex', alignItems:'center', justifyContent:'center'}}>{this.state.result}</h1>
                    <button onClick={this.random.bind(this)} style={buttonStyle}><b> Random </b></button>
                    <button onClick={this.submit.bind(this)} style={buttonStyle}><b> Submit </b></button>
                    <div style={{display:'flex', flexFlow:'row'}}>
                        <input id='add' type='text' style={{...buttonStyle, flex:'1 1 auto', cursor:'text', textAlign:'center'}}/>
                        <button onClick={this.add.bind(this)} style={{...buttonStyle, width:'20vw'}}><b> + </b></button>
                    </div>
                </div>
            </div>
        )
    }

    random(){
        const cand = Object.keys(this.state.currentChoice)
        let accu = 0
        const range = [0, ...(cand.map( k => accu += this.state.currentChoice[k].value ))]
        const pick = Math.floor(Math.random() * accu)
        let result 
        for(let i=1; i<range.length; i++){
            if(pick >= range[i-1] && pick < range[i]){
                result = cand[i-1]
                break
            }
        }
        this.setState({result: result})
    }

    submit(){
        if(this.state.result == null || this.state.result == '{tap random}') return
        for(let k in choice){
            if (k==this.state.result && choice[k].value > 1){
                choice[k].value -= 1
            }else{
                choice[k].value += 1
            }
        }
        localStorage.setItem('choice', JSON.stringify(choice))
        const odd = getOdd({...choice, ...this.state.currentChoice})
        this.setState({odd: odd})
    }

    add(){
        const name = document.getElementById('add').value
        choice[name] = {value: 10, tag:[]}
        this.setState({currentChoice: {...choice}, odd: getOdd(choice)})
        localStorage.setItem('choice', JSON.stringify(choice))
    }
}

//add service worker
if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js').then( r => console.log(r) )
}

render(<App />, document.getElementById('app'))
