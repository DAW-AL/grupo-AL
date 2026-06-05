import { Proyecto } from '../entities/proyecto.entity';
import { Cliente } from '../entities/cliente.entity';
import { Usuario } from '../../auth/entities/usuario.entity';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';

@Injectable()
export class PdfService {
  private crearDocumento(
    response: Response,
    nombreArchivo: string,
  ): PDFKit.PDFDocument {
    response.setHeader('Content-Type', 'application/pdf');

    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${nombreArchivo}"`,
    );

    const doc = new PDFDocument({
      margin: 50,
    });

    doc.pipe(response);

    return doc;
  }

  private agregarEncabezado(doc: PDFKit.PDFDocument, titulo: string): void {
    doc.image('public/logo.png', 195, 25, {
      width: 200,
    });

    doc.moveDown(7);

    doc.font('Helvetica-Bold').fontSize(18).text(titulo, {
      align: 'center',
    });

    doc.moveDown(0.5);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Fecha de emisión: ${new Date().toLocaleDateString('es-AR')}`, {
        align: 'center',
      });

    doc.moveDown();

    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor('#000000')
      .lineWidth(1)
      .stroke();

    doc.moveDown(1.5);
  }

  private agregarPiePagina(doc: PDFKit.PDFDocument): void {
    doc
      .fontSize(8)
      .fillColor('gray')
      .text('DAW26 - Sistema de Gestión de Proyectos', 50, 730, {
        align: 'center',
        width: 500,
      });
  }

  private agregarResumen(doc: PDFKit.PDFDocument, lineas: string[]): void {
    doc.font('Helvetica-Bold').fontSize(13).text('Resumen general');

    doc.moveDown(0.5);

    doc.font('Helvetica').fontSize(11);

    lineas.forEach((linea) => doc.text(linea));

    doc.moveDown(1.5);
  }

  // PROYECTOS
  async generarReporteProyectos(
    proyectos: Proyecto[],
    response: Response,
  ): Promise<void> {
    const doc = this.crearDocumento(response, 'Reporte Proyectos.pdf');

    this.agregarEncabezado(doc, 'REPORTE DE PROYECTOS');

    // ESTADISTICAS

    const activos = proyectos.filter(
      (p) => p.estado === EstadosProyectosEnum.ACTIVO,
    ).length;

    const finalizados = proyectos.filter(
      (p) => p.estado === EstadosProyectosEnum.FINALIZADO,
    ).length;

    const bajas = proyectos.filter(
      (p) => p.estado === EstadosProyectosEnum.BAJA,
    ).length;

    this.agregarResumen(doc, [
      `Total de proyectos: ${proyectos.length}`,
      `Activos: ${activos}`,
      `Finalizados: ${finalizados}`,
      `Dados de baja: ${bajas}`,
    ]);

    doc.moveDown(1.5);

    // TRADUCCIONES

    const estadosProyecto = {
      ACTIVO: 'Activo',
      FINALIZADO: 'Finalizado',
      BAJA: 'Baja',
    };

    const estadosTareas = {
      PENDIENTE: 'Pendiente',
      FINALIZADA: 'Finalizada',
      BAJA: 'Baja',
    };

    // PROYECTOS

    let numeroProyecto = 1;

    for (const proyecto of proyectos) {
      if (doc.y > 650) {
        doc.addPage();
      }

      // Título del proyecto

      doc
        .font('Helvetica-Bold')
        .fontSize(15)
        .fillColor('#2c3e50')
        .text(`${numeroProyecto}. ${proyecto.nombre}`);

      numeroProyecto++;

      doc.moveDown(0.5);

      // Cliente

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor('black')
        .text('Cliente asociado:', {
          continued: true,
        });

      doc.font('Helvetica').text(` ${proyecto.cliente?.nombre ?? 'Interno'}`);

      // Estado

      let colorEstado = '#16a34a';

      if (proyecto.estado === EstadosProyectosEnum.FINALIZADO) {
        colorEstado = '#2563eb';
      }

      if (proyecto.estado === EstadosProyectosEnum.BAJA) {
        colorEstado = '#dc2626';
      }

      doc.font('Helvetica-Bold').fillColor('black').text('Estado:', {
        continued: true,
      });

      doc
        .font('Helvetica-Bold')
        .fillColor(colorEstado)
        .text(` ${estadosProyecto[proyecto.estado]}`);

      doc.fillColor('black');

      doc.moveDown(0.5);

      // Tareas

      doc.font('Helvetica-Bold').text('Tareas:');

      doc.moveDown(0.2);

      doc.font('Helvetica');

      if (proyecto.tareas.length === 0) {
        doc.text('• Sin tareas registradas');
      } else {
        for (const tarea of proyecto.tareas) {
          doc.text(`• ${tarea.descripcion} - ${estadosTareas[tarea.estado]}`);
        }
      }

      doc.moveDown(1);

      // Línea separadora

      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor('#dddddd')
        .lineWidth(1)
        .stroke();

      doc.moveDown(1.5);
    }

    this.agregarPiePagina(doc);

    doc.end();
  }

  // CLIENTES
  async generarReporteClientes(
    clientes: Cliente[],
    response: Response,
  ): Promise<void> {
    const doc = this.crearDocumento(response, 'Reporte Clientes.pdf');

    this.agregarEncabezado(doc, 'REPORTE DE CLIENTES');

    // ESTADÍSTICAS

    const activos = clientes.filter(
      (c) => c.estado === EstadosClientesEnum.ACTIVO,
    ).length;

    const bajas = clientes.filter(
      (c) => c.estado === EstadosClientesEnum.BAJA,
    ).length;

    this.agregarResumen(doc, [
      `Total de clientes: ${clientes.length}`,
      `Activos: ${activos}`,
      `Dados de baja: ${bajas}`,
    ]);

    doc.moveDown(1.5);

    // TRADUCCIONES

    const estadosClientes = {
      ACTIVO: 'Activo',
      BAJA: 'Baja',
    };

    // CLIENTES

    let numeroCliente = 1;

    for (const cliente of clientes) {
      if (doc.y > 650) {
        doc.addPage();
      }

      // TÍTULO DEL CLIENTE

      doc
        .font('Helvetica-Bold')
        .fontSize(15)
        .fillColor('#2c3e50')
        .text(`${numeroCliente}. ${cliente.nombre}`);

      numeroCliente++;

      doc.moveDown(0.5);

      // EMAIL

      doc
        .font('Helvetica')
        .fontSize(11)
        .fillColor('black')
        .text(`Email: ${cliente.email}`);

      // TELÉFONO

      doc.text(`Teléfono: ${cliente.telefono}`);

      doc.moveDown(0.5);

      // ESTADO

      const colorEstado =
        cliente.estado === EstadosClientesEnum.BAJA ? '#dc2626' : '#16a34a';

      doc.font('Helvetica-Bold').fillColor('black').text('Estado:', {
        continued: true,
      });

      doc
        .font('Helvetica-Bold')
        .fillColor(colorEstado)
        .text(` ${estadosClientes[cliente.estado]}`);

      doc.fillColor('black');

      doc.moveDown();

      // LÍNEA SEPARADORA

      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor('#dddddd')
        .lineWidth(1)
        .stroke();

      doc.moveDown(1.5);
    }

    this.agregarPiePagina(doc);

    doc.end();
  }
}
