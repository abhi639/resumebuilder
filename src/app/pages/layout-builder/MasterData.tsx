import React, {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import Roles from '../masterdata/Roles'
import Technology from '../masterdata/Technology'

function BuilderPage() {
  const [selectedOption, setSelectedOption] = useState('Roles')

  return (
    <>
      <div>
        <button
          className={`e-btn e-flat e-primary ${selectedOption === 'Roles' ? 'e-active' : ''}`}
          onClick={() => setSelectedOption('Roles')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'black',
            borderBottom: `2px solid ${selectedOption === 'Roles' ? 'blue' : 'transparent'}`,
            outline: 'none',
            marginTop:'2%',
            marginLeft:'2%',
          }}
        >
          Roles
        </button>
        <button
          className={`e-btn e-flat e-primary ${selectedOption === 'Technology' ? 'e-active' : ''}`}
          onClick={() => setSelectedOption('Technology')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'black',
            borderBottom: `2px solid ${selectedOption === 'Technology' ? 'blue' : 'transparent'}`,
            outline: 'none',
            marginTop:'2%',
            marginLeft:'0%',
          }}
        >
          Technology
        </button>
      </div>
      {selectedOption === 'Roles' ? <Roles /> : <Technology />}
    </>
  )
}

const BuilderPageWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>Master Data</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
export function saga(): any {
  throw new Error('Function not implemented.')
}
