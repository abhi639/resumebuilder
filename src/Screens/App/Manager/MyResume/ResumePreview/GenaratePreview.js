export default function preview(name, url, templateObj) {
  const preview = `<div className='generatedPreview mx-auto'>
        <header>
          <div className='d-flex flex-column w-100'>
            <div className=''  style="text-align: end">
              <span>LoGO</span>
            </div>
            <div className=''  style="text-align: center">
              <span>${name ? name : 'Name'}</span>
            </div>
          </div>
        </header><hr/>
        <p>
        ${
          templateObj?.profile_summary &&
          ` <div
                className='profileSummary'
                id='profileSummary'
                style=${{display: templateObj?.profile_summary ? 'block' : 'none'}}
              >
                <div className='summary' id='summary'>
                    <p>${templateObj?.profile_summary.toString()}</p>
                </div>
              </div>
            `
        }<br/>
        ${
          templateObj?.professional_experience &&
          `<div
                className='experience'
                id='experience'
                style=${{display: templateObj?.professional_experience ? 'block' : 'none'}}
              >
                <div className='professionalExperience' id='professionalExperience'>
                  <h4>Professional Experience</h4>
                  <p> ${templateObj?.professional_experience.toString()}</p>
                </div>
              </div>
            `
        }
              ${
                templateObj?.projects &&
                `<div
                    className='projects'
                    id='projects'
                    style=${{display: templateObj?.projects ? 'block' : 'none'}}
                  >
                    <div className='projectsList' id='projectsList'>
                      <h4>Projects</h4>
                      <p>${templateObj?.projects?.toString()}</p>
                    </div>
                  </div>`
              }
            ${
              templateObj?.certificates &&
              `<div
                  className='certificates'
                  id='certificates'
                  style=${{display: templateObj?.certificates ? 'block' : 'none'}}
                >
                  <div className='certificatesList' id='certificatesList'>
                    <h4>Certifications</h4>
                    <p>${templateObj?.certificates?.toString()}</p>
                  </div>
                </div>`
            }
            </p>
      </div>`

  return preview
}
