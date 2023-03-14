// 2023-03-09 11:00:00

/**
 * 导航
 * @param to 网址
 * @param options 参数列表
 */
export function navigate(
  to: string | 0,
  options?: { replace?: boolean; top?: boolean }
) {
  if (typeof to === "string") {
    if (to.indexOf("http") === -1)
      to = new URL(window.location.href).origin + to;
    let replace = options && options.replace;
    let top = options && options.top;
    if (replace) window[top ? "top" : "globalThis"].location.replace(to);
    else window[top ? "top" : "globalThis"].location.href = to;
  }

  if (to === 0) window.location.reload();
}

/**
 * 组装给定网址参数
 * @param url 网站
 * @param querys 参数对象
 * @returns URL
 */
export function setURLQuery(url: string, querys: {}) {
  let searchParams = new URLSearchParams();

  let keys = Object.keys(querys);
  for (let i = 0; i < keys.length; i++)
    if (querys[keys[i]]) searchParams.set(keys[i], querys[keys[i]]);

  let connector = url.indexOf("?") === -1 ? "?" : "&";
  url += connector + searchParams.toString();

  return url;
}

/**
 * Get 请求
 * @param requestURL api 网址
 * @returns response
 */
export async function getFetch(requestURL: string) {
  const response = await fetch(requestURL);
  return await response.json();
}

/**
 * POST 请求
 * @param requestURL api 网址
 * @param bodyObject 请求体
 * @returns response
 */
export async function postFetch(requestURL: string, bodyObject: Object) {
  const response = await fetch(requestURL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(bodyObject), // body data type must match "Content-Type" header
  });
  return await response.json();
}
