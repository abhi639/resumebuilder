import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions'

const slice = createSlice({
  name: 'download-file',
  initialState: {
    loading: false,
    message: '',
  },
  reducers: {
    requested: (fileDownload) => {
      fileDownload.loading = true
      fileDownload.message = ''
    },
    success: (fileDownload, action) => {
      fileDownload.loading = false
      fileDownload.message = ''

      const blob = new Blob([action.payload], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', 'Bulk_Upload_Template.xlsx') // Set the file name
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    },
    failed: (fileDownload, action) => {
      fileDownload.loading = false
      fileDownload.message = action.payload.message
    },
    reset: (fileDownload, action) => {
      fileDownload.loading = false
      fileDownload.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions

export default slice.reducer

export const downloadFile = () => {
  console.log("Download template");
  return apiCallBegan({
    url: 'masterdata/downloadtemplate',
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
