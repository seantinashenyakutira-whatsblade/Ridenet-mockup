"use client"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

// Fix Default Icon
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export default function MapView({ fromLat, fromLng, toLat, toLng }: { fromLat?: number, fromLng?: number, toLat?: number, toLng?: number }) {
    useEffect(() => {
        // any manual config
    }, []);

    const defaultCenter: [number, number] = [-15.3875, 28.3228]; // Lusaka
    const fPos: [number, number] | null = fromLat && fromLng ? [fromLat, fromLng] : null;
    const tPos: [number, number] | null = toLat && toLng ? [toLat, toLng] : null;

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-border">
            <MapContainer center={fPos || defaultCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {fPos && (
                    <Marker position={fPos} icon={icon}>
                        <Popup>From Location</Popup>
                    </Marker>
                )}
                {tPos && (
                    <Marker position={tPos} icon={icon}>
                        <Popup>To Location</Popup>
                    </Marker>
                )}
                {fPos && tPos && (
                    <Polyline positions={[fPos, tPos]} color="blue" weight={4} opacity={0.7} />
                )}
            </MapContainer>
        </div>
    )
}
