
//Enumeração dos status code
export const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * @description Classe base para todos os erros do sistema. Superclasse de todas as outras classes de erros mais específicos.
 */
export class HttpErro extends Error{
  
  /**
   * @param {HttpCode} code - Status code do erro
   * @param {String} message - Mensagem de erro específica
   */
  constructor(code, message){
    super(message);
    
    if(Object.values(HttpCode).includes(code)){
      this.code = code;
    } else{
      throw new ImprevistError("Não foi possível determinar a natureza do erro");
    }
    
  }

  /**
   * @private
   * @description Formata resposta de erro para json
   * @returns {Object{code: {Number}, message: {String}}}
   */
  #toJson(){
    return {code: this.code, message: this.message};
  }

  /**
   * @description Responsável por enviar os erro instanciado como resposta da requisisção http
   * @param {*} express_response - Response do express
   */
  sendMessage(express_response){
    express_response.status(this.code).json(this.#toJson());
  }

}

//Classes genéricas de erros comuns entre funcionalidades
export class ImprevistError extends HttpErro{
  constructor(message){
    super(HttpCode.INTERNAL_SERVER_ERROR, "Um erro inesperado aconteceu. --- " + message);
  }
}

export class JoiValidatorError extends HttpErro{
  constructor(message = "Erro ao validar entradas"){
    super(HttpCode.BAD_REQUEST, "Erro de validação: " + message);
  }
}
export class MailerError extends HttpErro{
  constructor(message = "Erro ao enviar e-mail"){
    super(HttpCode.INTERNAL_SERVER_ERROR, "Erro ao enviar e-mail: " + message);
  }
}

export class APITimezoneDBError extends HttpErro{
  constructor(message = "Erro de conexão com TimezoneDB"){
    super(HttpCode.INTERNAL_SERVER_ERROR, `Erro ao se comunicar com timezoneDB API: ${message}`);
  }
}

export class ProcessTimezoneError extends HttpErro{
  constructor(message = "Timezone improcessável"){
    super(HttpCode.BAD_REQUEST, `Erro ao processar modificação de timezone: ${message}`);
  }
}   

export class FileSystemException extends HttpErro {
  constructor(message = "Operação inesperada") {
    super(HttpCode.BAD_REQUEST, `Falha ao manipular sistema de arquivos: ${message}`);
  }
} 
