const initialState = {
    name: '', 
    price: '',
    description: '',
    category: '',
    url: '',
    file: false,
    state: false,
};

function reducer(state, action) {
    

    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.value, };
        case 'UPDATE_PRICE':
            return { ...state, price: Number(action.value).toFixed(2)};
        case 'UPDATE_DESCRIPTION':
            return { ...state, description: action.value, };
        case 'UPDATE_CATEGORY':
            return { ...state, category: action.value, };
        case 'UPDATE_URL':
            return { ...state, url: action.value, };
        case 'UPDATE_FILE':
            return { ...state, file: action.value, };
        case 'UPDATE_STATE':
            return { ...state, state: action.value, };
      default:
        throw new Error();
    }
}

export{
    reducer,
    initialState,
}