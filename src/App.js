import logo from './logo.svg';
import './App.css';

function Square() {
  return (
    <button></button>
  )
}

function Row() {
  return (
    <div className="row">
      <Square/>
      <Square/>
      <Square/>
    </div>
  )
}
function Table() {
  return (
    <div className="table">
      <Row/>
      <Row/>
      <Row/>
    </div>
  )
}

function App() {
  return (
    <>
      <h1>
        Tictac
      </h1>
      <Table/>
    </>
  );
}

export default App;
