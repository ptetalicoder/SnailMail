import './App.css'
import { Inbox } from './components/Inbox'
import 'bootstrap/dist/css/bootstrap.css'

//Welcome to App.tsx! This is the main component of our React App
//Any other components we create will rendered here before they are visible
function App() {
  

  {/* the return() of a component is just the view. what the component looks like */}
  return (
    <div>
      {/* Simple Top Navbar */}
      <nav className="border-bottom mb-5">
        <h2 className="font-monospace">🐌 SnailMail 🐌</h2>
      </nav>

      {/* Render the InboxComponent */}
      <Inbox/>

    </div>
  )
}

export default App
