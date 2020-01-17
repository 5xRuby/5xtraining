import React from 'react';
import SectionContainer from '@/components/SectionContainer';
import ImgWrapper from '@/components/imgWrapper';
import data from '@/assets/staticData/footer.json';

export default function Footer() {
  return (
    <>
      {data ? (
        <footer>
          <SectionContainer
            hasTitleUnderLine={false}
            isGrey
            className="py-5"
          >
            <div className="col-md-3 col-12">
              <div>
                <ImgWrapper
                  path="footer/"
                  imgClass="w-100per"
                  fileName="companysBtn.png"
                />
              </div>
              <div>
                <ImgWrapper
                  path="footer/"
                  fileName="cakeresume.png"
                />
              </div>
            </div>
            <div className="col-md-9 col-12">
              <div className="col-12">
                {data.nav.map((item) => (
                  <div className="my-1 mr-5 text-content font-size-2 d-inline-block">
                    {item.title}
                  </div>
                ))}
              </div>
              <div className="col-12 mt-4">
                <div className="row">
                  <div className="col-12 col-md-4 col-xl-3">
                    <div className="text-primary font-w-bold font-size-4">
                      {data.phone}
                    </div>
                    <div className="font-size-1">{data.openTime}</div>
                    <div />
                  </div>
                  <div className="col-12 col-md-8 col-xl-9 font-size-2">
                    <div>{data.question}</div>
                    <div>{data.email}</div>
                    <div>{data.address}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 text-center font-size-2 mt-5">
              <p>{data.copyright1}</p>
              <p>{data.copyright2}</p>
            </div>
          </SectionContainer>
        </footer>
      ) : (
        <footer>loading</footer>
      )}
    </>
  );
}
