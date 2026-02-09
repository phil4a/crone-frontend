'use client';

import { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { GEOGRAPHY_MARKERS } from '@/config/geography.data';

const MAP_OPTIONS = {
	center: { lat: 51.707835, lng: 81.504703 },
	zoom: 4,
	mapId: '7528d041054a80e2',
	disableDefaultUI: true,
	zoomControl: false,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false,
};

export function GeographyMap() {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<google.maps.Map | null>(null);

	useEffect(() => {
		const initMap = async () => {
			setOptions({
				key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
				v: 'weekly',
			});

			try {
				const { Map, InfoWindow } = (await importLibrary('maps')) as google.maps.MapsLibrary;
				const { AdvancedMarkerElement } = (await importLibrary(
					'marker',
				)) as google.maps.MarkerLibrary;

				if (mapRef.current && !mapInstanceRef.current) {
					// Mobile check for zoom (currently same as default, but keeping logic)
					const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
					const options = { ...MAP_OPTIONS };
					if (isMobile) {
						options.zoom = 4;
					}

					const map = new Map(mapRef.current, options);
					mapInstanceRef.current = map;

					let openInfoWindow: google.maps.InfoWindow | null = null;

					GEOGRAPHY_MARKERS.forEach((m) => {
						const markerImg = document.createElement('img');
						markerImg.src = '/images/marker.svg';
						markerImg.style.width = '37px';
						markerImg.style.height = '45px';

						const marker = new AdvancedMarkerElement({
							position: { lat: m.lat, lng: m.lng },
							content: markerImg,
							map: map,
							title: m.title,
						});

						const infoWindow = new InfoWindow({
							content: `
								<div style="padding: 0rem 1.625rem 0 .625rem;">
									<h5 class="h5 text-lg font-semibold mb-2">${m.title}</h5>
								</div>
							`,
							minWidth: 150,
						});

						marker.addListener('click', () => {
							if (openInfoWindow) {
								openInfoWindow.close();
							}
							infoWindow.open(map, marker);
							openInfoWindow = infoWindow;
						});
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
			className="w-full h-[350px] md:h-[500px] rounded-[20px] overflow-hidden bg-gray-100"
		/>
	);
}
