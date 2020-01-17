import React from 'react';
import PropTypes from 'prop-types';
import ImgWrapper from '@/components/imgWrapper';

export default function about5RubyCard(props) {
  const {
    title = '', content = '', cardClass = '', fileName = '', title2 = '',
  } = props;
  return (
    <div className={`text-center ${cardClass}`}>
      <div className="aboutCard__img mx-auto">
        <ImgWrapper fileName={fileName} path="index/about/" alt={title} />
      </div>
      <div className="font-size-5 text-title pt-3 ">
        {title}
        <br />
        {title2}
      </div>
      <div className="py-3 text-content ">
        <p>{content}</p>
      </div>
    </div>
  );
}

about5RubyCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
};
