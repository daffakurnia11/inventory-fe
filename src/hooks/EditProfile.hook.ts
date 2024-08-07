import { messageContent } from "@/stores/atom";
import { EditProfilePayload } from "@/types/profile";
import { getSession } from "@/utils/session";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export const useEditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const setMessage = useSetAtom(messageContent);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const onFinish = (values: EditProfilePayload) => {
    setLoading(true);
  };

  return { onFinish, loading, disabledDate };
}