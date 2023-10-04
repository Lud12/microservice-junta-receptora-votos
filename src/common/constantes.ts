export enum RabbitMQ {
  JuntaReceptoraVotosQueue = 'junta_receptora_votos',
}

export enum JuntaReceptoraVotosMSG {
  CREATE = 'CREATE_JUNTA_RECEPTORA_VOTOS',
  UPDATE = 'UPDATE_JUNTA_RECEPTORA_VOTOS',
  DELETE = 'DELETE_JUNTA_RECEPTORA_VOTOS',
  FIND_ALL = 'FIND_JUNTAS_RECEPTORA_VOTOS',
  FIND_ONE = 'FIND_JUNTA_RECEPTORA_VOTOS',
  GET_MEMBERS_BY_JRV = 'GET_MEMBERS_BY_JRV',
  GET_MEMBER_BY_ID = 'GET_MEMBER_BY_ID',
  GET_MEMBERS_BY_ID_PERSONA_NATURAL = 'GET_MEMBERS_BY_ID_PERSONA_NATURAL',  
  CREATE_MEMBER = 'CREATE_MEMBER',  
  UPDATE_MEMBER = 'UPDATE_MEMBER',
  DELETE_MEMBER = 'DELETE_MEMBER'
}