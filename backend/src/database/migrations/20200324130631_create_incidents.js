
exports.up = function(knex) {
  return knex.schema.createTable('tb_Incidents', table => {
      table.increments()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.decimal('value').notNullable()
      table.string('ong_id').notNullable()

      table.foreign('ong_id').references('id').inTable('tb_ONGs')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_Incidents')
};
