const initialState = {
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    provider: null,
    errorMsg: "",
  };
  
  const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CONNECTION_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "INITIATE_WEB3":
        return {
          ... state,
          web3: action.payload.web3
        }
      case "CONNECTION_SUCCESS":
        return {
          ...state,
          loading: false,
          account: action.payload.account,
          smartContract: action.payload.smartContract,
          provider: action.payload.provider,
        };
      case "CONNECTION_FAILED":
        return {
          ...initialState,
          loading: false,
          errorMsg: action.payload,
        };
      case "UPDATE_ACCOUNT":
        return {
          ...state,
          account: action.payload.account,
        };
      default:
        return state;
    }
  };
  
  export default blockchainReducer;