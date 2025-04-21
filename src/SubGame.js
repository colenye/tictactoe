import './App.css';
import { useState } from 'react';

let turn = 'X';
let table = [[null, null, null],[null, null, null],[null, null, null]]
function Square( {row, column, getTic} ) {
  const [tic, setTic] = useState();
  
  function handleClick() {
    if (tic != null) return;
    getTic([row, column, turn]);
    if (turn === 'X') {
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
      <Square row={row} column={0} getTic={getTic}/>
      <Square row={row} column={1} getTic={getTic}/>
      <Square row={row} column={2} getTic={getTic}/>
    </div>
  )
}
function Table( {makeGameOver} ) {
  function getTic(tic){
    table[tic[0]][tic[1]] = tic[2];
    console.log(table[0]);
    console.log(table[1]);
    console.log(table[2]);
    for (let x = 0; x < 3; x++){
      if (table[x][0] === table[x][1] && table[x][1] === table[x][2] && (table[x][2] === 'X' || table[x][2] === 'O')){
        if(table[x][2] === 'X'){
          makeGameOver('1');
        } else{
          makeGameOver('2');
        }
      } 
      if (table[0][x] === table[1][x] && table[1][x] === table[2][x] && (table[2][x] === 'X' || table[2][x] === 'O')){
        if(table[2][x] === 'X'){
          makeGameOver('1');
        } else{
          makeGameOver('2');
        }
      }
    }
    if (table[0][0] === table[1][1] && table[1][1] === table[2][2] && (table[2][2] === 'X' || table[2][2] === 'O')){
      if(table[2][2] === 'X'){
        makeGameOver('1');
      } else{
        makeGameOver('2');
      }
    } 
    if (table[0][2] === table[1][1] && table[1][1] === table[2][0] && (table[2][0] === 'X' || table[2][0] === 'O')){
      if(table[2][0] === 'X'){
        makeGameOver('1');
      } else{
        makeGameOver('2');
      }
    } 
  }
  return (
    <div className="table">
      <Row row={0} getTic={getTic}/>
      <Row row={1} getTic={getTic}/>
      <Row row={2} getTic={getTic}/>
    </div>
  )
}

export default function SubGame( {exportState, pos}) {
  const [gameOver, setGameOver] = useState();
  function makeGameOver(player){
    if (player === '1'){
      setGameOver("https://y.yarn.co/69daa53a-7641-45ae-aea7-203c6b4a0e90_text.gif");
      exportState(pos, 'X');
    } else {
      setGameOver("https://media.tenor.com/lGhAoEiUlTcAAAAM/player2wins.gif");
      exportState(pos, 'O');
    }

  }
  return (
    <div className="App">
      <h1 className="">
        Tictac
      </h1>

      <img src={gameOver} alt="suggon"/>
      <Table makeGameOver = {makeGameOver} />
    </div>
  );
}
