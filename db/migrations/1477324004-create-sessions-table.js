module.exports = {
  up(migration, DataTypes) {
    return migration.createTable('sessions', {
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    }).then(() => (
        Promise.all([
          migration.addIndex('sessions', ['id']),
          migration.addIndex('sessions', ['user_id']),
        ])
    ));
  },
  down(migration) {
    return migration.dropTable('sessions');
  },
};
