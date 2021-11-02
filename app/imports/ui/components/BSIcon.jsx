import React from 'react';
import PropTypes from 'prop-types';

/** Renders a Bootstrap Icon */
const BSIcon = ({ icon }) => (
  <svg width={icon.width} height={icon.height} fill="currentColor" class="bi" viewBox={`0 0 ${icon.width} ${icon.height}`}>
    <use xlinkHref={`/images/bootstrap-icons.svg#${icon.name}`} />
  </svg>
);

// Require a document to be passed to this component.
BSIcon.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default BSIcon;