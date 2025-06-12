"use client";
import Head from "next/head";
import React from "react";

const ModernArtPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Modern Artistic Elements</title>
        <meta
          name="description"
          content="Next.js app showcasing modern art with hover animations"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="background-container">
        <div className="flowy-background"></div>
      </div>

      <main className="art-gallery">
        <h1 className="gallery-title">Hover Over the Elements</h1>

        <div className="art-grid">
          <div className="art-element-wrapper element-1-wrapper">
            <div className="art-element element-1">
              {/* Element 1: Pulsing Orb */}
              <div className="orb"></div>
            </div>
            <p className="element-label">Pulsing Orb</p>
          </div>

          <div className="art-element-wrapper element-2-wrapper">
            <div className="art-element element-2">
              {/* Element 2: Shifting Cubes */}
              <div className="cube-face cube-front"></div>
              <div className="cube-face cube-top"></div>
              <div className="cube-face cube-side"></div>
            </div>
            <p className="element-label">Shifting Cubes</p>
          </div>

          <div className="art-element-wrapper element-3-wrapper">
            <div className="art-element element-3">
              {/* Element 3: Kinetic Lines */}
              <div className="line line-1"></div>
              <div className="line line-2"></div>
              <div className="line line-3"></div>
              <div className="line line-4"></div>
            </div>
            <p className="element-label">Kinetic Lines</p>
          </div>

          <div className="art-element-wrapper element-4-wrapper">
            <div className="art-element element-4">
              {/* Element 4: Glitch Square */}
              <div className="glitch-base"></div>
            </div>
            <p className="element-label">Glitch Square</p>
          </div>

          <div className="art-element-wrapper element-5-wrapper">
            <div className="art-element element-5">
              {/* Element 5: Morphing Blob */}
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="blob-svg"
              >
                <path
                  fill="#FF0066"
                  d="M45.5,-54.7C59.8,-48.1,72.8,-36.5,77.2,-22.3C81.7,-8.1,77.6,8.7,70.1,23.2C62.6,37.7,51.7,49.9,38.8,58.3C25.9,66.7,10.9,71.3,-3.7,72.2C-18.3,73.1,-36.7,70.3,-49.8,60.7C-63,51.1,-71,34.7,-74.8,17.9C-78.6,1.1,-78.2,-16.2,-70.5,-29.5C-62.9,-42.8,-48.1,-52.1,-33.6,-58.5C-19.1,-64.9,-4.9,-68.4,8.6,-66.1C22.1,-63.7,44.2,-61.3,45.5,-54.7Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <p className="element-label">Morphing Blob</p>
          </div>

          <div className="art-element-wrapper element-6-wrapper">
            <div className="art-element element-6">
              {/* Element 6: Expanding Grid */}
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <p className="element-label">Expanding Grid</p>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .flowy-background {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            #ee7752,
            #e73c7e,
            #23a6d5,
            #23d5ab
          );
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }

        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .art-gallery {
          padding: 2rem;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-title {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 3rem;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }

        .art-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          justify-items: center;
          align-items: start;
          max-width: 1400px;
          margin: 0 auto;
        }

        .art-element-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          width: 100%;
          max-width: 400px;
        }

        .art-element {
          width: 100%;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          position: relative;
          overflow: hidden;
        }

        .art-element:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .element-label {
          margin-top: 1rem;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
        }

        /* Element 1: Pulsing Orb */
        .element-1 .orb {
          width: 120px;
          height: 120px;
          background-color: #ff69b4;
          border-radius: 50%;
          box-shadow: 0 0 30px #ff69b4, 0 0 60px #ff69b4;
          transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
        }

        /* Element 2: Shifting Cubes */
        .element-2 .cube-face {
          position: absolute;
          width: 100px;
          height: 100px;
          background-color: rgba(0, 255, 255, 0.7);
          border: 2px solid rgba(0, 200, 200, 1);
        }

        .element-3 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        /* Element 3: Kinetic Lines */
        .element-3 .line {
          width: 80%;
          height: 12px;
          background-color: #f0e68c;
          border-radius: 6px;
          margin: 15px 0;
        }

        /* Element 4: Glitch Square */
        .element-4 .glitch-base {
          width: 140px;
          height: 140px;
          background-color: #7fff00;
        }

        /* Element 5: Morphing Blob */
        .element-5 .blob-svg {
          width: 180px;
          height: 180px;
        }

        /* Element 6: Expanding Grid */
        .element-6 {
          width: 100%;
          height: 300px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 10px;
          place-items: center;
          justify-content: center;
          align-items: center;
        }

        /* Element 1: Pulsing Orb */
        .element-1-wrapper:hover .orb {
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }

        /* Element 2: Shifting Cubes */
        .element-2-wrapper:hover .cube-front {
          transform: translateZ(30px) rotateY(30deg) rotateX(-15deg)
            translateX(-10px);
        }
        .element-2-wrapper:hover .cube-top {
          transform: rotateX(70deg) translateZ(40px) translateY(10px);
        }
        .element-2-wrapper:hover .cube-side {
          transform: rotateY(70deg) translateZ(40px) translateX(10px);
        }

        /* Element 3: Kinetic Lines */
        .element-3-wrapper:hover .line-1 {
          transform: translateX(-15px) scaleX(0.8);
        }
        .element-3-wrapper:hover .line-2 {
          transform: translateX(10px) scaleX(1.1);
        }
        .element-3-wrapper:hover .line-3 {
          transform: translateX(-10px) scaleX(0.9);
        }
        .element-3-wrapper:hover .line-4 {
          transform: translateX(15px) scaleX(1.2);
        }

        /* Element 4: Glitch Square */
        .element-4-wrapper:hover .glitch-base {
          animation: glitch-anim 0.3s steps(2, end) infinite;
        }
        .element-4-wrapper:hover .glitch-base::before {
          animation: glitch-anim-before 0.3s steps(2, end) infinite;
          clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
          background-color: #ff00ff;
        }
        .element-4-wrapper:hover .glitch-base::after {
          animation: glitch-anim-after 0.3s steps(2, end) infinite;
          clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
          background-color: #00ffff;
        }
        @keyframes glitch-anim {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(5px, -5px);
          }
          50% {
            transform: translate(-5px, 5px);
          }
          75% {
            transform: translate(5px, 5px);
          }
          100% {
            transform: translate(-5px, -5px);
          }
        }
        @keyframes glitch-anim-before {
          0% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(-2px, 2px);
          }
        }
        @keyframes glitch-anim-after {
          0% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(2px, -2px);
          }
        }

        /* Element 5: Morphing Blob */
        .element-5-wrapper:hover .blob-svg {
          transform: scale(1.2) rotate(15deg);
          filter: hue-rotate(90deg) drop-shadow(0 0 10px #ff0066);
        }

        /* Element 6: Expanding Grid */
        .element-6-wrapper:hover .element-6 {
          gap: 20px;
        }
        .element-6-wrapper:hover .grid-cell {
          transform: scale(0.9) rotate(5deg);
          background-color: #ff8c00;
        }
        .element-6-wrapper:hover .grid-cell:nth-child(2) {
          transform: scale(0.9) rotate(-5deg);
        }
        .element-6-wrapper:hover .grid-cell:nth-child(3) {
          transform: scale(0.9) rotate(-5deg);
        }

        .grid-cell {
          width: 100px;
          height: 100px;
          background-color: #ff8c00;
          border-radius: 10px;
          transition: transform 0.3s ease-out, background-color 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ModernArtPage;
