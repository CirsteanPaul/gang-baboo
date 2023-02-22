const initialState = {
    isMinting: false,
    mintingAmount: 1,
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET__IS_MINTING_ACTION":
        return {
          ...state,
          isMinting: action.payload.isMinting
        };
      case "SET__MINTING_AMOUNT_ACTION":
        return {
          ...state,
          mintingAmount: action.payload.mintingAmount
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;