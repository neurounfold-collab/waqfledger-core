import { useState } from 'react';
import Dashboard from './Dashboard';
import LegalModal, { type LegalContentType } from './components/LegalModal';

function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<LegalContentType>('terms');

  const openLegalModal = (type: LegalContentType) => {
    setLegalType(type);
    setIsLegalOpen(true);
  };

  return (
    <>
      <Dashboard onOpenLegalModal={openLegalModal} />
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        contentType={legalType}
      />
    </>
  );
}

export default App;
