export const DISABLE_FORM = 'DISABLE_FORM';
export const ERRORS_BACKEND = 'ERRORS_BACKEND';
export const disableForm = () => ({
  type: DISABLE_FORM
});

export const errorsBackend = (errorsBackend) => ({
  type: ERRORS_BACKEND,
  errorsBackend
});

//Async actions//
export const submitQuestionsnnaire = (questionsnaire) => dispatch => {
  return fetch('/api/questionnaire', {
    body: JSON.stringify(questionsnaire),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
    if (!res.ok && res.status === 409) {
       return dispatch(errorsBackend('Email Already Exist'));
    } else if(!res.ok && res.status !== 409) {
       return Promise.reject(res.statusText);
    } else {
       return dispatch(disableForm());
    }
  }).catch((err) => {
    return dispatch(errorsBackend(err));
  });
}