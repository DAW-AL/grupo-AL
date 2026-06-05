"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const estados_proyectos_enum_1 = require("../enums/estados-proyectos.enum");
const estados_clientes_enum_1 = require("../enums/estados-clientes.enum");
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
let PdfService = class PdfService {
    crearDocumento(response, nombreArchivo) {
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
        const doc = new pdfkit_1.default({
            margin: 50,
        });
        doc.pipe(response);
        return doc;
    }
    agregarEncabezado(doc, titulo) {
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
    agregarPiePagina(doc) {
        doc
            .fontSize(8)
            .fillColor('gray')
            .text('DAW26 - Sistema de Gestión de Proyectos', 50, 730, {
            align: 'center',
            width: 500,
        });
    }
    agregarResumen(doc, lineas) {
        doc.font('Helvetica-Bold').fontSize(13).text('Resumen general');
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(11);
        lineas.forEach((linea) => doc.text(linea));
        doc.moveDown(1.5);
    }
    async generarReporteProyectos(proyectos, response) {
        const doc = this.crearDocumento(response, 'Reporte Proyectos.pdf');
        this.agregarEncabezado(doc, 'REPORTE DE PROYECTOS');
        const activos = proyectos.filter((p) => p.estado === estados_proyectos_enum_1.EstadosProyectosEnum.ACTIVO).length;
        const finalizados = proyectos.filter((p) => p.estado === estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO).length;
        const bajas = proyectos.filter((p) => p.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA).length;
        this.agregarResumen(doc, [
            `Total de proyectos: ${proyectos.length}`,
            `Activos: ${activos}`,
            `Finalizados: ${finalizados}`,
            `Dados de baja: ${bajas}`,
        ]);
        doc.moveDown(1.5);
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
        let numeroProyecto = 1;
        for (const proyecto of proyectos) {
            if (doc.y > 650) {
                doc.addPage();
            }
            doc
                .font('Helvetica-Bold')
                .fontSize(15)
                .fillColor('#2c3e50')
                .text(`${numeroProyecto}. ${proyecto.nombre}`);
            numeroProyecto++;
            doc.moveDown(0.5);
            doc
                .font('Helvetica-Bold')
                .fontSize(11)
                .fillColor('black')
                .text('Cliente asociado:', {
                continued: true,
            });
            doc.font('Helvetica').text(` ${proyecto.cliente?.nombre ?? 'Interno'}`);
            let colorEstado = '#16a34a';
            if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO) {
                colorEstado = '#2563eb';
            }
            if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA) {
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
            doc.font('Helvetica-Bold').text('Tareas:');
            doc.moveDown(0.2);
            doc.font('Helvetica');
            if (proyecto.tareas.length === 0) {
                doc.text('• Sin tareas registradas');
            }
            else {
                for (const tarea of proyecto.tareas) {
                    doc.text(`• ${tarea.descripcion} - ${estadosTareas[tarea.estado]}`);
                }
            }
            doc.moveDown(1);
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
    async generarReporteClientes(clientes, response) {
        const doc = this.crearDocumento(response, 'Reporte Clientes.pdf');
        this.agregarEncabezado(doc, 'REPORTE DE CLIENTES');
        const activos = clientes.filter((c) => c.estado === estados_clientes_enum_1.EstadosClientesEnum.ACTIVO).length;
        const bajas = clientes.filter((c) => c.estado === estados_clientes_enum_1.EstadosClientesEnum.BAJA).length;
        this.agregarResumen(doc, [
            `Total de clientes: ${clientes.length}`,
            `Activos: ${activos}`,
            `Dados de baja: ${bajas}`,
        ]);
        doc.moveDown(1.5);
        const estadosClientes = {
            ACTIVO: 'Activo',
            BAJA: 'Baja',
        };
        let numeroCliente = 1;
        for (const cliente of clientes) {
            if (doc.y > 650) {
                doc.addPage();
            }
            doc
                .font('Helvetica-Bold')
                .fontSize(15)
                .fillColor('#2c3e50')
                .text(`${numeroCliente}. ${cliente.nombre}`);
            numeroCliente++;
            doc.moveDown(0.5);
            doc
                .font('Helvetica')
                .fontSize(11)
                .fillColor('black')
                .text(`Email: ${cliente.email}`);
            doc.text(`Teléfono: ${cliente.telefono}`);
            doc.moveDown(0.5);
            const colorEstado = cliente.estado === estados_clientes_enum_1.EstadosClientesEnum.BAJA ? '#dc2626' : '#16a34a';
            doc.font('Helvetica-Bold').fillColor('black').text('Estado:', {
                continued: true,
            });
            doc
                .font('Helvetica-Bold')
                .fillColor(colorEstado)
                .text(` ${estadosClientes[cliente.estado]}`);
            doc.fillColor('black');
            doc.moveDown();
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
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map