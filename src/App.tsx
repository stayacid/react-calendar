import { useState } from 'react'
import Calendar from '@/components/Calendar/Calendar';


function App() {
  const [count, setCount] = useState(0)
  const date = new Date('May 17, 2023 03:24:00');

  return (
    <Calendar date={date}></Calendar>
  )
}

export default App
