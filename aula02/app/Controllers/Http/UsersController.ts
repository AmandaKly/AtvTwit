import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    async index ({ view }: HttpContextContract) {
        const usuarios = await User.query().orderBy('created_at', 'desc')
       
        return view.render('usuarios/index',{
            usuarios
        })
    }
     /**Listar  */

    async delete ({ params, response }: HttpContextContract) {
        try{
            const usuario = await User.findOrFail(params.id)
            await usuario.delete()
            } catch (e) {
    
            }
            return response.redirect().toRoute('usuarios.index')  
      
    }
     /** busca
         * deletar
         */

    async create ({ view, session }: HttpContextContract) {
        const usuario = session.flashMessages.get('usuario') || {}
        return view.render('usuarios/create', {
            usuario
        })
        
    }

    /**Exibe o formulário/renderizar o formulário */

    async store ({ request, response, session }: HttpContextContract) {
        const dados = request.only(['nome', 'login', 'senha', 'papel'])
        try{
        await User.create(dados)
        return response.redirect().toRoute('usuarios.index')   
        }
        catch(e) {
            session.flash('erro','Erro ao cadastrar notícia')
            session.flash('usuario', dados)
            return response.redirect().toRoute('usuario.create')   
        }     
        
   
    }
    /**Armazena os dados do formulário @param param0*/

    async edit ({params, view }: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        usuario.senha = ''
        return view.render('usuarios/edit', {
            usuario
        })
        

    
    }
    /**Buscar um registro e exibir o formulário preenchido */

    async update ({params, request, response }: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        usuario.merge(request.only(['nome','login', 'papel']))

        if (request.input('senha')) {
            usuario.senha = request.input('senha')
        }
        try{
            await usuario.save()
        } catch(e) {
           
        }
        return response.redirect().toRoute('usuarios.index')   
    }

}
