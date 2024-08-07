import { LoginService } from "@/services/apis/auth";
import { messageContent } from "@/stores/atom";
import { LoginPayload } from "@/types/auth";
import { createSession } from "@/utils/session";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const setMessage = useSetAtom(messageContent);
  
  const onFinish = (values: LoginPayload) => {
    setLoading(true);
    LoginService(values).then((response: any) => {
      if (response.status === 200) {
        router.push("/");
        setMessage({
          type: "success",
          message: "Welcome back!",
        });
        createSession({
          token: response.data.data.token,
          user: response.data.data.user,
        })
      } else {
        setMessage({
          type: "error",
          message: response.data.message,
        });
      }
      setLoading(false);
    });
  };

  return { onFinish, loading };
}