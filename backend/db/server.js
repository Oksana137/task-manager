import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URI, {
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
