import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'

function App() {
  const [count, setCount] = React.useState(5)
  return (
    <div>
      <h2>Rectangle Creator</h2>
      <p>
        Count:{' '}
        <input
          type="number"
          onChange={(event) => setCount(parseInt(event.target.value, 10))}
        />
      </p>
      <button
        onClick={() =>
          parent.postMessage(
            { pluginMessage: { type: 'create-rectangles', count } },
            '*'
          )
        }
      >
        Creates
      </button>
      <button
        onClick={() =>
          parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
        }
      >
        Cancel
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
