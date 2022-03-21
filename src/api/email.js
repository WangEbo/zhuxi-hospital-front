import request from "@/utils/request";

export function getConfig() {
  return request({
    url:"/portal/universal-set",
    method:"get",
  });
}
