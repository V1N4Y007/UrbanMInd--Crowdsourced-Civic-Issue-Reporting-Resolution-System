import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';

const MapView = () => {
    const [popupInfo, setPopupInfo] = useState(null);

    // Mock issues
    const issues = [
        { id: 1, title: 'Pothole', lat: 40.7128, lng: -74.0060, status: 'pending' },
        { id: 2, title: 'Streetlight', lat: 40.7150, lng: -74.0020, status: 'resolved' },
        { id: 3, title: 'Garbage', lat: 40.7100, lng: -74.0090, status: 'in_progress' },
    ];

    const mapStyle = {
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap Contributors',
                maxzoom: 19
            }
        },
        layers: [
            {
                id: 'osm',
                type: 'raster',
                source: 'osm'
            }
        ]
    };

    return (
        <div className="h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative">
            <Map
                mapLib={maplibregl}
                initialViewState={{
                    longitude: -74.0060,
                    latitude: 40.7128,
                    zoom: 13
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {issues.map((issue) => (
                    <Marker
                        key={issue.id}
                        longitude={issue.lng}
                        latitude={issue.lat}
                        anchor="bottom"
                        onClick={e => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(issue);
                        }}
                    >
                        <MapPin
                            className={`w-8 h-8 ${issue.status === 'resolved' ? 'text-green-500' :
                                issue.status === 'pending' ? 'text-orange-500' : 'text-blue-500'
                                } drop-shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                        />
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={popupInfo.lng}
                        latitude={popupInfo.lat}
                        onClose={() => setPopupInfo(null)}
                        className="text-black"
                    >
                        <div className="p-2">
                            <h3 className="font-bold">{popupInfo.title}</h3>
                            <p className="text-sm capitalize text-gray-600">{popupInfo.status.replace('_', ' ')}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default MapView;
