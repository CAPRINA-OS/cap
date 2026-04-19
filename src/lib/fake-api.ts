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

export const useGetOrder = () => {
  return {
    data: null,
    isLoading: false,
  };
};

export const useGetOrdersSummary = () => {
  return {
    data: {
      total: 0,
      revenue: 0,
      profit: 0,
    },
    isLoading: false,
  };
};

export const useGetRecentOrders = () => {
  return {
    data: [],
    isLoading: false,
  };
};

// ✅ query keys كاملة
export const getListOrdersQueryKey = () => ["orders"];
export const getGetOrdersSummaryQueryKey = () => ["summary"];
export const getGetRecentOrdersQueryKey = () => ["recent"];
export const getGetOrderQueryKey = () => ["order"];

// auth
export const setAuthTokenGetter = () => {};
