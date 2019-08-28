exports.up = function(knex) {

    return (
        knex.schema.createTable('users', table => {
            table.increments();
            table.string('username', 128)
            .notNullable();
            table.string('password', 128)
            .notNullable();
            table.string('department', 128)
        })
    );
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
}