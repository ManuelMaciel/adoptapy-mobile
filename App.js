import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
// Screen Stack
import ScreenStack from './ScreenStack';

const App = () => {

  return (
    <> 
    <StatusBar style='dark' />
    <ScreenStack />
    </>
  );

};

export default App