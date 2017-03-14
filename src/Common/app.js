import React from 'react';

const App = (props) => {
  const { header, main, footer } = props;
  return (
    <main className="main">
      {header}
      {main}
      {footer}
    </main>
  );
};

export default App;
