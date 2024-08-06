import { RegisterService } from "@/services/apis/auth";
import { messageContent } from "@/stores/atom";
import { RegisterPayload } from "@/types/auth";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const setMessage = useSetAtom(messageContent);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const onFinish = (values: RegisterPayload) => {
    setLoading(true);
    RegisterService(values).then((response: any) => {
      if (response.status === 200) {
        router.push("/login");
        setMessage({
          type: "success",
          message: response.data.message,
        });
      } else {
        setMessage({
          type: "error",
          message: response.data.error,
        });
      }
      setLoading(false);
    });
  };

  return { onFinish, loading, disabledDate };
};
