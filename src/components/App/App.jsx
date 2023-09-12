import './App.css';
import { useEffect } from "react";
import { useTelegram } from "../../services/hooks/useTelegram";
import Header from "../Header/Header";
import { Route, Routes } from 'react-router-dom'
import ProductList from "../ProductList/ProductList";
import Form from "../Form/Form";

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;