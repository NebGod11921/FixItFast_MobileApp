import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import eventEmitter from "./eventEmitter";

const router = useRouter();


export enum EnumModalContentType {
  Confirm = "confirm",
  ConfirmBottom = "confirm-bottom",
  Loading = "loading",
  Library = "libray",
  Report = "report",
  PostAction = "post-action",
  CommentAction = "comment-action",
  FilterListCourse = "filter-list-course",
  FilterTypeCourse = "filter-type-course",
  SelectBox = "select-box",
  MoreTeacher = "more-teacher",
  ChatRoom = "chat-room",
  ListUser = "list-user",
  AddLesson = "add-lesson",
  TextInput = "text-input",
  ListMoreAction = "list-more-action",
  GamificationView = "gimification-view",
  LottieAnimation = "lottie-animation",
  CustomView = "custom-view",
  ListCourse = "list-course",
  FilterAffiliate = "filter-affiliate",
  SearchBank = "search-bank",
  SelectSort = "select-sort",
  Referral = "Referral",
  InviteCode = "invite-code",
  TeacherClass = "teacher-class",
  MoreCourse = "more-course",
  AddCouponToCourse = "add-coupon-to-course",
  SelectMissions = "select-missions",
  RefferralTask = "RefferralTask",
  FilterSortClub = "filter-sort-club",
  ReviewAudio = "ReviewAudio",
  ClubAttended = "ClubAttended",
  MoreEventDetail = "more-event-detail",
  MemberAction = "MemberAction",
  SelectCourse = "SelectCourse",
  AddToGroup = "add-to-group",
  PlayPodcast = "play-podcast",
  Schedule = "schedule",
  ViewMore = "view-more",
  SubscriptionView = "subscription-view",
}

export enum EnumStyleModalType {
  Bottom = "bottom",
  Middle = "middle",
  Full = "full",
}

export interface IShowModalParams {
  contentModalType: EnumModalContentType;
  styleModalType: EnumStyleModalType;
  data?: any;
}

interface ToastProps {
  type?: "success" | "error" | "info" | "warning";
  message?: string;
  title?: string;
}

export const showLoading = () => {
  showSuperModal({
    contentModalType: EnumModalContentType.Loading,
    styleModalType: EnumStyleModalType.Middle,
  });
};

export const showSuperModal = (params: IShowModalParams) => {
  // const ee = new EventEmitter();
  // ee.emit("show_super_modal", params);
  eventEmitter.emit("show_super_modal", params);
};

export const showWarningLogin = (message?: string) => {
  showSuperModal({
    contentModalType: EnumModalContentType.Confirm,
    styleModalType: EnumStyleModalType.Middle,
    data: {
      title: message || "Bạn cần đăng nhập để sử dụng chức năng này",
      cb: () => router.navigate("/(routes)/loginRoute"),
    },
  });
};

interface IModalByTypeData {
  type: string;
  data: any;
  isDetail?: boolean;
}

export const showSuperModalByType = ({
  type,
  data,
  isDetail = false,
}: IModalByTypeData) => {
  // const ee = new EventEmitter();
  // ee.emit("show_bottom_modal", { type, data, isDetail });
  eventEmitter.emit("show_bottom_modal", { type, data, isDetail });
};

export const showToast = (res: ToastProps) => {
  Toast.show({
    type: res.type || "success",
    text1: res.message || "Có lỗi không xác định xảy ra",
    text2: res.title,
  });
};

export const closeSuperModal = () => {
  // const ee = new EventEmitter();
  // ee.emit("close_super_modal");
  eventEmitter.emit("close_super_modal")
};
