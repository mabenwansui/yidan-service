import { Body, Controller, Post, Req } from '@nestjs/common'
import { Auth } from '@/module/auth/guard/auth.decorator'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { DeleteProjectDto } from './dto/delete-project.dto'
import { SearchProjectDto } from './dto/search-project.dto'


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Auth()
  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto)
  }

  @Auth()
  @Post('update')
  async update(@Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.update(updateProjectDto)
  }

  @Auth()
  @Post('delete')
  async delete(@Body() deleteProjectDto: DeleteProjectDto) {
    const { id } = deleteProjectDto
    return await this.projectService.delete(id)
  }

  @Auth()
  @Post('search')
  async search(@Body() searchProjectDto: SearchProjectDto) {
    return await this.projectService.search(searchProjectDto)
  }

}
