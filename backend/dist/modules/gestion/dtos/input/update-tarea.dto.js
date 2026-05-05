"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarTareaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_tarea_dto_1 = require("./create-tarea.dto");
class ActualizarTareaDto extends (0, swagger_1.PartialType)(create_tarea_dto_1.CrearTareaDto) {
}
exports.ActualizarTareaDto = ActualizarTareaDto;
;
//# sourceMappingURL=update-tarea.dto.js.map