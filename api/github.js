const Router = require("koa-router");
const githubRouter = new Router();
const axios = require("axios");
const { get, set, del } = require("../utils/cacheData");

// 接口信息
const routerInfo = {
  name: "github",
  title: "github",
  subtitle: "热榜",
};

// 缓存键名
const cacheKey = "github";

// 调用时间
let updateTime = new Date().toISOString();

// 调用路径
const url =
  "https://e.juejin.cn/resources/github";

// 数据处理
const getData = (data) => {
  if (!data) return [];
  return data.map((v) => {
    return {
      id: v.id,
      title: v.reponame,
      desc: v.description,
      url: `${v.url}`,
      mobileUrl: `${v.url}`,
    };
  });
};

// github热榜
githubRouter.get("/github", async (ctx) => {
  console.log("获取github热榜");
  try {
    // 从缓存中获取数据
    let data = await get(cacheKey);
    const from = data ? "cache" : "server";
    if (!data) {
      // 如果缓存中不存在数据
      console.log("从服务端重新获取 github 热榜");
      // 从服务器拉取数据
      const response = await axios.post(url, { "category": "trending", "period": "week", "lang": "all", "offset": 0, "limit": 30 });
      data = getData(response.data.data);
      updateTime = new Date().toISOString();
      // 将数据写入缓存
      await set(cacheKey, data);
    }
    ctx.body = {
      code: 200,
      message: "获取成功",
      ...routerInfo,
      from,
      total: data.length,
      updateTime,
      data,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      code: 500,
      ...routerInfo,
      message: "获取失败",
    };
  }
});

// github热榜 - 获取最新数据
githubRouter.get("/github/new", async (ctx) => {
  console.log("获取github热榜 - 最新数据");
  try {
    // 从服务器拉取最新数据
    const response = await axios.post(url, { "category": "trending", "period": "week", "lang": "all", "offset": 0, "limit": 30 });
    const newData = getData(response.data.data);
    updateTime = new Date().toISOString();
    console.log("从服务端重新获取github热榜");

    // 返回最新数据
    ctx.body = {
      code: 200,
      message: "获取成功",
      ...routerInfo,
      total: newData.length,
      updateTime,
      data: newData,
    };

    // 删除旧数据
    await del(cacheKey);
    // 将最新数据写入缓存
    await set(cacheKey, newData);
  } catch (error) {
    // 如果拉取最新数据失败，尝试从缓存中获取数据
    console.error(error);
    const cachedData = await get(cacheKey);
    if (cachedData) {
      ctx.body = {
        code: 200,
        message: "获取成功",
        ...routerInfo,
        total: cachedData.length,
        updateTime,
        data: cachedData,
      };
    } else {
      // 如果缓存中也没有数据，则返回错误信息
      ctx.body = {
        code: 500,
        ...routerInfo,
        message: "获取失败",
      };
    }
  }
});

githubRouter.info = routerInfo;
module.exports = githubRouter;
