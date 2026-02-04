import { ReactNode, PropsWithChildren } from 'react';

interface AdvantagesItemProps extends PropsWithChildren {
	icon: ReactNode;
}

export function AdvantagesItem({ icon, children }: AdvantagesItemProps) {
	return (
		<div className="flex gap-4 md:gap-3 items-start py-2.5">
			<div className="shrink-0 w-[68px] h-[68px] bg-beige rounded flex items-center justify-center text-white">
				{icon}
			</div>
			<div className="text-main leading-[1.4] flex items-center">{children}</div>
		</div>
	);
}
