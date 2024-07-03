const express = require("express")
const clientesRoutes = require("./routes/clientes.routes")
const produtosRoutes = require("./routes/produtos.routes")



const app = express()
app.use(express.json())

app.use('/clientes', clientesRoutes)
app.use('/produtos', produtosRoutes)

app.listen(3000, () => {
    console.log("Servidor Online")})

