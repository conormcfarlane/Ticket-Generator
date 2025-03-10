import React from 'react'
import './Ticket.css'
import ticket from '../../assets/Images/pattern-ticket.svg'
import logoMark from '../../assets/Images/logo-mark.svg'
import gitHubLogo from '../../assets/Images/icon-github.svg'

export default function Ticket(props) {

    const {ticketData} = props
    const { name, email, username, image } = ticketData;
  

    const generateTicketNumber = () => {
        const randomNumber = Math.floor(Math.random() * 10000) // 
        return `#${randomNumber.toString().padStart(5, '0')}` // Formats number with leading zeros and adds # 
      }
    const ticketNumber = generateTicketNumber()

    
  return (
    <div className='ticket-page-container'>
        <section className='confirmation-info'>
            <h1>Congrats, <span className='span-name'>{name}!</span> Your ticket is ready.</h1>
            <h4>We've emailed your ticket to <br></br><span className='span-email'>{email}</span> and will send updates in the run up to the event.</h4>
        </section>
       
        <section className='ticket'>
                <div className="top-title-container">
                    <img src={logoMark} alt="" />
                    <div className="top-title-container-info">
                        <h2>Coding Conf</h2>
                        <p>Jan 31, 2025 / Austin, TX</p>
                    </div>
                   
                </div>
                <div className="bottom-user-container">
                    <img src={image} alt="" id='userImage' />
                    <div className="user-info-container">
                        <h2>{name}</h2>
                        <div className="github-info">
                            <img src={gitHubLogo} alt="" />
                            <p>{username}</p>
                        </div>
                    </div>
                </div>
          
                <div className="right-ticket">
                    <p>{ticketNumber}</p>
                </div>
        </section>

    </div>
  )
}

