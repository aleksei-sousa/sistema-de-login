const mongoose = require('mongoose')
const { Schema } = mongoose
const Territorios = mongoose.model(
    'Territorios',
    new Schema (
        {
            numero:{
                type: String,
                required: true
            },
            responsavel:{
                type: String,
                required: true
            },
            anotacoes:{
                type: String,
                required: false
            },
            marcacoes:{
                type: String,
                required: false
            },
            dataInicio:{
                type: String,
                required: true
            },
            dataFinal:{
                type: String,
                required: true
            },
            concluido:{
                type: Boolean,
                required: false
            }
        },
        { timestamps: true }
    )
)

module.exports = Territorios