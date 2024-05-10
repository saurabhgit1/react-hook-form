import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignupForm.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUpForm></SignUpForm>
    </>
  )
}

export default App
