import { Model, DataTypes, Sequelize } from "sequelize";
import { AbstractDataEntity, SystemUser } from "../types/data";
import { logger } from "../configs/logger";
import bcrypt from "bcrypt";
const rounds = 5;

export const user_model = (sequelize: Sequelize) => {
  class UserEntity extends Model<
    SystemUser & Partial<AbstractDataEntity>,
    SystemUser
  > {}
  UserEntity.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      pass_reset: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      set_password: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { modelName: "system_users", sequelize }
  );
  UserEntity.beforeSave((user, o) => {
    if (user.getDataValue("set_password")) {
      logger.info(
        `---------- hashing the password to a secure text ------------`
      );
      user.setDataValue(
        "password",
        bcrypt.hashSync(user.getDataValue("password")!, rounds)
      );
    }
  });
  return UserEntity;
};
