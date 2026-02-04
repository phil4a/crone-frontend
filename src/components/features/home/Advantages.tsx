'use client';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Badge } from '@/components/ui/Badge';
import { Title } from '@/components/ui/Title';
import { AdvantagesItem } from './advantages/AdvantagesItem';
import { PlanningIcon, QualityIcon } from './advantages/AdvantagesIcons';
import { AdvantagesNumber } from './advantages/AdvantagesNumber';
import { SITE_CONFIG } from '@/config/site.config';

export function Advantages() {
	return (
		<section className="relative bg-white py-20 md:py-[100px] lg:py-[150px]">
			<HeaderThemeObserver theme="light" />
			<div className="container">
				{/* Heading */}
				<div className="mb-8 md:mb-10">
					<Badge variant="beige" className="mb-2.5 md:mb-3 leading-[1.4] font-normal">
						О компании
					</Badge>
					<Title as="h2" variant="h2">
						Преимущества работы с нами
					</Title>
				</div>

				{/* Content */}
				<div className="flex flex-col xl:flex-row gap-[30px] md:gap-10 lg:gap-5">
					{/* Left Column */}
					<div className="flex-1 md:basis-1/2 lg:pr-[25px]">
						<h1 className="text-main font-semibold text-base leading-[1.4] mb-[30px] md:mb-10 lg:mb-[30px]">
							КРОНА Групп специализируется на проектировании и строительстве домов из клееного
							бруса, предлагая комплексное решение для требовательных заказчиков
						</h1>

						{/* Bullets: Numbers */}
						<div className="flex flex-col md:flex-row border-y border-[#61413762] mb-5">
							{SITE_CONFIG.advantages.map((advantage) => (
								<AdvantagesNumber key={advantage.number} {...advantage} />
							))}
						</div>

						{/* Bullets: Icons */}
						<div className="flex flex-col lg:flex-row gap-5 px-[10px]">
							<AdvantagesItem icon={<PlanningIcon />}>
								Индивидуальный подход к планированию времени для работы с заказчиком
							</AdvantagesItem>
							<AdvantagesItem icon={<QualityIcon />}>
								Директор лично контролирует весь цикл строительства
							</AdvantagesItem>
						</div>
					</div>

					{/* Right Column */}
					<div className="flex-1 md:basis-1/2">
						<div className="space-y-5 text-main leading-relaxed">
							<p>
								<strong>
									Философия нашей компании – создаем архитектуру деревянных домов вне времени.
								</strong>
								Применяя архитектурный подход и индивидуальную работу с заказчиком, мы получаем дом,
								отвечающий всем требованиям и пожеланиям.
							</p>
							<p>
								«КРОНА» — это союз опытных архитекторов, дизайнеров, конструкторов и строителей,
								которые работают в единой команде для создания вашего идеального дома.
								Ответственность за результат несет единый подрядчик, автор и исполнитель в одном
								лице. Это позволяет быстро принимать решение, максимально кратким путем идти к
								результату, итогом которого станет Ваш дом. Мы уже 16 лет успешно выполняем
								строительство домов из клееного бруса в Новосибирске и регионах России и СНГ.
							</p>
							<p>
								Мы сопровождаем вас на каждом этапе — от эскизной идеи до ввода в эксплуатацию.
								Завод Кадрин наш партнер по производству клееного бруса и деревянных окон, является
								признанным лидером отрасли, входящим в Ассоциацию Деревянного Домостроения. Мы
								успешно сотрудничаем с 2009 года и реализовали большинство наших проектов: от
								частных резиденций до крупных корпоративных объектов.
							</p>
							<p>
								«КРОНА» бренд на рынке деревянного домостроения со своим уникальным строительным
								кодом и авторскими архитектурными решениями.
								<br />
								<strong>
									Если вы цените современный деревянный дом, будем рады с вами поработать!
								</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
