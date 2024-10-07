"use client"

import { Annotation, ComposableMap, Geographies, Geography } from "react-simple-maps";

interface CountryUserMapProps {
  selectedCountry: string;
  userCount: number;
  coordinates: [number, number];
}

export function CountryUserMap({ selectedCountry, userCount, coordinates }: CountryUserMapProps) {
  return (
    <div>
      <p className="mb-4">
        User count in {selectedCountry}: <strong>{userCount.toLocaleString()}</strong>
      </p>
      <ComposableMap>
        <Geographies geography="/map-feature.json">
          {({ geographies }: any) =>
            geographies.map((geo: any) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        <Annotation
          subject={coordinates}
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
        >
          <g>
            <rect
              x="-110"
              y="-15"
              width="100"
              height="30"
              fill="white"
              stroke="#F53"
              strokeWidth="1"
              rx="5"
              ry="5"
            />
            <text
              x="-60"
              y="0"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#F53"
              fontSize="12"
            >
              {userCount.toLocaleString()}
            </text>
          </g>
        </Annotation>
      </ComposableMap>
    </div>
  )
}
