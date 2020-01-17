const initialState = {
  isLoading: false,
  jsonData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.value };
    case 'SET_JSONDATA':
      const _jsonData = { ...state.jsonData };
      return {
        ...state,
        jsonData: { ..._jsonData, [action.value.key]: action.value.json },
      };
    default:
      return state;
  }
}
