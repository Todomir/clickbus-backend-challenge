import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('places', (table) => {
    table.increments('id').primary();

    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('bio').notNullable();
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex) {
  knex.schema.dropTable('places');
}
