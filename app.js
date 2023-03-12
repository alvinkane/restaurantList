// 導入express及handlebars
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

// 設定參數
const port = 3000;

// 設定靜態網站
app.use(express.static("public"));
// 導入餐廳清單
const restaurantList = require("./restaurant.json");

// 設定樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 建立路由
// 根目錄
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

// 詳細資料
app.get("/restaurants/:restaurant_id", (req, res) => {
  // 找對應id的餐廳
  const restaurant = restaurantList.results.find((item) => {
    return item.id.toString() === req.params.restaurant_id;
  });
  console.log(restaurant);
  res.render("show", { restaurant: restaurant });
});

// 搜尋
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const restaurants = restaurantList.results.filter((index) => {
    return (
      index.name.toLowerCase().includes(keyword) ||
      index.name_en.toLowerCase().includes(keyword) ||
      index.category.toLowerCase().includes(keyword)
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

// 監聽
app.listen(port, (req, res) => {
  console.log(`This is listening on http://localhost:${port}`);
});