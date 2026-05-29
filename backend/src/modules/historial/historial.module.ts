import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialCambio } from './entities/historial-cambio.entity';
import { HistorialService } from './services/historial.service';
import { HistorialController } from './controllers/historial.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialCambio]),
  ],
  controllers: [HistorialController],
  providers: [HistorialService],
  exports: [HistorialService],
})
export class HistorialModule {}