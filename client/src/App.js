import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import EventCard from './components/EventCard';

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Here we will map your events array from your server */}
           <EventCard />
        </div>
      </main>
    </div>
  );
}

export default App;

