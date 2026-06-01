import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { ProyectosController } from './controllers/proyectos.controller';
import { TareaController } from './controllers/tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Cliente } from './entities/cliente.entity';
import { Proyecto } from './entities/proyecto.entity';
import { TareaService } from './services/tarea.service';
import { AuthModule } from '../auth/auth.module';
import { ClientesService } from './services/clientes.service';
import { ProyectosService } from './services/proyectos.service';
import { EstadisticasController } from './controllers/estadisticas.controller';
import { EstadisticasService } from './services/estadisticas.service';
import { HistorialModule } from '../historial/historial.module';

@Module({
  controllers: [
    ClientesController,
    ProyectosController,
    TareaController,
    EstadisticasController,
  ],
  providers: [
    TareaService,
    ClientesService,
    ProyectosService,
    EstadisticasService,
  ],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([Tarea, Cliente, Proyecto]),
    AuthModule,
    HistorialModule,
  ],
})
export class GestionModule {}
