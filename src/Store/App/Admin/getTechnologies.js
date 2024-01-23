import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions'

const slice = createSlice({
  name: 'get-Technology',
  initialState: {
    technologies: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (technologies) => {
      technologies.loading = true
      technologies.message = ''
    },
    success: (technologies, action) => {
      technologies.loading = false
      technologies.message = ''
      technologies.technologies = action.payload
    },
    failed: (technologies, action) => {
      technologies.loading = false
      technologies.message = action.payload.message
    },
    reset: (technologies, action) => {
      technologies.loading = false
      technologies.message = ''
    },
    editSucess: (technologies, action) => {
      technologies.loading = false
      technologies.message = ''
      technologies.technologies.push(action.payload)
    },
  },
})

const {requested, success, failed, reset, editSucess} = slice.actions
export default slice.reducer

export const getTechnologies = () =>
  apiCallBegan({
    url: `api/technologies/list`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })

export const addTechnologies = (id, data) =>
  apiCallBegan({
    url: `api/technologies/add/${id}`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: editSucess.type,
    onFailed: failed.type,
  })

export const editTechnologies = (id, data) =>
  apiCallBegan({
    url: `api/technologies/edit/${id}`,
    method: 'PUT',
    data,
    onStart: requested.type,
    onSuccess: editSucess.type,
    onFailed: failed.type,
  })

export const deleteTechnlogies = (id, data) =>
  apiCallBegan({
    url: `api/technologies/delete/${id}`,
    method: 'PUT',
    data,
    onStart: requested.type,
    onSuccess: editSucess.type,
    onFailed: failed.type,
  })
