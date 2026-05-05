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

@Module({
  controllers: [ClientesController, ProyectosController, TareaController],
  providers: [TareaService, ClientesService, ProyectosService],
  exports: [],
  imports: [TypeOrmModule.forFeature([Tarea, Cliente, Proyecto]), AuthModule],
})
export class GestionModule {}
