"use client";

import * as React from "react";
import { message } from "antd";
import { useAtomValue } from "jotai";
import { messageContent } from "@/stores/atom";

export default function Message() {
  const [messageApi, contextHolder] = message.useMessage();
  const notifMessage = useAtomValue(messageContent);

  React.useEffect(() => {
    if (notifMessage.message) {
      messageApi.open({
        type: notifMessage.type,
        content: notifMessage.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifMessage]);

  return <>{contextHolder}</>;
}
