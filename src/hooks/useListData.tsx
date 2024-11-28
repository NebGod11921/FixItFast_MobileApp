import React, { useCallback, useRef, useState } from "react";
import { RefreshControl, View } from "react-native";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Color } from "../themes/app.colors";
import { TypeAppointment } from "../models";
import { TypeAppointmentStatus } from "../constants/system.constant";

interface TypedUseListData<T> {
  listData: T[];
  nextPage: number;
  isLastPage: boolean;
  refreshing: boolean;
  isFirstLoading: boolean;
  isLoading: boolean;
  apiCode: number;
  appointmentStatus: TypeAppointmentStatus,
  setListData: (newListData: T[]) => void;
  _requestData: (showRefreshing?: boolean) => void;
  initData: T[];
  renderFooterComponent: () => void;
  onEndReach: () => void;
  refreshControl: any;
  noData: boolean;
  totalCount: number;
}

interface TypedStateListData<T> {
  listData: T[];
  nextPage: number;
  isLastPage: boolean;
  totalCount: number;
  isLoading: boolean;
  noData: boolean;
  apiCode: number;
  appointmentStatus: TypeAppointmentStatus;
}

export function useListData<T>(
  params: any,
  requestData: (params: any) => Promise<T[]>,
  initData: T[] = [],
  dep?: any,
): TypedUseListData<TypeAppointment> {
  const [stateListData, setStateListData] = useState<TypedStateListData<T>>({
    listData: initData,
    nextPage: 1,
    isLastPage: false,
    totalCount: 0,
    isLoading: true,
    noData: false,
    apiCode: 0,
    appointmentStatus: 'NEW'
  });
  const [isLoadMore, setIsLoadmore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFetching = useRef(false);

  useDeepCompareEffect(() => {
    _requestData(false);
  }, [params, dep]);

  const _requestData = (showRefreshing: boolean | true) => {
    setStateListData({
      ...stateListData,
      apiCode: 0
    })
    isFetching.current = true;
    if (stateListData.nextPage > 1 && showRefreshing) setRefreshing(true);
    requestData({ page: "1", ...params }).then((res: any) => {
      const newData = res?.data?.data?.content;
      if (res?.status === 200 && Array.isArray(newData)) {
        isFetching.current = false;

        let isLastPage = false;
        let nextPage = 1;
        if (newData.length < params.limit) {
          isLastPage = true;
        } else {
          nextPage = 2;
        }
        setRefreshing(false);
        setStateListData((oldState) => ({
          ...oldState,
          isLastPage,
          nextPage,
          listData: [...initData, ...newData],
          totalCount: res?.headers?.["x-total-count"] || 0,
          isLoading: false,
          noData: !newData.length,
          apiCode: res?.status,
          appointmentStatus: params.status
        }));
      } else {
        setStateListData((oldState) => ({
          ...oldState,
          isLoading: false,
          listData: initData,
          noData: true,
          apiCode: res?.status,
          appointmentStatus: params.status
        }));
      }
    });
  };

  async function onEndReach() {
    if (!stateListData.isLastPage && !isFetching.current) {
      isFetching.current = true;
      setIsLoadmore(true);

      await requestData({ page: stateListData.nextPage + "", ...params }).then(
        (res: any) => {
          setIsLoadmore(false);
          const newData = res.data;
          isFetching.current = false;
          if (!res.isError && Array.isArray(newData)) {
            let isLastPage = false;
            let { nextPage } = stateListData;

            if (newData.length < params.limit) {
              isLastPage = true;
            } else {
              nextPage = stateListData.nextPage + 1;
            }

            setStateListData((oldState) => ({
              ...oldState,
              isLastPage,
              nextPage,
              listData: [...stateListData.listData, ...newData],
            }));
          } else {
            setStateListData((oldState) => ({
              ...oldState,
            }));
          }
        },
      );
    }
  }

  const setListData = useCallback((newListData: T[]) => {
    setStateListData((oldState) => ({
      ...oldState,
      listData: newListData,
    }));
  }, []);

  const refreshControl = () => (
    <RefreshControl
      onRefresh={_requestData}
      refreshing={refreshing}
      tintColor={Color.grey2}
      colors={[Color.grey2]}
    />
  );

  const renderFooterComponent = React.useCallback(() => {
    if (!isLoadMore) return <View />;
    return;
  }, [isLoadMore]);

  return {
    listData: stateListData.listData,
    nextPage: stateListData.nextPage,
    isLastPage: stateListData.isLastPage,
    totalCount: stateListData.totalCount,
    noData: stateListData.noData,
    apiCode: stateListData.apiCode,
    appointmentStatus: stateListData.appointmentStatus,
    onEndReach,
    refreshControl,
    _requestData,
    renderFooterComponent,
    setListData,
    refreshing,
    isLoading: stateListData.isLoading,
    isFirstLoading: false,
  };
}
