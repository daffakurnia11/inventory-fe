import { LoginService } from "@/services/apis/auth";
import { loginData, messageContent } from "@/stores/atom";
import { LoginPayload } from "@/types/auth";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const setMessage = useSetAtom(messageContent);
  const setUserData = useSetAtom(loginData);
  
  const onFinish = (values: LoginPayload) => {
    setLoading(true);
    LoginService(values).then((response: any) => {
      if (response.status === 200) {
        router.push("/");
        setMessage({
          type: "success",
          message: "Welcome back!",
        });
        setUserData({
          token: response.data.data.token,
          userData: response.data.data.user,
          login: true,
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