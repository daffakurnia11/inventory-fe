import { RegisterPayload } from "@/types/auth";
import * as React from "react";

export const useRegister = () => {
  const [loading, setLoading] = React.useState(false);
  
  const onFinish = (values: RegisterPayload) => {
    setLoading(true);
    console.log("Success:", values);
    setLoading(false);
  };

  return { onFinish, loading };
};
