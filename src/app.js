import express from 'express'
import cors from 'cors';  // Importa el paquete cors
import servicesRoutes from './routes/services.routes.js'
import indexRoutes from './routes/index.routes.js'
import ownersRoutes from "./routes/owners.routes.js";
import customerRoutes from "./routes/customers.routes.js"


  

const app = express()


// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',  // Permite solicitudes solo desde localhost:5173 (tu frontend en desarrollo)
    methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization',  // Encabezados permitidos
  }));
  
app.use(express.json())

app.use(indexRoutes)
app.use('/api',servicesRoutes,ownersRoutes,customerRoutes)

app.use((req, res, next ) => {
    res.status(404).json({
        message:'endpoint not found'
    })
})


export default app;