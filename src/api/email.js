import request from "@/utils/request";

export function getMessageList() {
  return request({
    url:"/portal/dean-mailbox/list",
    method:"get",
  });
}
