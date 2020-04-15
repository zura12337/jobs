import React from 'react';
import './App.css';
import Job from './components/job';
import data from './components/data/data.json';

function App() {
  return (
    data.map(job => (
      <Job jobId={job.id}/>
    ))
  );
}

export default App;
