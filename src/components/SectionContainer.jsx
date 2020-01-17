import React from 'react';
import PropTypes from 'prop-types';

export default function SectionContainer(props) {
  const {
    isGrey = false,
    className = '',
    hasTitleUnderLine = true,
    title = '',
    children,
  } = props;
  return (
    <section
      className={`container-fluid pb-4 ${
        isGrey ? 'bg-grey' : null
      } ${className || ''}`}
    >
      {title ? (
        <div className={`${hasTitleUnderLine ? 'py-5' : 'pt-5'}`}>
          <h3 className="font-size-5 text-center">{title}</h3>
          {hasTitleUnderLine ? (
            <div className="titleUnderLine text-center mx-auto bg-primary mt-4" />
          ) : null}
        </div>
      ) : null}
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10">
          <div className="row">{children}</div>
        </div>
      </div>
    </section>
  );
}

SectionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  isGrey: PropTypes.bool.isRequired,
  hasTitleUnderLine: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
