import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import DatasetOverview from './components/DatasetOverview';
import PreprocessingPipeline from './components/PreprocessingPipeline';
import ModelArchitecture from './components/ModelArchitecture';
import TrainingProcess from './components/TrainingProcess';
import ResultsEvaluation from './components/ResultsEvaluation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg dark">
      <Navigation />

      <main>
        <Hero />
        <ProblemStatement />
        <DatasetOverview />
        <PreprocessingPipeline />
        <ModelArchitecture />
        <TrainingProcess />
        <ResultsEvaluation />
      </main>

      <Footer />
    </div>
  );
}

export default App;
