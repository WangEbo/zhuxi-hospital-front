import request from "@/utils/request";

export function getConfig() {
  return request({
    url:"/portal/universal-set",
    method:"get",
  });
}


export function getMenu() {
  return request({
    url:"/portal/home/route",
    method:"get",
  });
}