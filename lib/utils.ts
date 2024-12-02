import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAnimalImage(species: string, id: string): string {
  // Use appropriate image APIs based on species
  switch (species.toLowerCase()) {
    case 'dog':
      return `https://placedog.net/400/300?id=${id}`;
    case 'cat':
      return `https://placekitten.com/400/300?image=${Number(id) % 16}`; // placekitten has 16 images
    case 'bird':
      return 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=300&fit=crop';
    case 'rabbit':
      return 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop';
    case 'hamster':
      return 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop';
    case 'turtle':
      return 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop';
    case 'fish':
      return 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=400&h=300&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop';
  }
}

export function getPersonImage(id: string): string {
  // Alternate between male and female portraits for variety
  const gender = Number(id) % 2 === 0 ? 'men' : 'women';
  const portraitId = Number(id) % 99; // randomuser has 99 portraits per gender
  return `https://randomuser.me/api/portraits/${gender}/${portraitId}.jpg`;
}

export function getAnimalThumbnail(species: string, id: string): string {
  // Similar to getAnimalImage but with smaller dimensions
  switch (species.toLowerCase()) {
    case 'dog':
      return `https://placedog.net/64/64?id=${id}`;
    case 'cat':
      return `https://placekitten.com/64/64?image=${Number(id) % 16}`;
    case 'bird':
      return 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=64&h=64&fit=crop';
    case 'rabbit':
      return 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=64&h=64&fit=crop';
    case 'hamster':
      return 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=64&h=64&fit=crop';
    case 'turtle':
      return 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=64&h=64&fit=crop';
    case 'fish':
      return 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=64&h=64&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=64&h=64&fit=crop';
  }
}
