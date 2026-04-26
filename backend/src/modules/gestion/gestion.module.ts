import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { ProyectosController } from './controllers/proyectos.controller';
import { TareasController } from './controllers/tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entitites/tarea.entity';
import { Cliente } from './entitites/cliente.entity';
import { Proyecto } from './entitites/proyecto.entity';
import { TareasService } from './services/tarea.service';

@Module({
  controllers: [ClientesController, ProyectosController, TareasController],
  providers: [TareasService],
  exports: [],
  imports: [TypeOrmModule.forFeature([Tarea, Cliente, Proyecto])],
})
export class GestionModule {}
