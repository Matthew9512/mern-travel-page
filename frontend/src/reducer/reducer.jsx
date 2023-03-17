export const initialValue = {
  // city: '',
  // price: '',
  // date: '',
  data: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    // case 'saveCity':
    //   return { ...state, city: action.payload };
    // case 'savePrice':
    //   return { ...state, price: action.payload };
    // case 'saveCity':
    //   return { ...state, [action.field]: action.payload };
    case 'fetchResults':
      return { ...state, data: action.payload };
    case 'fetchSuccess':
      return { ...state, data: action.payload };
  }
};

export const _reducerActions = {
  // inputValues: 'inputValues',
  // saveCity: 'saveCity',
  // savePrice: 'savePrice',

  fetchResults: 'fetchResults',
  fetchSuccess: 'fetchSuccess',
};
