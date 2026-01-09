import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import { servicesQuery, listingsQuery, listingByIdQuery, companyInfoQuery, legalPageQuery } from '../lib/queries';
import { defaultServices, defaultListings, defaultCompanyInfo } from '../data/defaults';

export function useSanityData(query, defaultData = [], params = {}) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(query, params);
        if (result && (Array.isArray(result) ? result.length > 0 : true)) {
          setData(result);
        }
      } catch (err) {
        console.log('Sanity fetch error, using default data:', err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}

export function useServices() {
  return useSanityData(servicesQuery, defaultServices);
}

export function useListings() {
  return useSanityData(listingsQuery, defaultListings);
}

export function useListing(id) {
  const { data, loading, error } = useSanityData(
    listingByIdQuery,
    null,
    { id }
  );
  
  if (!data && !loading) {
    const fallback = defaultListings.find(l => String(l._id) === String(id));
    return { data: fallback || null, loading, error };
  }
  
  return { data, loading, error };
}

export function useCompanyInfo() {
  return useSanityData(companyInfoQuery, defaultCompanyInfo);
}

export function useLegalPage(pageType) {
  return useSanityData(legalPageQuery, null, { pageType });
}
