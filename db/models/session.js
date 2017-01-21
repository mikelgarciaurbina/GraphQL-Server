import Sequelize from 'sequelize';

export default function(Conn) {
  const Session = Conn.define('session', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
  }, {
    underscored: true,
    indexes: [{
      fields: ['id'],
    }, {
      fields: ['user_id'],
    }],
  });

  Session.createAssociations = function(models) {
    this.belongsTo(models.user);
  };

  return Session;
}
