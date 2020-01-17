import React from 'react';
import useStatewithCB from '@/utils/useStatewithCB';
import '@/assets/style/components/carouselContainer.scss';

export default function CarouselCotainer(props) {
  const {
    formFeedSecond = 5,
    children,
    hasArrow = true,
    itemKeyClass = '',
    containerClass = '',
    arrowLeft = 0,
    pointBottom = 0,
  } = props;
  const refs = React.useRef({
    nowIndex: null,
    second: formFeedSecond,
    isPause: false,
    items: null,
    maxIndex: null,
    isAutoDirectionRight: true,
  });
  const _refs = refs.current;
  const [nowIndex, setNowIndex] = useStatewithCB(0);
  _refs.nowIndex = nowIndex; // memorize nowIndex
  React.useEffect(() => {
    const runAutoRotate = () => {
      setTimeout(() => autoRotate(), _refs.second * 1000);
    };
    const autoRotate = () => {
      const cb = () => {
        rotate();
        runAutoRotate();
      };
      if (_refs.isPause) {
        return;
      }
      if (_refs.nowIndex >= _refs.maxIndex) {
        _refs.isAutoDirectionRight = false;
      } else if (_refs.nowIndex <= 0) {
        _refs.isAutoDirectionRight = true;
      }
      if (_refs.isAutoDirectionRight) {
        setNowIndex(_refs.nowIndex + 1, cb);
      } else {
        setNowIndex(_refs.nowIndex - 1, cb);
      }
    };
    _refs.items = document.querySelectorAll(`.${itemKeyClass}`);
    _refs.maxIndex = _refs.items.length - 1;
    runAutoRotate();
  }, []);
  const rotate = () => {
    _refs.items.forEach((item) => {
      item.style.transform = `translateX(${_refs.nowIndex * -100}%)`;
    });
  };
  const handleClick = (value) => {
    const cb = () => {
      _refs.isPause = true;
      rotate();
    };
    if (value === 'next') {
      if (_refs.nowIndex >= _refs.maxIndex) {
        return;
      }
      setNowIndex(_refs.nowIndex + 1, cb);
    } else if (value === 'prev') {
      if (_refs.nowIndex <= 0) {
        return;
      }
      setNowIndex(_refs.nowIndex - 1, cb);
    } else {
      setNowIndex(value, cb);
    }
  };

  return (
    <div className={`carouselCotainer position-r ${containerClass}`}>
      {hasArrow ? (
        <>
          <button
            className="arrowBtn arrowBtn--next position-a h-100per flex-center"
            style={{ right: arrowLeft || '0px' }}
            onClick={() => handleClick('next')}
          >
            &gt;
          </button>
          <button
            className="arrowBtn arrowBtn--prev position-a h-100per flex-center"
            style={{ left: arrowLeft || '0px' }}
            onClick={() => handleClick('prev')}
          >
            &lt;
          </button>
        </>
      ) : null}
      <div
        className="pointContainer flex-center position-a w-100per"
        style={{ bottom: pointBottom || '0px' }}
      >
        {children.map((child, index) => (
          <button
            className={`carouselPoint carouselPoint ${
              nowIndex === index ? 'carouselPoint--active' : ''
            }`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div
        className="carouselItemContainer"
        style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}
      >
        {children.map((item) => (
          <div
            style={{ transition: 'transform 1s', whiteSpace: 'normal' }}
            className={`carouselItem d-inline-block w-100per text-center ${itemKeyClass}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
