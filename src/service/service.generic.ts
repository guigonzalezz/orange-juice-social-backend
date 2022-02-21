export interface BasicResponseInterface {
    code: number
    data?: any
    error?: any
}
  
export abstract class BaseServiceGeneric{
  
  constructor() {}

  createReturn(code, messageOrObject):BasicResponseInterface {
    return {
        code,
        data: messageOrObject
    }
  }

}
