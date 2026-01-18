import { groq } from 'next-sanity';

// Blog queries
export const postsQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    body,
    author->{
      _id,
      name,
      image,
      bio,
      twitter
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    seo,
    generationMeta
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && status == "published"] {
    "slug": slug.current
  }
`;

// Check if topic already exists
export const topicExistsQuery = groq`
  count(*[_type == "post" && generationMeta.topic == $topic]) > 0
`;

// Get all covered topics for deduplication
export const coveredTopicsQuery = groq`
  *[_type == "post" && defined(generationMeta.topic)].generationMeta.topic
`;

// Get used Pexels photo IDs
export const usedPexelsIdsQuery = groq`
  *[_type == "post" && defined(generationMeta.pexelsPhotoId)].generationMeta.pexelsPhotoId
`;

// Category queries
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`;

// Author queries
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio,
    twitter,
    website
  }
`;

// Project queries
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    iconBg,
    image,
    logo,
    screenshots,
    status,
    category,
    url,
    githubUrl,
    appStoreUrl,
    playStoreUrl,
    technologies,
    features,
    metrics,
    role,
    problem,
    solution,
    featured,
    order
  }
`;

export const publishedAppsQuery = groq`
  *[_type == "project" && (defined(appStoreUrl) || defined(playStoreUrl))] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    iconBg,
    logo,
    status,
    appStoreUrl,
    playStoreUrl,
    technologies,
    metrics
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    image,
    logo,
    status,
    url,
    technologies
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    iconBg,
    image,
    logo,
    screenshots,
    status,
    category,
    url,
    githubUrl,
    appStoreUrl,
    playStoreUrl,
    technologies,
    features,
    metrics,
    role,
    problem,
    solution
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project"] {
    "slug": slug.current
  }
`;

// Book queries
export const booksQuery = groq`
  *[_type == "book" && status == "finished"] | order(order asc, finishedAt desc) {
    _id,
    title,
    author,
    cover,
    status,
    rating,
    takeaway,
    review,
    goodreadsUrl,
    amazonUrl,
    finishedAt,
    category,
    favorite
  }
`;

export const currentlyReadingQuery = groq`
  *[_type == "book" && status == "currently-reading"] | order(order asc) {
    _id,
    title,
    author,
    cover,
    goodreadsUrl
  }
`;

export const favoritesBooksQuery = groq`
  *[_type == "book" && favorite == true] | order(order asc) {
    _id,
    title,
    author,
    cover,
    rating,
    takeaway,
    goodreadsUrl
  }
`;

// Equipment queries
export const equipmentQuery = groq`
  *[_type == "equipment"] | order(category asc, order asc) {
    _id,
    name,
    description,
    image,
    category,
    url,
    affiliateUrl
  }
`;

export const equipmentByCategoryQuery = groq`
  *[_type == "equipment" && category == $category] | order(order asc) {
    _id,
    name,
    description,
    image,
    url,
    affiliateUrl
  }
`;

// Photo queries
export const photosQuery = groq`
  *[_type == "photo"] | order(order asc) {
    _id,
    title,
    image,
    alt,
    location,
    takenAt,
    camera,
    category,
    featured
  }
`;

export const featuredPhotosQuery = groq`
  *[_type == "photo" && featured == true] | order(order asc) {
    _id,
    title,
    image,
    alt,
    location
  }
`;

export const photosByCategoryQuery = groq`
  *[_type == "photo" && category == $category] | order(order asc) {
    _id,
    title,
    image,
    alt,
    location,
    takenAt,
    camera
  }
`;
