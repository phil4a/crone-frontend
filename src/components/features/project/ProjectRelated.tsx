import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { Title } from '@/components/ui/Title';
import { Project } from '@/types/project.types';

export function ProjectRelated({ relatedProjects }: { relatedProjects: Project[] }) {
  return (<section className='pt-16 md:pt-20 bg-light-gray'>
					<div className='container'>
						<Title
							as='h2'
							variant='h3'
							className='mb-8'
						>
							Похожие проекты
						</Title>
						<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
							{relatedProjects.map(item => (
								<ProjectCardDetailed
									key={item.id}
									project={item}
								/>
							))}
						</ul>
					</div>
				</section>
)}
