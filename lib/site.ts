// Single source of truth for business data (NAP must match Google Business Profile exactly).
export const site = {
  // Primary host configured in Vercel (apex redirects to www).
  url: 'https://www.kingprofessionalwelding.com',
  name: 'The King of Professional Welding',
  phoneDisplay: '832-732-7616',
  phoneE164: '+18327327616',
  whatsapp: '18327327616',
  email: 'Thekingofprofessionalwelding@gmail.com',
  address: {
    street: '21126 Terrace View Dr',
    city: 'Katy',
    region: 'TX',
    regionName: 'Texas',
    postalCode: '77449',
    country: 'US',
  },
  hours: '7 AM – 7 PM',
  // Google Business Profile (share link supplied by the owner) and its knowledge-graph id.
  googleProfile: 'https://share.google/l5OmoyoyysSBlC4Nw',
  googleKgUrl: 'https://www.google.com/search?kgmid=/g/11_1rp9tks',
  // Verified from the live profile (Place ID decodes to Maps feature 0x9c12d5d08fa343f:0x9afd88a001f5d896).
  googlePlaceId: 'ChIJPzT6CF0twQkRltj1AaCI_Zo',
  googleMapsCid: 'https://maps.google.com/?cid=11168232871757731990',
  googleWriteReview: 'https://search.google.com/local/writereview?placeid=ChIJPzT6CF0twQkRltj1AaCI_Zo',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The%20King%20of%20Professional%20Welding%2C%2021126%20Terrace%20View%20Dr%2C%20Katy%2C%20TX%2077449',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61596812430047',
    instagram: 'https://www.instagram.com/kingweldingkaty/',
    tiktok: 'https://www.tiktok.com/@kingweldingkaty',
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
export const whatsappUrl = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
