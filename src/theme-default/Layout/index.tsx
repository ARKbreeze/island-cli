import { useState } from 'react';

export function Layout() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>this is Layout Component 333</h1>
      {count}
      <button onClick={() => setCount(count + 1)}> + 1</button>
    </div>
  );
}
