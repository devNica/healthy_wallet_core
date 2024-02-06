import { type RolEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface UserAccountInputModel extends Optional<UserAccountEntity, 'id' | 'email' | 'password' | 'profileId' | 'isRoot'> { }

export default class UserAccountModel extends Model<UserAccountEntity, UserAccountInputModel> implements UserAccountEntity {
  declare id: UUID
  declare email: string
  declare password: string
  declare isRoot: boolean
  declare state: boolean
  declare createdAt: Date
  declare updatedAt: Date
  profileId: string
  roles?: Pick<RolEntity, 'id' | 'rol'> | undefined
}

UserAccountModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'profile_info',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  isRoot: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'user_account'
})
