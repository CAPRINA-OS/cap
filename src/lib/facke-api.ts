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

export const useCreateOrder = () => {
  return {
    mutate: (_: any, { onSuccess }: any) => {
      const fakeOrder = { id: Math.floor(Math.random() * 1000) };
      onSuccess && onSuccess(fakeOrder);
    },
  };
};

export const getListOrdersQueryKey = () => ["orders"];
export const getGetOrdersSummaryQueryKey = () => ["summary"];
export const getGetRecentOrdersQueryKey = () => ["recent"];
export const setAuthTokenGetter = () => {};
export const useGetOrder = () => {
  return {
    data: null,
    isLoading: false,
  };
};
