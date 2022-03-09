import request from "@/utils/request";

export function getIndexList() {
  return request({
    url:"/portal/carousel-img/list",
    method:"get",
  });
}
