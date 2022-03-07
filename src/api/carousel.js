import request from "@/utils/request";

export function getIndexList() {
  return request({
    url:"/portal/carousel-img/list",
    method:"get",
  });
}


export function getCateList() {
  return request({
    url:"/portal/carousel-img/list-category",
    method:"get",
  });
}

export function getNewsList() {
  return request({
    url:"/portal/carousel-img/list-news",
    method:"get",
  });
}