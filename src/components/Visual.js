import { BtSlidePrev, BtSlideNext } from "../components/ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../styles/visual.css";
import { useEffect, useRef, useState } from "react";
// axiois 모듈(js. 파일) 가져오기
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea } from "./layout/layout";

function Visual() {
  // js 코드 자리
  // JSX 에 작성된 html 태그를 React 에서 참조
  // 1. swiper 슬라이드 태그를 참조
  const swiperRef = useRef();

  // 외부 데이터 연동 (axios 활용)
  const axiosGetData = function () {
    axios
      .get("visual.json")
      .then(function (res) {
        console.log(res.data);
        makeVisualSlide(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 외부 데이터 연동 (fetch 활용)
  const fetchGetData = () => {
    fetch("visual.json")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        //자료 출력
        makeVisualSlide(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // visual 슬라이드 내용 채우는 기능
  // 리액트용 변수 : 컴포넌트 출력할 JSX
  // 일반 변수 아닌 리액트용 변수를 state 라고 함
  let [visualHtml, setVisualHtml] = useState([]);

  const makeVisualSlide = (_data) => {
    const visualRes = _data;
    // console.log(visualRes);
    // for(초기값; 조건식; 증감식) {
    //   할일
    // };
    let visualArray = [];
    for (let i = 0; i < visualRes.total; i++) {
      // console.log("visual_" + (i + 1));
      visualArray[i] = visualRes["visual_" + (i + 1)];
    }
    // // console.log(visualArray);
    setVisualHtml(visualArray);
    // // 배열 자료(VisualArray) 를 뜯어서 컴포넌트 담기
    // let slideArray = [];
    // for (let i = 0; i < visualRes.total; i++) {
    //   slideArray[i] = <SwiperSlide></SwiperSlide>;
    // }
    // console.log(slideArray);
  };

  // 컴포넌트가 랜더링 되면 (화면이 보이면)
  // 데이터 호출 및 배치
  useEffect(() => {
    // 랜더링될 때
    // visual.json 데이터 불러들이기 기능 실행
    axiosGetData();
    // fetchGetData();
    return () => {
      // 삭제될 때 (Clean Up 함수)
    };
  }, []);
  // useEffect 가 하는 작업
  // 1. 네트워크 생성, 외부데이터 부름
  // 2. html 제어할 때
  // 3. window 제어할 때
  // 4. window.addEventLitener 작성할 때
  // 5. window.removeEventListner 작성할 때
  // 6. 컴포넌트가 삭제될 때

  const SectionTag = styled.section`
    position: relative;
    padding-top: 30px;
    padding-bottom: 80px;
  `;

  const SlideItem = styled.div`
    position: relative;
    width: 628px;
  `;

  const SlideLink = styled.a`
    position: relative;
    width: 100%;
    display: block;
    overflow: hidden;
    border-radius: 13px;
  `;

  return (
    <SectionTag pt={30} pb={80}>
      <InnerArea style={{ height: 345 }}>
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="visual-slide"
        >
          {visualHtml.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <SlideItem>
                  <SlideLink href={item.url}>
                    <img
                      src={process.env.PUBLIC_URL + item.file}
                      alt={item.file}
                    />
                  </SlideLink>
                </SlideItem>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <BtSlidePrev
          onClick={() => {
            swiperRef.current.slidePrev();
          }}
        ></BtSlidePrev>

        <BtSlideNext
          onClick={() => {
            swiperRef.current.slideNext();
          }}
        ></BtSlideNext>
      </InnerArea>
    </SectionTag>
  );
}

export default Visual;
