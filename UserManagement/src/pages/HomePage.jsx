import NavBarComponent from './../components/NavBarComponent';
import React, { useEffect, useState } from "react";
const HomePage = () => {

  return (
    <div>
      <NavBarComponent />
      <h2 className='text-center m-5'>S G Software Testing Institute</h2>
      <div className='ps-5 pe-5 pb-5'>
        <p className='mt-5'> <strong>S G Software Testing Institute</strong> is one of Bangalore’s most trusted and results-driven Software Training Institutes, known for delivering <strong>100% Guaranteed Job Placement support, industry-oriented training,</strong> and <strong>cost-effective programs</strong> that truly transform careers.</p>
        <p>We offer expert-crafted courses in <strong>Software Testing (Manual, Web & API Automation), SQL, AI & Agentic, Mobile Automation,</strong> and <strong>Java, Python, JavaScript & TypeScript</strong>, designed to give students not just theoretical knowledge, but <strong>real-time, hands-on experience</strong> that companies value.</p>
        <p>Over the years, we’ve empowered <strong>Freshers, Software Engineers, Working Professionals, corporate teams, and aspiring individuals</strong> to upskill with confidence and step into the software industry with solid expertise. <br />Our secret?</p>
        <ul typeof='circle'>
          <li><strong>Small batch sizes for personal attention</strong></li>
          <li><strong>Flexible class schedules</strong></li>
          <li><strong>One-to-one mentoring</strong></li>
          <li><strong>Practical training based on real project scenarios</strong></li>
          <li><strong>Dedicated job assistance until you get placed</strong></li>
        </ul>
        <p>At S G Software Testing Institute, training is delivered by <strong>highly experienced professionals from top MNCs,</strong> bringing real-world insights directly into the classroom. Their practical exposure ensures that every student receives the <strong>best-in-class training methodology,</strong> modern tools, and real project case studies.</p>
        <p>Our mission is to build your confidence and shape you into a <strong>competent, industry-ready professional</strong> capable of thriving in today’s competitive software world.</p>
        <p>If you're looking to begin your career, upgrade your skills, or switch to a high-growth tech role—<strong>S G Software Testing Institute is the place where your journey begins.</strong></p>
      </div>
    </div>
  )
}

export default HomePage