import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Marketplace from '@/pages/Marketplace';
import PromptDetail from '@/pages/PromptDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/prompt/:id" element={<PromptDetail />} />
    </Routes>
  );
}

export default App;
