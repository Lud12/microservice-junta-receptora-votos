import { Injectable } from '@nestjs/common';
import { Prisma, junta_receptora_votos } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JuntaReceptoraVotosService {
  changeStatus(id: any, estado: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly model: PrismaService) {}

  async create(
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosCreateInput,
  ): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.create({
      data: juntaReceptoraVotosDTO,
    });
  }

  async findAll(): Promise<junta_receptora_votos[]> {
    return await this.model.junta_receptora_votos.findMany({
      select: {
        id_jrv: true,
        id_centro_votacion: true,
        codigo: true,
        estado: true,
        creado_en: true,
        modificado_en: true,
        centro_votacion: true,
        jrv_miembros: true
      },
    });
  }

  async findOne(id: number): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.findUnique({
      where: {
        id_jrv: id,
      },
    });
  }

  async update(
    id: number,
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosUpdateInput,
  ): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.update({
      where: {
        id_jrv: id,
      },
      data: juntaReceptoraVotosDTO,
    });
  }

  async delete(id: number) {
    return await this.model.junta_receptora_votos.delete({
      where: {
        id_jrv: id,
      },
    });
  }

  async getMembersByJRVId(id_jrv: string): Promise<any[]> {
    const id_jrvNumber = parseInt(id_jrv);
    const members = await this.model.jrv_miembros.findMany({
      where: {
        id_jrv: id_jrvNumber,
      },
    });
    return members;
  }

  /*async getMemberById() {
    
  }*/

  async createMember(id_jrv: string, miembroData: any): Promise<any> {
    const miembroDataWithJRVId = {
      ...miembroData,
      id_jrv: id_jrv,
    };

    const newMember = await this.model.jrv_miembros.create({
      data: miembroDataWithJRVId,
    });

    return newMember;
  }
}
