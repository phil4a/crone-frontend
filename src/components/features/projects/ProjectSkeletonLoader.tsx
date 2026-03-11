import { SkeletonLoader } from '../../ui/SkeletonLoader';

interface Props {
	idx?: number;
}

export function ProjectSkeletonLoader({ idx }: Props) {
	return (
		<div
			key={idx}
			className='relative flex flex-col'
		>
			<div className='absolute w-23.5 h-7.5 rounded-lg top-5 left-5 z-1 bg-white' />
			<div className='absolute top-5 right-5 z-1 w-15.25 h-7.5 rounded-lg bg-white' />
			<SkeletonLoader
				count={1}
				className='relative w-full h-full aspect-4/3 lg:aspect-video rounded-2xl'
			/>
			<div className='flex flex-col pt-4 pb-5 px-2 gap-2'>
				<SkeletonLoader
					count={1}
					className='w-30 h-6 mb-1 rounded-lg'
				/>
				<div className='flex flex-wrap gap-x-8 gap-y-2.5'>
					{
						<SkeletonLoader
							count={4}
							className='w-22 h-6 rounded-lg'
						/>
					}
				</div>
			</div>
		</div>
	);
}
