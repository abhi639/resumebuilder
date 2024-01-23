import React from 'react'

export default function textPreview() {
  return (
    <>
      <div className='generatedPreview mx-auto'>
        <header>
          <div className='d-flex flex-column w-100'>
            <div className='' style={{textAlign: 'end'}}>
              <span>LoGO</span>
            </div>
            <div className='' style={{textAlign: 'center'}}>
              <span>Name</span>
            </div>
          </div>
        </header>
        <section className='profileSummary' id='profileSummary'>
          <div className='summary' id='summary'>
            <h4>Summary</h4>
            <div className='content' id='content1' />
          </div>
          <div className='professionalSummary' id='professionalSummary'>
            <h4>Professional Summary</h4>
            <div className='content' id='content2' />
          </div>
          <div className='technologyExpertise' id='technologyExpertise'>
            <h4>Technology Expertise</h4>
            <div className='content' id='content3' />
          </div>
        </section>
        <section className='experience' id='experience'>
          <div className='professionalExperience' id='professionalExperience'>
            <h4>Professional Experience</h4>
            <div className='content' id='content4' />
          </div>
        </section>
        <section className='projects' id='projects'>
          <div className='projectsList' id='projectsList'>
            <h4>Projects</h4>
            <div className='content' id='content5' />
          </div>
        </section>
        <section className='certificates' id='certificates'>
          <div className='certificatesList' id='certificatesList'>
            <h4>Certifications</h4>
            <div className='content' id='content5' />
          </div>
        </section>
      </div>
    </>
  )
}
