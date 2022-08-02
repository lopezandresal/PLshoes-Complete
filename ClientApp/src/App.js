import './App.css';
import Producto from './components/Producto';
import BarraNavegacion from './components/BarraDeNavegacion';

const App = () => {
    return (
        <div className="grid-contenedor">
            <header className="header">
                <h1>LOGO</h1>
            </header>
            <aside className="aside">
                <BarraNavegacion />
            </aside>
            <main className="main">
                <Producto />
            </main>
        </div>
    )
}
export default App;