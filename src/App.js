import './App.css';
import SubGame from './SubGame.js'
import { useState } from 'react';

function Square( {row, column, getTic, setTable, table} ) {
  return (
    <>
      <SubGame exportState={ setTable } pos={[row, column]} table={table} getTic={getTic}/>
    </>
  )
}

function Row( {row, getTic, setTable, table} ) {
  return (
    <div className="row">
      <Square row={row} column={0} getTic={getTic} setTable={setTable} table={table}/>
      <Square row={row} column={1} getTic={getTic} setTable={setTable} table={table}/>
      <Square row={row} column={2} getTic={getTic} setTable={setTable} table={table}/>
    </div>
  )
}
function Table( {makeGameOverLarge, setTable, table, getTic} ) {
  return (
    <div className="table">
      <Row row={0} getTic={getTic} setTable={setTable} table={table}/>
      <Row row={1} getTic={getTic} setTable={setTable} table={table}/>
      <Row row={2} getTic={getTic} setTable={setTable} table={table}/>
    </div>
  )
}

function App() {
  const [gameOver, setGameOver] = useState();
  const [table, setTable] = useState([[null, null, null],[null, null, null],[null, null, null]]);


  function getTic(){
    for (let x = 0; x < 3; x++){
      if (table[x][0] === table[x][1] && table[x][1] === table[x][2] && (table[x][2] === 'X' || table[x][2] === 'O')){
        if(table[x][2] === 'X'){
          console.log("player 1 won");
          makeGameOverLarge('1');
        } else{
          console.log("player 2 won");
          makeGameOverLarge('2');
        }
      } 
      if (table[0][x] === table[1][x] && table[1][x] === table[2][x] && (table[2][x] === 'X' || table[2][x] === 'O')){
        if(table[2][x] === 'X'){
          makeGameOverLarge('1');
        } else{
          makeGameOverLarge('2');
        }
      }
    }
    if (table[0][0] === table[1][1] && table[1][1] === table[2][2] && (table[2][2] === 'X' || table[2][2] === 'O')){
      if(table[2][2] === 'X'){
        makeGameOverLarge('1');
      } else{
        makeGameOverLarge('2');
      }
    } 
    if (table[0][2] === table[1][1] && table[1][1] === table[2][0] && (table[2][0] === 'X' || table[2][0] === 'O')){
      if(table[2][0] === 'X'){
        makeGameOverLarge('1');
      } else{
        makeGameOverLarge('2');
      }
    } 
  }
  function makeGameOverLarge(player){
    if (player === '1'){
      setGameOver("br");
      setGameOver("https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fview%2Fplayer1-player-one-%25D8%25A8%25D9%2584%25D8%25A7%25D9%258A%25D8%25B1%25D9%25A1-%25D8%25A8%25D9%2584%25D8%25A7%25D9%258A%25D8%25B11-gif-20660986&psig=AOvVaw2U2IHnPxaDxp1uOA_TuV9Q&ust=1745728055575000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOjiivbt9IwDFQAAAAAdAAAAABAE");
      
    } if (player == '2') {
      setGameOver("https://media.tenor.com/lGhAoEiUlTcAAAAM/player2wins.gif");
    }

  }
  return (
    <div className="App">
      <h1 className="">
        Tictac
      </h1>

      <img src={gameOver} alt="f"/>
      <Table makeGameOverLarge = {makeGameOverLarge} setTable={ setTable } table={table} getTic={getTic}/>
    </div>
  );
}

export default App;
