import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Project')
@ApiBearerAuth('access-token')
export class ProjectController {
  @Get('/')
  async getProject() {
    return;
  }
}
