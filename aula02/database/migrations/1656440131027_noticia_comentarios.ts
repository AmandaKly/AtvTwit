import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiaComentarios extends BaseSchema {
  protected tableName = 'noticia_comentarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('comentario')
      table.integer('noticia_id')
        .unsigned()
        .references('noticias.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
