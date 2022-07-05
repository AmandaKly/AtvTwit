/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'SitesController.index').as('index')
// Route.get('/noticia/cadastrar', 'SitesController.create')

Route.group(() => {
    Route.get('/', 'NoticiasController.index')
            .as('noticias.index')
    Route.get('/create', 'NoticiasController.create')
            .as('noticias.create')
    Route.post('/create', 'NoticiasController.store')
            .as('noticias.store')
    Route.get('/:id/edit', 'NoticiasController.edit')
            .where('id', /^[0-9]+$/)
            .as('noticias.edit')
    Route.post('/:id/edit', 'NoticiasController.update')
            .where('id', /^[0-9]+$/)
            .as('noticias.update')
    Route.get('/:id/delete', 'NoticiasController.delete')
            .where('id', /^[0-9]+$/)
            .as('noticias.delete')
    Route.get('/:id/view', 'NoticiasController.view')
            .where('id', /^[0-9]+$/)
            .as('noticias.view')
    Route.get('/:id/comment', 'NoticiasController.createComment')
            .where('id', /^[0-9]+$/)
            .as('noticias.comment')    
}).prefix('/noticia').middleware('auth')

Route.group(() => {
        Route.get('/', 'UsersController.index')
                .as('usuarios.index')
        Route.get('/create', 'UsersController.create')
                .as('usuarios.create')
        Route.post('/create', 'UsersController.store')
                .as('usuarios.store')
        Route.get('/:id/edit', 'UsersController.edit')
                .where('id', /^[0-9]+$/)
                .as('usuarios.edit')
        Route.post('/:id/edit', 'UsersController.update')
                .where('id', /^[0-9]+$/)
                .as('usuarios.update')
        Route.get('/:id/delete', 'UsersController.delete')
                .where('id', /^[0-9]+$/)
                .as('usuarios.delete')
    }).prefix('/usuario').middleware('auth')

    Route.group(() => {
            Route.get('/login','AuthController.index').as('auth.index')
            Route.post('/login','AuthController.login').as('auth.login')
            Route.get('/logout','AuthController.logout').as('auth.logout').middleware('auth')
    }).prefix('/auth')
