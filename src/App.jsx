import './App.css'
import Header from './components/Header';
import MainContent from './components/MainContent';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <MainContent />
    </>
  )
}

export default App
