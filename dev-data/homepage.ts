import type { HomepageAttributes } from '../pages';

export const homepage: HomepageAttributes = {
  // salesPitch: {
  //   text: 'Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.',
  //   heading: 'Bringing you the best audio gear',
  // },
  about:
    "Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.",
  hero: {
    id: 1,
    heading: 'XX99 Mark II Headphones',
    description:
      'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.',
    product: {
      data: {
        id: 6,
        attributes: {
          slug: 'xx99-mark-two-headphones',
          new: true,
        },
      },
    },
    images: {
      id: 37,
      s: {
        data: {
          id: 117,
          attributes: {
            url: '/uploads/image_header_8ea042cf58.jpg',
          },
        },
      },
      m: {
        data: {
          id: 118,
          attributes: {
            url: '/uploads/image_header_6a1c5b1982.jpg',
          },
        },
      },
      l: {
        data: {
          id: 119,
          attributes: {
            url: '/uploads/image_hero_5a6455cc0d.jpg',
          },
        },
      },
    },
  },
  featured1: {
    id: 2,
    heading: 'ZX9 speaker',
    description:
      'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
    product: {
      data: {
        id: 3,
        attributes: {
          slug: 'zx9-speaker',
          new: true,
        },
      },
    },
    images: {
      id: 38,
      s: {
        data: {
          id: 120,
          attributes: {
            url: '/uploads/image_speaker_zx9_74a4abca08.png',
          },
        },
      },
      m: {
        data: {
          id: 121,
          attributes: {
            url: '/uploads/image_speaker_zx9_b43bc58515.png',
          },
        },
      },
      l: {
        data: {
          id: 122,
          attributes: {
            url: '/uploads/image_speaker_zx9_9cba817f71.png',
          },
        },
      },
    },
  },
  featured2: {
    id: 3,
    heading: 'ZX7 speaker',
    description: null,
    product: {
      data: {
        id: 2,
        attributes: {
          slug: 'zx7-speaker',
          new: false,
        },
      },
    },
    images: {
      id: 39,
      s: {
        data: {
          id: 123,
          attributes: {
            url: '/uploads/image_speaker_zx7_61f4f3cd83.jpg',
          },
        },
      },
      m: {
        data: {
          id: 124,
          attributes: {
            url: '/uploads/image_speaker_zx7_39106b05bf.jpg',
          },
        },
      },
      l: {
        data: {
          id: 125,
          attributes: {
            url: '/uploads/image_speaker_zx7_a5a1de73f8.jpg',
          },
        },
      },
    },
  },
  featured3: {
    id: 4,
    heading: 'YX1 earphones',
    description: null,
    product: {
      data: {
        id: 1,
        attributes: {
          slug: 'yx1-earphones',
          new: true,
        },
      },
    },
    images: {
      id: 40,
      s: {
        data: {
          id: 126,
          attributes: {
            url: '/uploads/image_earphones_yx1_e2a6feff58.jpg',
          },
        },
      },
      m: {
        data: {
          id: 127,
          attributes: {
            url: '/uploads/image_earphones_yx1_e763034f57.jpg',
          },
        },
      },
      l: {
        data: {
          id: 128,
          attributes: {
            url: '/uploads/image_earphones_yx1_361f843711.jpg',
          },
        },
      },
    },
  },
};
