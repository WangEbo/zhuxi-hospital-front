

import request from "@/utils/request";

export function getArticlesList(params) {
  return request({
    url:"/portal/content/list",
    method:"get",
    params
  });
}

export function getArticleById(id) {
  return request({
    url:`/portal/content/${id}`,
    method:"get",
  });
}