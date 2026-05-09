"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { Ambulance, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrafficStore } from "@/store/traffic-store";
import { trafficColor } from "@/lib/utils";
import type { Junction, TrafficRoute } from "@/types/traffic";

function routePath(route: TrafficRoute, width = 100, height = 100) {
  const lngs = route.coordinates.map((point) => point.lng);
  const lats = route.coordinates.map((point) => point.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  return route.coordinates
    .map((point, index) => {
      const x = ((point.lng - minLng) / Math.max(maxLng - minLng, 0.001)) * (width - 14) + 7;
      const y = height - (((point.lat - minLat) / Math.max(maxLat - minLat, 0.001)) * (height - 14) + 7);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function MapFallback({
  junctions,
  routes,
  onSelect,
}: {
  junctions: Junction[];
  routes: TrafficRoute[];
  onSelect: (id: string) => void;
}) {
  const positions = useMemo(
    () => [
      { left: "64%", top: "38%" },
      { left: "50%", top: "57%" },
      { left: "32%", top: "32%" },
      { left: "78%", top: "25%" },
      { left: "25%", top: "66%" },
    ],
    [],
  );

  return (
    <div className="relative h-full min-h-[620px] overflow-hidden rounded-lg border border-cyan-300/15 bg-slate-950">
      <div className="absolute inset-0 bg-city-grid bg-[length:56px_56px] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(19,247,255,0.18),transparent_35%),linear-gradient(120deg,rgba(40,125,255,0.12),transparent_45%,rgba(49,255,156,0.08))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {routes.map((route) => (
          <path
            key={route.id}
            d={routePath(route)}
            fill="none"
            stroke={trafficColor(route.level)}
            strokeDasharray="10 7"
            strokeWidth={route.level === "emergency" ? 1.4 : 0.75}
            className="animate-pulse-route drop-shadow-[0_0_8px_currentColor]"
          />
        ))}
      </svg>
      {junctions.map((junction, index) => (
        <button
          key={junction.id}
          type="button"
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={positions[index]}
          onClick={() => onSelect(junction.id)}
          title={junction.name}
        >
          <span
            className="traffic-marker relative block"
            style={{ color: trafficColor(junction.trafficLevel), backgroundColor: trafficColor(junction.trafficLevel) }}
          />
          <span className="mt-2 block rounded border border-cyan-300/20 bg-slate-950/70 px-2 py-1 text-xs text-cyan-50 backdrop-blur">
            {junction.id.toUpperCase()}
          </span>
        </button>
      ))}
      <motion.div
        className="absolute left-[24%] top-[66%] z-20 text-cyber-blue"
        animate={{ left: ["24%", "33%", "50%", "64%"], top: ["66%", "42%", "57%", "38%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Ambulance className="h-8 w-8 drop-shadow-[0_0_14px_rgba(40,125,255,0.95)]" />
      </motion.div>
      <div className="absolute bottom-4 left-4 rounded-md border border-cyan-300/20 bg-slate-950/65 p-3 text-xs text-cyan-100 backdrop-blur">
        Mapbox token not configured. Showing SmartFlow holographic city twin.
      </div>
    </div>
  );
}

export function SmartCityMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const junctions = useTrafficStore((state) => state.junctions);
  const routes = useTrafficStore((state) => state.routes);
  const center = useTrafficStore((state) => state.center);
  const setSelectedJunction = useTrafficStore((state) => state.setSelectedJunction);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !mapContainer.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [center.lng, center.lat],
      zoom: 12.7,
      pitch: 58,
      bearing: -18,
    });
    mapRef.current = map;
    map.on("load", () => setMapReady(true));
    return () => map.remove();
  }, [center.lat, center.lng, token]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    const markers: mapboxgl.Marker[] = junctions.map((junction) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "traffic-marker";
      el.style.color = trafficColor(junction.trafficLevel);
      el.style.backgroundColor = trafficColor(junction.trafficLevel);
      el.addEventListener("click", () => setSelectedJunction(junction.id));
      return new mapboxgl.Marker(el).setLngLat([junction.coordinates.lng, junction.coordinates.lat]).addTo(map);
    });
    routes.forEach((route) => {
      const sourceId = `${route.id}-source`;
      const layerId = `${route.id}-layer`;
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route.coordinates.map((point) => [point.lng, point.lat]),
          },
        },
      });
      map.addLayer({
        id: layerId,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": trafficColor(route.level),
          "line-width": route.level === "emergency" ? 7 : 4,
          "line-opacity": route.level === "emergency" ? 0.9 : 0.65,
          "line-blur": route.level === "emergency" ? 2 : 1,
        },
      });
    });
    return () => markers.forEach((marker) => marker.remove());
  }, [junctions, mapReady, routes, setSelectedJunction]);

  if (!token) {
    return <MapFallback junctions={junctions} routes={routes} onSelect={setSelectedJunction} />;
  }

  return (
    <div className="relative h-full min-h-[620px] overflow-hidden rounded-lg border border-cyan-300/15">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.2),rgba(3,7,18,0.75))]" />
      <Button className="absolute right-4 top-4" size="sm" variant="outline">
        <LocateFixed className="h-4 w-4" />
        Live Twin
      </Button>
    </div>
  );
}
