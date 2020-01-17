import React from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '@/components/SectionContainer';
import About5RubyCard from '@/components/index/about5RubyCard';
import HotClassRecommendCard from '@/components/index/hotClassRecommendCard';
import ShowCaseCard from '@/components/index/showCaseCard';
import data from '@/assets/staticData/index.json';
import ImgWrapper from '@/components/imgWrapper';
import Carousel from '@/components/carouselContainer';

export default function Index() {
  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <section>
          <Carousel itemKeyClass="bannerCarousel" pointBottom={20}>
            {data.carousel.map((item) => (
              <Link to={item.to} key={item.fileName} className="d-block">
                <ImgWrapper
                  fileName={item.fileName}
                  imgClass="w-100per"
                  path="index/carousel/"
                />
              </Link>
            ))}
          </Carousel>
          <SectionContainer title={data.sections[0].title} isGrey>
            {data.sections[0].cards.map((card) => (
              <About5RubyCard
                title={card.title}
                content={card.content}
                fileName={card.fileName}
                title2={card.title2}
                key={card.fileName}
                cardClass="col-sm-12 col-md-3 col-lg-3"
              />
            ))}
          </SectionContainer>
          <SectionContainer title={data.sections[1].title}>
            {data.sections[1].cards.map((card) => (
              <HotClassRecommendCard
                title={card.title}
                content={card.content}
                imgSrc={card.imgSrc}
                date={card.date}
                hours={card.hours}
                statusIndex={card.statusIndex}
                authorIndex={card.authorIndex}
                fileName={card.fileName}
                cardClass="col-sm-12 col-md-4 pb-4"
                key={card.fileName}
              />
            ))}
            <div className="col-12 text-center my-4">
              <Link
                to="/"
                className="d-inline-block py-3 px-5 bg-primary text-white normal-radius font-size-4"
              >
                看更多網頁課程
              </Link>
            </div>
          </SectionContainer>
          <>
            <SectionContainer title={data.sections[2].title} isGrey />
            <Carousel
              hasArrow={false}
              itemKeyClass="classRecommendCarousel"
              containerClass="bg-grey pb-5"
              pointBottom={20}
            >
              {data.sections[2].cards.map((item) => (
                <div key={item.fileName} className="container-fluid bg-grey">
                  <div className="row">
                    <div className="col-12 no-gutters d-flex j-c-c">
                      <div className="classRecommend__img d-inline-block mr-3 col-2 col-sm-2 col-md-2 col-lg-1 col-xl-2">
                        <ImgWrapper
                          fileName={item.fileName}
                          path="index/classRecommend/"
                          imgClass="d-block classRecommend__img mx-auto"
                        />
                      </div>
                      <div className="col-sm-8  col-lg-6 no-gutters d-inline-block">
                        <div>{item.content}</div>
                        <div className="text-primary font-size-5 mt-3">
                          {item.authorName}
                        </div>
                        <div>{item.job}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </>
          <SectionContainer title={data.sections[3].title}>
            {data.sections[3].cards.map((card) => (
              <ShowCaseCard
                title={card.title}
                content={card.content}
                fileName={card.fileName}
                cardClass="col-sm-12 col-md-4 pt-4 "
                key={card.fileName}
              />
            ))}
            <div className="col-12 text-right mt-3">
              <Link className="text-primary" to="/">
                ...看更多案例
              </Link>
            </div>
          </SectionContainer>
          <SectionContainer
            title={data.sections[4].title}
            hasTitleUnderLine={false}
          >
            <div className="col-12 text-center my-4 font-size-4 knowMore_content">
              {data.sections[4].content1}
              <br />
              {data.sections[4].content2}
            </div>
            <div className="col-12 text-center">
              <ImgWrapper
                path="index/knowMore/"
                imgClass="mx-4"
                fileName="icon-fb.png"
              />
              <ImgWrapper
                path="index/knowMore/"
                imgClass="mx-4"
                fileName="icon-twitter.png"
              />
            </div>
          </SectionContainer>
        </section>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
