import { setOptions } from '@googlemaps/js-api-loader';

let isInitialized = false;

export const initGoogleMaps = () => {
	if (!isInitialized) {
		setOptions({
			key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
			v: 'weekly'
		});
		isInitialized = true;
	}
};
