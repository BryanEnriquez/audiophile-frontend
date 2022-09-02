import headphones from '../public/images/shared/desktop/image-category-thumbnail-headphones.png';
import speakers from '../public/images/shared/desktop/image-category-thumbnail-speakers.png';
import earphones from '../public/images/shared/desktop/image-category-thumbnail-earphones.png';

export const navLinks = [
  { label: 'HOME', href: '/', thumbnail: '', top: '' },
  {
    label: 'HEADPHONES',
    href: '/headphones',
    thumbnail: headphones.src,
    top: '-2px',
  },
  { label: 'SPEAKERS', href: '/speakers', thumbnail: speakers.src, top: 0 },
  {
    label: 'EARPHONES',
    href: '/earphones',
    thumbnail: earphones.src,
    top: '7px',
  },
];
