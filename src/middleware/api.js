import axios from 'axios';
import * as actions from './actions.js';
import {BASE_URL} from './url.js';


const api =
  ({dispatch, getState}) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);


    const {
      url,
      method,
      data,
      onStart,
      onSuccess,
      onFailed,

    } = action.payload;


    if (onStart) dispatch({type: onStart});

    next(action);

    try {
        // const {auth
        // } = getState();


        // const headers = {
        //     authorization: `Bearer ${auth.accessToken
        //     }`,
        //     'Content-Type': 'application/json',
        //   }

      const response = await axios.request({
        baseURL: BASE_URL,
        url,
        method,
        data,
        // headers
      });

    


  
      if (onSuccess) dispatch({type: onSuccess, payload: response.data});

    
    } catch (error) {

        console.log(error)

 
      if (onFailed)
        dispatch({
          type: onFailed,
          payload:
            error.response && error.response.data
              ? error.response.data
              : error.message,
        });
    }
  };

export default api;

