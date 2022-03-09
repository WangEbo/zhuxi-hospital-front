import request from "@/utils/request";

export function getConfig() {
  return request({
    url:"/portal/universal-set",
    method:"get",
  });
}


export async function getMenu(id) {
  return request({
    url: `/portal/category/list-with-child/${id || '0'}`,
    method:"get",
    headers: {
      'content-type' : 'application/x-www-form-urlencoded'
    }
  });
}