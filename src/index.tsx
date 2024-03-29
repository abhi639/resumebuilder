import React from 'react'
import ReactDOM from 'react-dom'
// Redux
// https://github.com/rt2zz/redux-persist
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import * as _redux from './setup'
import store, {persistor} from './setup/otherredux/Store'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'

// Apps
import {App} from './app/App'
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
import {registerLicense} from '@syncfusion/ej2-base'

registerLicense(
  'ORg4AjUWIQA/Gnt2VlhiQlVPd0BDW3xLflFyVWBTe1l6d1xWESFaRnZdQVxhSHlTdUFrXHZbc3xU'
)
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

// /* const mock = */ _redux.mockAxios(axios)
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store)

Chart.register(...registerables)

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate
        persistor={persistor}
        loading={<div className='spinner spinner-primary mr-15'></div>}
      >
        <App basename={PUBLIC_URL} />
      </PersistGate>
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById('root')
)
