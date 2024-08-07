import * as React from "react";
import { adminService } from "@/services/apis/admin";
import { AdminUrl } from "@/services/urls/admin";
import { messageContent } from "@/stores/atom";
import { ChangePasswordPayload, EditProfilePayload } from "@/types/profile";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useEditProfile = () => {
  const setMessage = useSetAtom(messageContent);

  const { data: profileData, isLoading }: any = useSWR(AdminUrl, () =>
    adminService.getProfile()
  );

  const { trigger: updateProfile, isMutating: loading } = useSWRMutation(
    AdminUrl,
    (_, { arg }: { arg: EditProfilePayload }) => {
      return adminService.updateProfile(arg);
    }
  );

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return {
    isLoading,
    profileData,
    updateProfile,
    loading,
    disabledDate,
    setMessage,
  };
};

export const useChangePassword = () => {
  const setMessage = useSetAtom(messageContent);
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values: ChangePasswordPayload) => {
    setLoading(true);
    adminService.changePassword(values).then((response: any) => {
      if (response.status === 200) {
        setMessage({
          type: "success",
          message: response.data.message,
        });
      } else {
        setMessage({
          type: "error",
          message: response.data.message,
        });
      }
      setLoading(false);
    })
  }

  return { onFinish, loading }
}
