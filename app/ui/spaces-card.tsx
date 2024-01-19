"use client"
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from 'next/link';

const supabaseUrl = "https://gqfjcwerdsrxisvccceu.supabase.co"
const supabaseKey = "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY"
const supabase = createClient(supabaseUrl, supabaseKey);


interface VenueData {
  id: number;
  name: string;
  description: string;
  location: { type: string; coordinates: [number, number] };
  capacity: number;
  image: string;
}

const MapComponent: React.FC<{ location: [number, number] }> = ({ location }) => {
  const mapElementId = "map";
  const leafletMapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove(); // Remove existing map
        leafletMapInstance.current = null;
      }

      const L = await import("leaflet");
  

      leafletMapInstance.current = L.map(mapElementId).setView(location, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        leafletMapInstance.current
      );
    };

    initializeMap();
  }, [location]);

  return <div id={mapElementId} style={{ height: "300px", marginBottom: "10px" }}></div>;
};

const Card: React.FC = () => {
  const [venueData, setVenueData] = useState<VenueData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Insert and retrieve data from Supabase
      const { data: insertedData, error: insertError } = await supabase
        .from<VenueData>("venues")
        .upsert([
          {
            id: 101,
            name: "XYZ-test Tech Workshop Hub",
            description:
              "A state-of-the-art venue dedicated to hosting workshops on technology and design for young adults.",
            location: {
              type: "Point",
              coordinates: [59.90745081898589, 10.75308994691147],
            },
            capacity: 100,
            image:
              "https://images.unsplash.com/photo-1557097217-bcffc79d6cb9?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ]);

      console.log("Inserted Data:", insertedData);

      if (insertError) {
        console.error("Error inserting venue:", insertError);
        throw insertError;
      }

      console.log("Venue inserted successfully:", insertedData);

      const { data: selectedData, error: selectError } = await supabase
        .from<VenueData>("venues")
        .select("*"); // Retrieve all columns

      if (selectError) {
        console.error("Error retrieving venue data:", selectError);
        throw selectError;
      }

      console.log("Venue data retrieved successfully:", selectedData);
      setVenueData(selectedData);
    } catch (error) {
      console.error("Error fetching venue data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {venueData && venueData.length > 0 ? (
        venueData
          .slice(1, 3)
          .map((venue, index) => (
            <div key={index} className="card w-96 glass">
              <figure>
                <img src={venue.image} alt="Venue" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{venue.name}</h2>
                <p>{venue.description}</p>
                <MapComponent location={venue.location.coordinates} />
                <p>Location: Oslo, Norway</p>
                <p>Capacity: {venue.capacity}</p>
                <div className="card-actions justify-end">
                  <Link href="/events" ><button className="btn btn-primary">Book Now</button></Link>
                </div>
              </div>
            </div>
          ))
      ) : (
        <p>No venue data available.</p>
      )}
    </>
  );
};

export default Card;