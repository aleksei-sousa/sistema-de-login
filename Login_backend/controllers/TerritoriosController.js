const mongoose = require('mongoose')
const Territorios = require('../models/Territorios')

module.exports = class TerritoriosController {

    static async Subir (req, res) {

        const {numero, responsavel, anotacoes, marcacoes, dataInicio, dataFinal, concluido} = req.body

        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }
        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }
        if((!anotacoes) && (!marcacoes)){
            res.status(410).json({message: "sem anotacoes e marcacoes"})
            return
        }
        if(!dataInicio){
            res.status(410).json({message: "Digite a data do inicio"})
            return
        }
        if(!dataFinal){
            res.status(410).json({message: "Digite a data do final"})
            return
        }

                
        //console.log(numero, responsavel, anotacoes, marcacoes, dataInicio, dataFinal, concluido)

        const mapaExist = await Territorios.findOne({numero: numero})
        console.log(mapaExist)

        // if(mapaExist){
        //     console.log('existe')
        // }else {
        //     console.log('nao existe')
        // }

        if(!mapaExist){
            const territorio = new Territorios ({
                numero: numero,
                responsavel: responsavel,
                anotacoes: anotacoes,
                marcacoes: marcacoes,
                dataInicio: dataInicio,
                dataFinal: dataFinal,
                concluido: concluido
            })
            console.log(territorio)
            try {
                const newTerritorio = territorio.save()
                res.status(210).json({message: "território adicionado"})
            } catch (error) {
                res.status(410).json({message: error})
            }
        } else {    
            try{
                const filter = { numero: numero };
                const update = {
                    numero: numero,
                    responsavel: responsavel,
                    anotacoes: anotacoes,
                    marcacoes: marcacoes,
                    dataInicio: dataInicio,
                    dataFinal: dataFinal,
                    concluido: concluido
                };
                console.log()
                let doc = await Territorios.findOneAndUpdate(filter, update);
                await Territorio.findOneAndUpdate(
                    filter,
                    update,
                    { new: true},
                )
                    res.status(210).json({
                        message: "Usuário atualizado"
                    })

            } catch (err) {
                res.status(500).json({ message: err})
            }
        }
    }
}