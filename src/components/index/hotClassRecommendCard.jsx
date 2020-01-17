import React from 'react';
import PropTypes from 'prop-types';
import ImgWrapper from '@/components/imgWrapper';

const status = {
  open: '已確定開課',
  none: '',
};
const authors = {
  1: '高見龍 (Eddie Kao)',
  2: '蘇泰安 (Taian Su)',
  3: '李建杭 (Amos Lee)',
};

export default function hotClassRecommendCard(props) {
  const {
    title = '',
    content = '',
    date = '',
    hours = '',
    statusIndex = 0,
    authorIndex = 0,
    fileName = '',
    cardClass = '',
  } = props;
  return (
    <div className={cardClass}>
      <div className="card-border h-100per">
        <ImgWrapper
          fileName={fileName}
          path="index/hotClass/"
          imgClass="hotClassRecommend__img"
        />
        <h4 className="px-3 py-2 font-w-bold font-size-4">{title}</h4>
        <div className="px-3">
          {statusIndex !== 'none' ? (
            <div className="d-inline-block px-2 bg-yellow text-info normal-radius font-size-1 mr-2">
              {status[statusIndex]}
            </div>
          ) : null}
          <div className="d-inline-block font-size-1 text-info pr-3">
            {date}
          </div>
        </div>
        <div className="font-size-2 my-3 text-title px-3 overflow-h hotClass__content">
          <p>{content}</p>
        </div>
        <div className="font-size-1 text-info mb-1 px-3">
          講者：
          {' '}
          {authors[authorIndex]}
          {' '}
| 時數：
          {' '}
          {hours}
          {' '}
小時
        </div>
      </div>
    </div>
  );
}

hotClassRecommendCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
  statusIndex: PropTypes.string.isRequired,
  authorIndex: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
};
