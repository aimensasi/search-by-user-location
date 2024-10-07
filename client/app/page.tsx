'use client'
import { CountryUserMap } from '@/components/country-user-map';
import { useAuth } from './hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { countries, getCoordinates, getLocationFromCountryName } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useSearch } from './hooks/useSearch';
import { Button } from '@/components/ui/button';


const Home = () => {
  const { handleLogout } = useAuth();
  const { searchByLocation, error: searchError } = useSearch();

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [userCount, setUserCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (selectedCountry) {
      const location = getLocationFromCountryName(selectedCountry)
      console.log("Selected country", selectedCountry, location)
      setIsLoading(true)
      setError(null)
      searchByLocation(location)
        .then((count: number) => {
          setUserCount(count)
          setIsLoading(false)
        })
        .catch((err: any) => {
          setError("Failed to fetch user count. Please try again.")
          setIsLoading(false)
        })
    }
  }, [selectedCountry])

  return (
    <div>
      <Card className="w-full w-3/5 mx-auto mt-4">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Country User Map</CardTitle>
              <CardDescription>Select a country to see its user count</CardDescription>
            </div>
            <div>
              <Button onClick={handleLogout}>Exit</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px] mb-4">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isLoading && <p>Loading...</p>}
          {error || searchError && <p className="text-red-500">{error || searchError}</p>}

          {!searchError && selectedCountry && userCount !== null && (
            <CountryUserMap selectedCountry={selectedCountry} userCount={userCount} coordinates={getCoordinates(selectedCountry)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

