import { createClient, type Photo } from 'pexels';

let _client: ReturnType<typeof createClient> | null = null;

function getClient(): ReturnType<typeof createClient> {
  if (!_client) {
    if (!process.env.PEXELS_API_KEY) {
      throw new Error('PEXELS_API_KEY is not configured');
    }
    _client = createClient(process.env.PEXELS_API_KEY);
  }
  return _client;
}

export type PexelsPhoto = {
  id: number;
  url: string;
  photographer: string;
  photographerUrl: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  alt: string | null;
};

type FetchOptions = {
  maxPhotos?: number;
  excludeIds?: string[];
};

/**
 * Fetch multiple photos from Pexels for evaluation
 */
export async function fetchBlogPhotosForEvaluation(
  searchTerms: string[],
  options: FetchOptions = {},
): Promise<{ photos: PexelsPhoto[]; error?: string }> {
  const { maxPhotos = 5, excludeIds = [] } = options;

  try {
    const client = getClient();
    // Try each search term until we get enough photos
    const allPhotos: PexelsPhoto[] = [];

    for (const term of searchTerms) {
      if (allPhotos.length >= maxPhotos) break;

      const response = await client.photos.search({
        query: term,
        per_page: 10,
        orientation: 'landscape',
      });

      if ('photos' in response) {
        const newPhotos = response.photos
          .filter((photo) => !excludeIds.includes(String(photo.id)))
          .map(mapPexelsPhoto);

        allPhotos.push(...newPhotos);
      }
    }

    // Return unique photos up to maxPhotos
    const uniquePhotos = allPhotos.filter(
      (photo, index, self) =>
        self.findIndex((p) => p.id === photo.id) === index,
    );

    return { photos: uniquePhotos.slice(0, maxPhotos) };
  } catch (error) {
    console.error('Pexels API error:', error);
    return {
      photos: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch a single photo by ID
 */
export async function fetchPhotoById(
  id: number,
): Promise<PexelsPhoto | null> {
  try {
    const client = getClient();
    const response = await client.photos.show({ id });

    if ('id' in response) {
      return mapPexelsPhoto(response);
    }

    return null;
  } catch (error) {
    console.error('Pexels API error:', error);
    return null;
  }
}

/**
 * Map Pexels API response to our format
 */
function mapPexelsPhoto(photo: Photo): PexelsPhoto {
  return {
    id: photo.id,
    url: photo.url,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    src: {
      original: photo.src.original,
      large2x: photo.src.large2x,
      large: photo.src.large,
      medium: photo.src.medium,
      small: photo.src.small,
    },
    alt: photo.alt,
  };
}

/**
 * Download image as buffer for uploading to Sanity
 */
export async function downloadImageAsBuffer(
  imageUrl: string,
): Promise<Buffer> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
