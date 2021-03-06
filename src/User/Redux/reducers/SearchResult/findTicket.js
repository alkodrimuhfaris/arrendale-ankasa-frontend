const initialState = {
  data: [],
  filterData: {},
  info: [],
  isLoading: false,
  isError: false,
  alertMsg: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
  case "FIND_TICKET_PENDING": {
    return {
      ...state,
      isLoading: true,
    };
  }
  case "FIND_TICKET_REJECTED": {
    return {
      ...state,
      isLoading: false,
      isError: true,
      alertMsg: action.payload.response.data.message,
    };
  }
  case "FIND_TICKET_FULFILLED": {
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload.data.results,
      info: action.payload.data.pageInfo,
    };
  }
  case "FILTER_TICKET" : {
    return {
      ...state,
      filterData: action.payload
    };
  }
  default: {
    return state;
  }
  }
};
