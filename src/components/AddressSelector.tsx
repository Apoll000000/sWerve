// components/AddressSelector.tsx
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME || ""; // or use process.env if not using Vite

interface GeoName {
  geonameId: number;
  name: string;
  adminCode1?: string;
}

export const AddressSelector: React.FC = () => {
  const [countries, setCountries] = useState<GeoName[]>([]);
  const [regions, setRegions] = useState<GeoName[]>([]);
  const [cities, setCities] = useState<GeoName[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Fetch countries
  useEffect(() => {
    fetch(`https://secure.geonames.org/countryInfoJSON?username=${GEONAMES_USERNAME}`)
      .then((res) => res.json())
      .then((data) => setCountries(data.geonames || []));
  }, []);

  // Fetch regions (admin divisions) when country changes
  useEffect(() => {
    if (!selectedCountry) return;
    fetch(`https://secure.geonames.org/childrenJSON?geonameId=${selectedCountry}&username=${GEONAMES_USERNAME}`)
      .then((res) => res.json())
      .then((data) => setRegions(data.geonames || []));
  }, [selectedCountry]);

  // Fetch cities when region changes
  useEffect(() => {
    if (!selectedRegion) return;
    fetch(`https://secure.geonames.org/childrenJSON?geonameId=${selectedRegion}&username=${GEONAMES_USERNAME}`)
      .then((res) => res.json())
      .then((data) => setCities(data.geonames || []));
  }, [selectedRegion]);

  return (
    <div className="space-y-4">
      {/* Country Dropdown */}
      <Select onValueChange={setSelectedCountry}>
        <SelectTrigger>
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.geonameId} value={country.geonameId.toString()}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Region Dropdown */}
      <Select onValueChange={setSelectedRegion} disabled={!regions.length}>
        <SelectTrigger>
          <SelectValue placeholder="Select Region/State" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.geonameId} value={region.geonameId.toString()}>
              {region.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City Dropdown */}
      <Select disabled={!cities.length}>
        <SelectTrigger>
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.geonameId} value={city.geonameId.toString()}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
