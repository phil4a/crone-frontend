import Image from 'next/image';
import Link from 'next/link';
import { FeatureItem } from '@/config/features.data';

interface FeaturesSlideProps {
	item: FeatureItem;
}

export function FeaturesSlide({ item }: FeaturesSlideProps) {
	return (
		<div className="relative h-[500px] w-full overflow-hidden rounded-lg">
			{/* Background Image */}
			<Image
				src={item.image}
				alt={item.title}
				fill
				className="object-cover z-0"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>

			{/* Gradient Overlay */}
			<div
				className="absolute inset-0 z-0"
				style={{
					background: 'linear-gradient(to top, rgba(56, 56, 56, 0.6) 30%, rgba(56, 56, 56, 0) 50%)',
				}}
			/>

			{/* Content */}
			<div className="absolute bottom-0 left-0 z-10 flex h-1/3 w-full flex-col justify-start px-8 pb-8">
				<h4 className="text-beige text-xl md:text-2xl font-semibold mb-2.5 drop-shadow-md">
					{item.title}
				</h4>
				<p className="text-white text-base leading-relaxed flex-1">{item.text}</p>
				{item.link && (
					<Link
						href={item.link.href}
						className="inline-block z-1 text-white underline mt-2 hover:text-beige transition-colors">
						{item.link.label}
					</Link>
				)}
			</div>
		</div>
	);
}
