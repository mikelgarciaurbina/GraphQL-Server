module.exports = {
  up(migration, DataTypes) {
    return migration.createTable('users', {
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }).then(() => (
      Promise.all([
        migration.addIndex('users', ['email', 'password']),
        migration.addIndex('users', ['email']),
        migration.addIndex('users', ['id']),
      ])
    ));
  },
  down(migration) {
    return migration.dropTable('users');
  },
};
