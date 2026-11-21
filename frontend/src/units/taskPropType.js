import PropTypes from "prop-types";

export const taskPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
  priority: PropTypes.string,
  projectId: PropTypes.number,
  project: PropTypes.shape({ id: PropTypes.number.isRequired }),
});
