const initialState = {
    loading: false,
    cost:0,
    maxSupply: 0,
    totalSupply:0,
    maxPerWallet: 0,
    alreadyMinted: 0,
    error: false,
    errorMsg: "",
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST":
        return {
          ...state,
          loading: true,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_SUCCESS":
        return {
          ...state,
          loading: false,
          totalSupply:action.payload.totalSupply,
          cost: action.payload.cost,
          maxPerWallet: action.payload.maxPerWallet,
          alreadyMinted: action.payload.alreadyMinted,
          maxSupply: action.payload.maxSupply,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_FAILED":
        return {
          ...initialState,
          loading: false,
          error: true,
          errorMsg: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;