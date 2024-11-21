/** @format */

export const handleAxiosException = (exception) => {
  const handleResponseErrorCodes = (response) => {
    if (response.status === 401) {
      dispatch(setErrorMsg('not permitted'))
    } else if (response.status === 400) {
      dispatch(setErrorMsg(response.data.error))
    } else {
      throw exception
    }
  }
  if (exception.response) {
    handleResponseErrorCodes(exception.response)
  } else {
    throw exception
  }
}

export default { handleAxiosException }
