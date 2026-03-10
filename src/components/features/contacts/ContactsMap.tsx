'use client';

import { importLibrary } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

import { initGoogleMaps } from '@/lib/google-maps';

const MAP_OPTIONS = {
	center: {
		lat: 55.030596,
		lng: 82.895268
	},
	zoom: 16,
	mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
	disableDefaultUI: true,
	zoomControl: false,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false
};

export function ContactsMap() {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<google.maps.Map | null>(null);

	useEffect(() => {
		const initMap = async () => {
			// Initialize Google Maps options (only once)
			initGoogleMaps();

			try {
				const { Map, InfoWindow } = (await importLibrary('maps')) as google.maps.MapsLibrary;
				const { AdvancedMarkerElement } = (await importLibrary(
					'marker'
				)) as google.maps.MarkerLibrary;

				if (mapRef.current && !mapInstanceRef.current) {
					const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
					const options = { ...MAP_OPTIONS };
					if (isMobile) {
						options.zoom = 15;
					}

					const map = new Map(mapRef.current, options);
					mapInstanceRef.current = map;

					const markerImg = document.createElement('img');
					markerImg.src = '/images/marker.svg';
					// Standard size from other maps in the project
					markerImg.style.width = '37px';
					markerImg.style.height = '45px';

					const title = 'г. Новосибирск, Кубановская улица, 1/1, офис 206';

					const marker = new AdvancedMarkerElement({
						position: MAP_OPTIONS.center,
						content: markerImg,
						map: map,
						title: title
					});

					const infoWindow = new InfoWindow({
						content: `
							<div style="padding: 10px; padding-right: 25px;">
								<h5 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Крона Групп</h5>
								<p style="font-size: 14px;">${title}</p>
							</div>
						`
					});

					marker.addListener('gmp-click', () => {
						infoWindow.open(map, marker);
					});
				}
			} catch (e) {
				console.error('Error loading Google Maps:', e);
			}
		};

		initMap();
	}, []);

	return (
		<div
			ref={mapRef}
			className='h-87.5 w-full md:h-125 lg:h-187.5'
		>
			<HeaderThemeObserver theme='transparent' />
		</div>
	);
}
