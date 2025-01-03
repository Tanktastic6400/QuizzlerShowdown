import { useState } from 'react'
import './App.css'
import QuizDisplay from './components/QuizDisplay'
import QuizSelector from './components/QuizSelector'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <QuizSelector/>
        <QuizDisplay/>
    </>
  )
}

export default App
