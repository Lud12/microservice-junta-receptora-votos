import { Controller } from '@nestjs/common';
import { JuntaReceptoraVotosService } from './junta-receptora-votos.service';
import { JuntaReceptoraVotosMSG } from 'src/common/constantes';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class JuntaReceptoraVotosController {
    
  constructor(private readonly juntaReceptoraVotosService: JuntaReceptoraVotosService) {}

  @MessagePattern(JuntaReceptoraVotosMSG.CREATE)
  async create(@Payload() payload: any) {
    console.log('prueba');
    return await this.juntaReceptoraVotosService.create(payload);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.FIND_ALL)
  async findAll() {
    return this.juntaReceptoraVotosService.findAll();
  }

  @MessagePattern(JuntaReceptoraVotosMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    return this.juntaReceptoraVotosService.findOne(id);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.UPDATE)
  async update(@Payload() payload: any) {
    const { id, juntaReceptoraVotosDTO } = payload;
    return this.juntaReceptoraVotosService.update(id, juntaReceptoraVotosDTO);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.DELETE)
  async delete(@Payload() id: number) {
    return this.juntaReceptoraVotosService.delete(id);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.GET_MEMBERS_BY_JRV)
  async getMembersByJRVId(@Payload() id_jrv: string): Promise<any[]> {
      return this.juntaReceptoraVotosService.getMembersByJRVId(id_jrv);
  }

  /*@MessagePattern(JuntaReceptoraVotosMSG.GET_MEMBER_BY_ID)
  async getMemberById(@Payload() payload: { id_jrv: string, id_miembro: string }): Promise<Observable<any>> {
    const { id_jrv, id_miembro } = payload;
    return this.juntaReceptoraVotosService.getMemberById(id_jrv, id_miembro);
  }*/

  @MessagePattern(JuntaReceptoraVotosMSG.CREATE_MEMBER)
  async createMember(@Payload() payload: { id_jrv: string, miembroData: any }): Promise<Observable<any>> {
    const { id_jrv, miembroData } = payload;
    return this.juntaReceptoraVotosService.createMember(id_jrv, miembroData);
  }

}
