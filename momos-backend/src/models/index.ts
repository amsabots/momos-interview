import sequelize from "sequelize";
import { scraper_data } from "./data";
import { user_model } from "./users";

const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT, DB_NAME } = process.env;

const db_connection = new sequelize.Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
  dialect: "postgres",
  logging: false,
  host: DB_HOST,
  port: Number(DB_PORT),
});

const models = {
  scraper_data: scraper_data(db_connection),
  user: user_model(db_connection),
};
// table relationships - between scraper data & user
models.scraper_data.belongsTo(models.user);
models.user.hasMany(models.scraper_data);
// ==============================================
const db = { ...models, db_connection };
export { db };
