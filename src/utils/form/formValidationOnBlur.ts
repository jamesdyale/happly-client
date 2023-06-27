export const formValidationOnBlur = (field, value) => {
  if (field === 'name') {
    if (!value || value.length === 0) {
      return 'Please enter a name'
    } else {
      return ''
    }
  }

  if (field === 'fullName') {
    if (!value || value.length === 0) {
      return 'Please enter a full name'
    } else {
      return ''
    }
  }

  if (field === 'email') {
    if (!value || value.length === 0) {
      return 'Please enter a email'
    } else {
      return ''
    }
  }


  if (field === 'password') {
    if (!value || value.length === 0) {
      return 'Please enter a password'
    } else {
      return ''
    }
  }
}
