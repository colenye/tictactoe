import './App.css';
import { useState, useEffect } from 'react';

function Square( {row, column, getTic, over, player, localTurn, gameOver} ) {
  const [tic, setTic] = useState();
  
  function handleClick() {
    if (tic != null || over || gameOver) return;
    getTic([row, column, localTurn]);
    if (localTurn === 'X') {
      setTic('X');
    } else {
      setTic('O');
    }
  }
  
  return (
    <button className="button" onClick={handleClick}>{tic}</button>
  );
}

function Row( {row, getTic, over, player, localTurn, gameOver} ) {
  return (
    <div className="row">
      <Square row={row} column={0} getTic={getTic} over={over} player={player} localTurn={localTurn} gameOver={gameOver}/>
      <Square row={row} column={1} getTic={getTic} over={over} player={player} localTurn={localTurn} gameOver={gameOver}/>
      <Square row={row} column={2} getTic={getTic} over={over} player={player} localTurn={localTurn} gameOver={gameOver}/>
    </div>
  );
}

function Table( {makeGameOver, player, table, setTable, localTurn, setLocalTurn, gameOver} ) {
  const [over, setOver] = useState(false);

  function getTic(tic){
    const newTable = table.map(row => [...row]);
    newTable[tic[0]][tic[1]] = tic[2];
    setTable(newTable);

    for (let x = 0; x < 3; x++){
      if (newTable[x][0] === newTable[x][1] && newTable[x][1] === newTable[x][2] && (newTable[x][2] === 'X' || newTable[x][2] === 'O')){
        makeGameOver(newTable[x][2] === 'X' ? '1' : '2');
        setOver(true);
        return;
      }
      if (newTable[0][x] === newTable[1][x] && newTable[1][x] === newTable[2][x] && (newTable[2][x] === 'X' || newTable[2][x] === 'O')){
        makeGameOver(newTable[2][x] === 'X' ? '1' : '2');
        setOver(true);
        return;
      }
    }

    if (newTable[0][0] === newTable[1][1] && newTable[1][1] === newTable[2][2] && (newTable[2][2] === 'X' || newTable[2][2] === 'O')){
      makeGameOver(newTable[2][2] === 'X' ? '1' : '2');
      setOver(true);
      return;
    }

    if (newTable[0][2] === newTable[1][1] && newTable[1][1] === newTable[2][0] && (newTable[2][0] === 'X' || newTable[2][0] === 'O')){
      makeGameOver(newTable[2][0] === 'X' ? '1' : '2');
      setOver(true);
      return;
    }

    // Switch turn after a successful move
    setLocalTurn(prev => (prev === 'X' ? 'O' : 'X'));
  }

  return (
    <div className="table">
      <Row row={0} getTic={getTic} over={over} player={player} localTurn={localTurn} gameOver={gameOver}/>
      <Row row={1} getTic={getTic} over={over} player={player} localTurn={localTurn} gameOver={gameOver}/>
      <Row row={2} getTic={getTic} over={over} player={player} localTurn={localTurn} gameOver={gameOver}/>
    </div>
  );
}

export default function SubGame({ exportState, pos, table, getTic, gameOver}) {
  const [player, makeGameOver] = useState();
  const [localTable, setLocalTable] = useState([[null, null, null],[null, null, null],[null, null, null]]);
  const [localTurn, setLocalTurn] = useState('X');

  useEffect(() => {
    if (player === '1') {
      const newTable = table.map(row => [...row]);
      newTable[pos[0]][pos[1]] = 'X';
      exportState(newTable);   // <-- Update the parent table first
                 // THEN check if someone won
    } else if (player === '2') {
      const newTable = table.map(row => [...row]);
      newTable[pos[0]][pos[1]] = 'O';
      exportState(newTable);
      
    }
  }, [player]);

  useEffect(() => {
    getTic();
  }, [table]);

  return (
    <div className="App">
      <h1>SubGame</h1>
      <Table makeGameOver={makeGameOver} player={player} table={localTable} setTable={setLocalTable} localTurn={localTurn} setLocalTurn={setLocalTurn} gameOver={gameOver}/>
    </div>
  );
}
