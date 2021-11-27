import { Body, Controller, Put, Res } from '@nestjs/common';
import { RefreshTokenDto } from 'src/service/session-token/dto/refresh.token.dto';
import { SessionTokenService } from 'src/service/session-token/session-token.service';


@Controller('token')
export class SessionTokenController {
  constructor(
    private sessionTokenService: SessionTokenService
  ) { }


  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto, @Res() response) {
    const result = await this.sessionTokenService.refreshToken(data.tokenAntigo);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }


}