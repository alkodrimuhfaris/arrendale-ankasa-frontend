const initialState = {
  isSuccess: false,
  data: {},
  isError: false,
  message: ""
};
      
export default (state = initialState, action) => {
  switch (action.type) {
  case "GET_TRANSIT_PENDING":{
    return{
      ...state,
      isLoading: true
    };
  }
  case "GET_TRANSIT_REJECTED":{
    return{
      ...state,
      isLoading: false,
      isError: true,
      message: "cannot read data"
    };
  }
  case "GET_TRANSIT_FULFILLED":{
    console.log(action.payload);
    return{
      ...state,
      isError: false,
      isSuccess: true,
      data: action.payload.data.data,
      isLoading:false,
      message: "add flight success"
    };
  }
  default:{
    return state;
  }
  }
};