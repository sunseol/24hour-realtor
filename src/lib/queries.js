export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    "icon": icon.asset->url,
    colorClass
  }
`;

export const listingsQuery = `
  *[_type == "listing"] | order(_createdAt desc) {
    _id,
    title,
    type,
    price,
    specs,
    tags,
    address,
    floor,
    built,
    description,
    features,
    "image": mainImage.asset->url,
    "images": images[].asset->url,
    gradientClass
  }
`;

export const listingByIdQuery = `
  *[_type == "listing" && _id == $id][0] {
    _id,
    title,
    type,
    price,
    specs,
    tags,
    address,
    floor,
    built,
    description,
    features,
    "image": mainImage.asset->url,
    "images": images[].asset->url,
    gradientClass
  }
`;

export const companyInfoQuery = `
  *[_type == "companyInfo"][0] {
    companyName,
    companyNameEn,
    phone,
    email,
    address,
    businessHours
  }
`;

export const legalPageQuery = `
  *[_type == "legalPage" && pageType == $pageType][0] {
    title,
    lastUpdated,
    content
  }
`;
