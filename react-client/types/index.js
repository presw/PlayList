import PropTypes from 'prop-types';

const games = PropTypes.shape({
  id: PropTypes.number,
  owned: PropTypes.bool,
  category: PropTypes.number,
  series: {
    id: PropTypes.number,
    name: PropTypes.string,
  },
  cover: {
    id: PropTypes.number,
    image_id: PropTypes.string,
  },
  name: PropTypes.string,
  platforms: [
    {
      id: PropTypes.number,
      abbreviation: PropTypes.string,
    },
  ],
  screenshots: [
    {
      id: PropTypes.number,
      image_id: PropTypes.string,
    },
  ],
  artwork: [
    {
      id: PropTypes.number,
      image_id: PropTypes.string,
    },
  ],
  slug: PropTypes.string,
  summary: PropTypes.string,
  total_rating: PropTypes.number,
  version_parent: {
    id: PropTypes.number,
    summary: PropTypes.string,
  },
  websites: [
    {
      id: PropTypes.number,
      url: PropTypes.string,
    },
  ],
}).isRequired;

export default games;
