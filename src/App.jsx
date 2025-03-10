import { useState } from "react"

import Header from "./components/Header/Header"
import Intro from "./components/Intro/Intro"
import Form from "./components/Form/Form"
import Ticket from "./components/Ticket/Ticket"
import TopPatternSquig from '../src/assets/Images/pattern-squiggly-line-top.svg'
import BottomPatternMobile from '../src/assets/Images/pattern-squiggly-line-bottom-mobile-tablet.svg'
import PatternLines from '../src/assets/Images/pattern-lines.svg'
import PatternCircle from '../src/assets/Images/pattern-circle.svg'


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ticketData,setTicketData] = useState(null)
  
  const handleFormSubmit = (formData) => {
    setTicketData(formData)
    setIsSubmitted(true)
    console.log(formData)
  }
  return (
    <>
      <div className="wrapper">
      <div id="pattern-lines"><img src={PatternLines} alt="" /></div>
      <div id="pattern-squig"><img src={TopPatternSquig} alt="" /></div>
      <div id="pattern-circle"><img src={PatternCircle} alt="" /></div>
      <Header />
      {!isSubmitted && <Intro />}
      {!isSubmitted && <Form  onFormSubmit={handleFormSubmit}/>}
      {isSubmitted && <Ticket ticketData={ticketData} />}
      <div id="bottom-pattern-mobile"><img src={BottomPatternMobile} alt="" /></div>
      </div>
      
    </>
  )
}

export default App
