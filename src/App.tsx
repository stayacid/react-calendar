import { useState } from 'react'
import Calendar from '@/components/Calendar/Calendar';


function App() {
  const [count, setCount] = useState(0)
  const date = new Date();

  return (
    <Calendar date={date}></Calendar>
  )
}

export default App
