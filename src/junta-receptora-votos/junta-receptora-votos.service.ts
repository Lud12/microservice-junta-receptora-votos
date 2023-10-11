import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, jrv_miembros, junta_receptora_votos } from '@prisma/client';
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
        centro_votacion: {
          select: {
            id_centro_votacion: true,
            id_municipio: true,
            nombre: true,
            direccion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            municipios: {
              select: {
                id_municipio: true,
                nombre: true,
                departamentos: {
                  select: {
                    id_departamento: true,
                    nombre: true,
                  },
                },
              },
            },
          },
        },
        jrv_miembros: {
          select: {
            id_jrv_miembro: true,
            id_jrv: true,
            id_usuario: true,
            estado: true,
            usuario: {
              select: {
                id_usuario: true,
                id_rol: true,
                nombres: true,
                apellidos: true,
                dui: true,
                usuario: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                Rol: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.findUnique({
      where: {
        id_jrv: id,
      },
      select: {
        id_jrv: true,
        id_centro_votacion: true,
        codigo: true,
        estado: true,
        creado_en: true,
        modificado_en: true,
        centro_votacion: {
          select: {
            id_centro_votacion: true,
            id_municipio: true,
            nombre: true,
            direccion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            municipios: {
              select: {
                id_municipio: true,
                nombre: true,
                departamentos: {
                  select: {
                    id_departamento: true,
                    nombre: true,
                  },
                },
              },
            },
          },
        },
        jrv_miembros: {
          select: {
            id_jrv_miembro: true,
            id_jrv: true,
            id_usuario: true,
            estado: true,
            usuario: {
              select: {
                id_usuario: true,
                id_rol: true,
                nombres: true,
                apellidos: true,
                dui: true,
                usuario: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                Rol: true,
              },
            },
          },
        },
      },
    });
  }

  async findOneByCode(code: string): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.findFirst({
      where: {
        codigo: code,
      },
    });
  }

  async update(
    id: number,
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosUpdateInput,
  ): Promise<junta_receptora_votos> {
    let countCodigo = await this.model.junta_receptora_votos.count({
      where: {
        codigo: juntaReceptoraVotosDTO.codigo.toString(),
        NOT: {
          id_jrv: id,
        },
      },
    });

    if (countCodigo == 1)
      throw new HttpException(
        'Centro de votación ya posee este nombre',
        HttpStatus.NOT_FOUND,
      );

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

  async getMembersByJRVId(id_jrv: number): Promise<any> {
    const members = await this.model.jrv_miembros.findMany({
      select: {
        id_jrv_miembro: true,
        id_jrv: true,
        id_usuario: true,
        estado: true,
        jrv: {
          select: {
            id_jrv: true,
            codigo: true,
            id_centro_votacion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            centro_votacion: {
              select: {
                id_centro_votacion: true,
                id_municipio: true,
                nombre: true,
                direccion: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                municipios: {
                  select: {
                    id_municipio: true,
                    nombre: true,
                    departamentos: {
                      select: {
                        id_departamento: true,
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuario: {
          select: {
            id_usuario: true,
            id_rol: true,
            nombres: true,
            apellidos: true,
            dui: true,
            usuario: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            Rol: true,
          },
        },
      },
      where: {
        id_jrv: id_jrv,
      },
    });
    return members;
  }

  async getMemberById(
    id_jrv: number,
    id_jrv_miembro: number,
  ): Promise<any> {
    return await this.model.jrv_miembros.findUnique({
      select: {
        id_jrv_miembro: true,
        id_jrv: true,
        id_usuario: true,
        estado: true,
        jrv: {
          select: {
            id_jrv: true,
            codigo: true,
            id_centro_votacion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            centro_votacion: {
              select: {
                id_centro_votacion: true,
                id_municipio: true,
                nombre: true,
                direccion: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                municipios: {
                  select: {
                    id_municipio: true,
                    nombre: true,
                    departamentos: {
                      select: {
                        id_departamento: true,
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuario: {
          select: {
            id_usuario: true,
            id_rol: true,
            nombres: true,
            apellidos: true,
            dui: true,
            usuario: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            Rol: true,
          },
        },
      },
      where: {
        id_jrv: id_jrv,
        id_jrv_miembro: id_jrv_miembro,
      },
    });
  }

  async createMember(
    miembroJrv: Prisma.jrv_miembrosCreateInput,
  ): Promise<jrv_miembros> {
    return await this.model.jrv_miembros.create({
      data: miembroJrv,
    });
  }

  async updateMember(
    id: number,
    juntaReceptoraVotosDTO: Prisma.jrv_miembrosUncheckedUpdateInput,
  ): Promise<jrv_miembros> {
    return await this.model.jrv_miembros.update({
      where: {
        id_jrv_miembro: id,
      },
      data: juntaReceptoraVotosDTO,
    });
  }

  async deleteMember(id: number) {
    return await this.model.jrv_miembros.delete({
      where: {
        id_jrv_miembro: id,
      },
    });
  }
}
