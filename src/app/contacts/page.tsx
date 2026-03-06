import { Metadata } from 'next';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { ContactsInfo } from '@/components/features/contacts/ContactsInfo';
import { ContactsMap } from '@/components/features/contacts/ContactsMap';

export const metadata: Metadata = {
	title: 'Контакты',
	description: 'Контактная информация строительной компании Crone Group'
};

export default function ContactsPage() {
	return (
		<main>
			<ContactsInfo />
			<ContactsMap />
			<FeedbackForm />
		</main>
	);
}
