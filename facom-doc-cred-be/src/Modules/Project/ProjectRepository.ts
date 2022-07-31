import { DeepPartial, Repository } from "typeorm";
import { Project } from "@typeorm/entity/Project";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

export type ProjectDTO = DeepPartial<Project>;

class ProjectRepository {
  constructor(private ormRepository: Repository<Project>) {}

  public async create(projectData: ProjectDTO | ProjectDTO[]) {
    //@ts-expect-error
    const project = this.ormRepository.create(projectData);

    await this.ormRepository.save(project);

    return project;
  }

  public async findById(projectId: string) {
    const project = await this.ormRepository.findOne({
      where: { id: projectId },
      relations: ["professor_id"],
    });
    return project;
  }

  public async update(projectId: string, projectNewData: ProjectDTO) {
    const project = await this.ormRepository.findOne({
      where: { id: projectId },
    });

    const projectNewDataFiltered = removeUndefinedKeys({
      ...projectNewData,
    });

    const updatedProject = {
      ...project,
      ...projectNewDataFiltered,
    };

    await this.ormRepository.save(updatedProject);
    return updatedProject;
  }

  public async deleteById(projectId: string) {
    const project = await this.findById(projectId);

    if (project) {
      await this.ormRepository.remove(project);
    }

    return project;
  }
}

export default ProjectRepository;
