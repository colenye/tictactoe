import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

let turn = 'X';
function Square( {row, column, getTic} ) {
  const [tic, setTic] = useState();

  function handleClick() {
    getTic([row, column]);
    if (turn == 'X') {
      setTic('X');
      turn = 'O';
    } else {
      setTic('O');
      turn = 'X';
    }
  }
  return (
    <button className="button" onClick={handleClick}>{tic}</button>
  )
}

function Row( {row, getTic} ) {
  return (
    <div className="row">
      <Square row={row} column={1} getTic={getTic}/>
      <Square row={row} column={2} getTic={getTic}/>
      <Square row={row} column={3} getTic={getTic}/>
    </div>
  )
}
function Table() {
  const [globalTic, setGlobalTic] = useState();
  function getTic(tic){
    setGlobalTic(tic);
    console.log(tic);
  }
  return (
    <div className="table">
      <Row row={1} getTic={getTic}/>
      <Row row={2} getTic={getTic}/>
      <Row row={3} getTic={getTic}/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1 className="">
        Tictac
      </h1>
      <Table/>
    </div>
  );
}

export default App;
