interface AdvantagesNumberProps {
	number: string;
	label: string;
}

export function AdvantagesNumber({ number, label }: AdvantagesNumberProps) {
	return (
		<div className="flex-1 md:py-3.5 px-2 md:px-4 md:pb-4.5 py-4 border-b border-[#61413762] md:border-b-0 last:border-b-0">
			<p className="text-[32px] font-bold text-brown leading-normal">{number}</p>
			<p className="text-main leading-[1.4]">{label}</p>
		</div>
	);
}
