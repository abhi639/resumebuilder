import React from 'react'

export default function GenaratedPreview() {
  return (
    <>
      <div class='generatedPreview mx-auto'>
        <header>
          <div class='d-flex flex-column w-100'>
            <div class='' style='text-align: end'>
              <span>LoGO</span>
            </div>
            <div class='' style='text-align: center'>
              <span>Name</span>
            </div>
          </div>
        </header>
        <section class='profileSummary' id='profileSummary'>
          <div class='summary' id='summary'>
            <h4>Summary</h4>
            <div class='content' id='content1'></div>
          </div>
          <div class='professionalSummary' id='professionalSummary'>
            <h4>Professional Summary</h4>
            <div class='content' id='content2'></div>
          </div>
          <div class='technologyExpertise' id='technologyExpertise'>
            <h4>Technology Expertise</h4>
            <div class='content' id='content3'></div>
          </div>
        </section>
        <section class='experience' id='experience'>
          <div class='professionalExperience' id='professionalExperience'>
            <h4>Professional Experience</h4>
            <div class='content' id='content4'></div>
          </div>
        </section>
        <section class='projects' id='projects'>
          <div class='projectsList' id='projectsList'>
            <h4>Projects</h4>
            <div class='content' id='content5'></div>
          </div>
        </section>
        <section class='certificates' id='certificates'>
          <div class='certificatesList' id='certificatesList'>
            <h4>Certifications</h4>
            <div class='content' id='content5'></div>
          </div>
        </section>
      </div>
    </>
  )
}
