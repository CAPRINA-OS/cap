export const useListOrders = () => {
  return {
    data: [],
    isLoading: false,
  };
};

export const useUpdateOrder = () => {
  return {
    mutate: () => {},
  };
};

export const getListOrdersQueryKey = () => ["orders"];

export const setAuthTokenGetter = () => {};
