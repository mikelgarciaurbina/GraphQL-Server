import Sequelize from 'sequelize';

export default function(Conn) {
  const User = Conn.define('user', {
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    indexes: [{
      fields: ['id'],
    }, {
      fields: ['email'],
    }, {
      fields: ['password'],
    }, {
      fields: ['email', 'password'],
    }],
  });

  User.createAssociations = function(models) {
    this.hasMany(models.session);
  };

  return User;
}
