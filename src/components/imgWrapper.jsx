import React from "react";
import PropTypes from "prop-types";
/**
 * @params {object} props - a object include some propertys
 *
 * {string} props.src - img src path relative to assets/img/.
 *
 * {string} props.alt - img alt
 *
 * @example
 *
 * 'if real pathof img is assets/img/header/1.jpg, then set src to header/1.jpg.'
 *
 * @return JSX.element(<img/>) which include correct img src
 */
export default function ImgWrapper(props) {
  const { alt, imgClass, fileName, path } = props;
  const [src, setSrc] = React.useState(null);
  React.useEffect(() => {
    const importSrc = async () => {
      await import(`@/assets/img/${path}${fileName}`)
        .then(imgModule => setSrc(imgModule.default))
        .catch(() => setSrc("wrong"));
    };
    importSrc();
  }, []);
  if (!src) {
    return (
      <span
        style={{ maxWidth: "100%", textAlign: "center" }}
        className={imgClass}
      >
        loading...
      </span>
    );
  } else if (src === "wrong") {
    <span
      style={{ maxWidth: "100%", textAlign: "center" }}
      className={imgClass}
    >
      抱歉，圖片出了點問題
    </span>;
  } else {
    return (
      <img
        style={{ height: "auto" ,verticalAlign:'middle'}}
        src={src}
        alt={alt}
        className={`mw-100per ${imgClass}`}
      />
    );
  }
}

ImgWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  imgClass: PropTypes.string,
  path: PropTypes.string,
  fileName: PropTypes.string
};
