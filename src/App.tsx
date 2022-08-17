import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { SnakeGame } from "./pages/SnakeGame"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { TicTacToe } from "./pages/TicTacToe"
import { VideoChat } from "./pages/VideoChat"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import Paypal from "./pages/Paypal"
import Chart from "./pages/Chart"

function App() {

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/payment" element={<Paypal />} />
          <Route path="/snakegame" element={<SnakeGame />} />
          <Route path="/ticTactoe" element={<TicTacToe />} />
          <Route path="/videoChat" element={<VideoChat />} />
          <Route path="/chart" element={<Chart/>} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
