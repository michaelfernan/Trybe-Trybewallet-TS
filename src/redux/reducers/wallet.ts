const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: { type: any; }) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default walletReducer;
