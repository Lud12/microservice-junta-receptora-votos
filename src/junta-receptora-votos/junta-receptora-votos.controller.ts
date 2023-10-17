import { Controller } from '@nestjs/common';
import { JuntaReceptoraVotosService } from './junta-receptora-votos.service';
import { JuntaReceptoraVotosMSG } from 'src/common/constantes';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class JuntaReceptoraVotosController {
  constructor(
    private readonly juntaReceptoraVotosService: JuntaReceptoraVotosService,
  ) {}

  @MessagePattern(JuntaReceptoraVotosMSG.CREATE)
  async create(@Payload() payload: any) {
    return await this.juntaReceptoraVotosService.create(payload);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.FIND_ALL)
  async findByMunicipio() {
    return this.juntaReceptoraVotosService.findAll();
  }

  @MessagePattern(JuntaReceptoraVotosMSG.FIND_ALL_BY_MUNICIPIO)
  async findAllByMunicipio(@Payload() payload: any) {
    return this.juntaReceptoraVotosService.findAllByMunicipio(payload.id_municipio);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    return this.juntaReceptoraVotosService.findOne(id);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.FIND_ONE_BY_CODE)
  async findOneByCode(@Payload() code: string) {
    return this.juntaReceptoraVotosService.findOneByCode(code);
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

  @MessagePattern(JuntaReceptoraVotosMSG.SET_STATUS_JRV)
  async changeStatusJrv(@Payload() payload: any) {
    const { id_jrv } = payload;
    
    return this.juntaReceptoraVotosService.changeStatusJrv(id_jrv);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.GET_MEMBERS_BY_JRV)
  async getMembersByJRVId(@Payload() id_jrv: number) {
    return this.juntaReceptoraVotosService.getMembersByJRVId(id_jrv);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.GET_MEMBERS)
  async getMembers() {
    return this.juntaReceptoraVotosService.getMembers();
  }

  @MessagePattern(JuntaReceptoraVotosMSG.GET_MEMBER_BY_ID)
  async getMemberById(@Payload() payload: any) {
    const { id_jrv_miembro } = payload;
    
    return this.juntaReceptoraVotosService.getMemberById(id_jrv_miembro);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.GET_MEMBER_BY_USER_ID)
  async getMemberByUserId(@Payload() payload: any) {
    return this.juntaReceptoraVotosService.getMemberByUserId(payload.id_usuario, payload.id_jrv);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.CREATE_MEMBER)
  async createMember(@Payload() payload: any) {
    return this.juntaReceptoraVotosService.createMember(payload);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.UPDATE_MEMBER)
  async updateMember(@Payload() payload: any) {
    const { id_jrv_miembro, miembroData } = payload;
    return this.juntaReceptoraVotosService.updateMember(
      id_jrv_miembro,
      miembroData,
    );
  }

  @MessagePattern(JuntaReceptoraVotosMSG.DELETE_MEMBER)
  async deleteMember(@Payload() id: number) {
    return this.juntaReceptoraVotosService.deleteMember(id);
  }

  @MessagePattern(JuntaReceptoraVotosMSG.SET_STATUS_JRV)
  async changeStatusJrvMember(@Payload() payload: any) {
    const { id_jrv_miembro } = payload;
    
    return this.juntaReceptoraVotosService.changeStatusJrvMember(id_jrv_miembro);
  }

}
