import {
  DISABLE_FORM,
  ERRORS_BACKEND
} from "./actions";

const initialState = {
  questionnaire: true,
  errorsBackend: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_FORM:
      return {
        ...state,
        questionnaire: !state.questionnaire
      };

    case ERRORS_BACKEND:
      return {
        ...state,
        errorsBackend: action.errorsBackend
      };


    default:
      return state;
  }
};
