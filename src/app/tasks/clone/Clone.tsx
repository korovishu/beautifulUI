"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Head from "next/head";
import {
  FiMenu,
  FiSearch,
  FiChevronDown,
  FiMoreHorizontal,
  FiX,
} from "react-icons/fi";
import { IoLanguage } from "react-icons/io5";

export default function WikipediaReplica() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContentsVisible, setIsContentsVisible] = useState(true);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [textSize, setTextSize] = useState("standard");
  const [width, setWidth] = useState("standard");
  const [colorTheme, setColorTheme] = useState("automatic");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleContents = () => {
    setIsContentsVisible(!isContentsVisible);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  useEffect(() => {
    // Apply text size
    let fontSize = "0.875rem";
    if (textSize === "small") fontSize = "0.8125rem";
    if (textSize === "large") fontSize = "1rem";
    document.documentElement.style.setProperty("--text-size", fontSize);

    // Apply width
    let contentWidth = "100%";
    if (width === "standard") contentWidth = "100%";
    if (width === "wide") contentWidth = "120%";
    document.documentElement.style.setProperty("--content-width", contentWidth);

    // Apply color theme
    let bgColor = "#ffffff";
    let textColor = "#202122";
    let linkColor = "#0645ad";
    let visitedColor = "#0b0080";

    if (colorTheme === "dark") {
      bgColor = "#222";
      textColor = "#ddd";
      linkColor = "#6699ff";
      visitedColor = "#99b3ff";
    }

    document.documentElement.style.setProperty("--bg-color", bgColor);
    document.documentElement.style.setProperty("--text-color", textColor);
    document.documentElement.style.setProperty("--link-color", linkColor);
    document.documentElement.style.setProperty("--visited-color", visitedColor);
  }, [textSize, width, colorTheme]);

  return (
    <>
      <Head>
        <title>Ancient Roman pottery - Wikipedia</title>
        <link
          rel="stylesheet"
          href="https://en.wikipedia.org/w/load.php?lang=en&modules=ext.cite.styles%7Cext.echo.styles.badge%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cjquery.makeCollapsible.styles%7Cskins.vector.styles.legacy%7Cwikibase.client.init&only=styles&skin=vector"
        />
      </Head>

      <div className="wikipedia-container">
        {isMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
          <nav
            className="sidebar-navigation"
            role="navigation"
            aria-label="Site navigation"
          >
            <div className="sidebar-section">
              <div className="sidebar-heading">Navigation</div>
              <ul>
                <li>
                  <a href="#" aria-label="Go to main page">
                    Main page
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Browse contents">
                    Contents
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="View current events">
                    Current events
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="View random article">
                    Random article
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="About Wikipedia">
                    About Wikipedia
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Contact us">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Donate to Wikipedia">
                    Donate
                  </a>
                </li>
              </ul>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-heading">Contribute</div>
              <ul>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Learn to edit</a>
                </li>
                <li>
                  <a href="#">Community portal</a>
                </li>
                <li>
                  <a href="#">Recent changes</a>
                </li>
                <li>
                  <a href="#">Upload file</a>
                </li>
              </ul>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-heading">Tools</div>
              <ul>
                <li>
                  <a href="#">What links here</a>
                </li>
                <li>
                  <a href="#">Related changes</a>
                </li>
                <li>
                  <a href="#">Special pages</a>
                </li>
                <li>
                  <a href="#">Permanent link</a>
                </li>
                <li>
                  <a href="#">Page information</a>
                </li>
                <li>
                  <a href="#">Cite this page</a>
                </li>
                <li>
                  <a href="#">Wikidata item</a>
                </li>
              </ul>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-heading">Print/export</div>
              <ul>
                <li>
                  <a href="#">Download as PDF</a>
                </li>
                <li>
                  <a href="#">Printable version</a>
                </li>
              </ul>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-heading">In other projects</div>
              <ul>
                <li>
                  <a href="#">Wikimedia Commons</a>
                </li>
                <li>
                  <a href="#">MediaWiki</a>
                </li>
                <li>
                  <a href="#">Meta-Wiki</a>
                </li>
                <li>
                  <a href="#">Wikispecies</a>
                </li>
                <li>
                  <a href="#">Wikibooks</a>
                </li>
                <li>
                  <a href="#">Wikidata</a>
                </li>
                <li>
                  <a href="#">Wikimania</a>
                </li>
              </ul>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-heading">Languages</div>
              <ul>
                <li>
                  <a href="#">Deutsch</a>
                </li>
                <li>
                  <a href="#">Español</a>
                </li>
                <li>
                  <a href="#">Français</a>
                </li>
                <li>
                  <a href="#">Italiano</a>
                </li>
                <li>
                  <a href="#">日本語</a>
                </li>
                <li>
                  <a href="#">Nederlands</a>
                </li>
                <li>
                  <a href="#">Polski</a>
                </li>
                <li>
                  <a href="#">Português</a>
                </li>
                <li>
                  <a href="#">Русский</a>
                </li>
                <li>
                  <a href="#">中文</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="main-content">
          <div className="mobile-header">
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <FiMenu />
            </button>
            <div className="mobile-logo">
              <img
                src="https://en.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en.svg"
                alt="Wikipedia"
              />
            </div>
            <button className="mobile-search-icon" aria-label="Search">
              <FiSearch />
            </button>
          </div>

          <header className="header">
            <div className="header-menu">
              <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <FiMenu />
              </button>
            </div>
            <div className="header-logo">
              <a href="#" aria-label="Wikipedia home">
                <img
                  src="https://en.wikipedia.org/static/images/project-logos/enwiki.png"
                  alt="Wikipedia logo"
                />
                <div className="header-logo-text">
                  <div className="header-logo-title">WIKIPEDIA</div>
                  <div className="header-logo-subtitle">
                    The Free Encyclopedia
                  </div>
                </div>
              </a>
            </div>
            <div className="header-search">
              <form onSubmit={handleSearch} role="search">
                <label htmlFor="search-input" className="sr-only">
                  Search Wikipedia
                </label>
                <input
                  id="search-input"
                  type="search"
                  name="search"
                  placeholder="Search Wikipedia"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search Wikipedia"
                />
                <button type="submit" aria-label="Search">
                  Search
                </button>
              </form>
            </div>
            <div className="header-user">
              <a href="#" aria-label="Donate to Wikipedia">
                Donate
              </a>
              <a href="#" aria-label="Create account">
                Create account
              </a>
              <a href="#" aria-label="Log in">
                Log in
              </a>
              <button className="more-menu" aria-label="More options">
                <FiMoreHorizontal />
              </button>
            </div>
          </header>

          <main className="article" role="main">
            <h1 className="firstHeading">Ancient Roman pottery</h1>

            <div
              className="language-button"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <IoLanguage />
              <span>8 languages</span>
              <FiChevronDown />

              {isLanguageDropdownOpen && (
                <div
                  className="language-dropdown"
                  role="menu"
                  aria-label="Language selection"
                >
                  <div className="language-dropdown-header">
                    <span>Languages</span>
                    <button
                      onClick={() => setIsLanguageDropdownOpen(false)}
                      aria-label="Close language menu"
                    >
                      <FiX />
                    </button>
                  </div>
                  <ul>
                    <li>
                      <a href="#" role="menuitem">
                        Deutsch
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Español
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Français
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Italiano
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Nederlands
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Polski
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Português
                      </a>
                    </li>
                    <li>
                      <a href="#" role="menuitem">
                        Русский
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <nav
              className="content-navigation"
              role="navigation"
              aria-label="Page actions"
            >
              <div className="namespaces">
                <ul>
                  <li className="selected">
                    <a href="#">Article</a>
                  </li>
                  <li>
                    <a href="#">Talk</a>
                  </li>
                </ul>
              </div>
              <div className="views">
                <ul>
                  <li className="selected">
                    <a href="#">Read</a>
                  </li>
                  <li>
                    <a href="#">Edit</a>
                  </li>
                  <li>
                    <a href="#">View history</a>
                  </li>
                  <li className="more-dropdown">
                    <a href="#" onClick={() => {}}>
                      Tools <FiChevronDown />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="appearance-menu">
                <button onClick={() => setIsAppearanceOpen(!isAppearanceOpen)}>
                  Appearance <FiChevronDown />
                </button>

                {isAppearanceOpen && (
                  <div className="appearance-dropdown">
                    <div className="appearance-section">
                      <h3>Text</h3>
                      <div className="appearance-options">
                        <label>
                          <input
                            type="radio"
                            name="text-size"
                            value="small"
                            checked={textSize === "small"}
                            onChange={() => setTextSize("small")}
                          />
                          <span>Small</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="text-size"
                            value="standard"
                            checked={textSize === "standard"}
                            onChange={() => setTextSize("standard")}
                          />
                          <span>Standard</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="text-size"
                            value="large"
                            checked={textSize === "large"}
                            onChange={() => setTextSize("large")}
                          />
                          <span>Large</span>
                        </label>
                      </div>
                    </div>

                    <div className="appearance-section">
                      <h3>Width</h3>
                      <div className="appearance-options">
                        <label>
                          <input
                            type="radio"
                            name="width"
                            value="standard"
                            checked={width === "standard"}
                            onChange={() => setWidth("standard")}
                          />
                          <span>Standard</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="width"
                            value="wide"
                            checked={width === "wide"}
                            onChange={() => setWidth("wide")}
                          />
                          <span>Wide</span>
                        </label>
                      </div>
                    </div>

                    <div className="appearance-section">
                      <h3>Color (beta)</h3>
                      <div className="appearance-options">
                        <label>
                          <input
                            type="radio"
                            name="color-theme"
                            value="automatic"
                            checked={colorTheme === "automatic"}
                            onChange={() => setColorTheme("automatic")}
                          />
                          <span>Automatic</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="color-theme"
                            value="light"
                            checked={colorTheme === "light"}
                            onChange={() => setColorTheme("light")}
                          />
                          <span>Light</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="color-theme"
                            value="dark"
                            checked={colorTheme === "dark"}
                            onChange={() => setColorTheme("dark")}
                          />
                          <span>Dark</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="article-info">
              From Wikipedia, the free encyclopedia
            </div>

            <div className="article-content">
              <nav
                className={`contents ${isContentsVisible ? "" : "collapsed"}`}
                aria-label="Table of contents"
              >
                <div className="contents-header" onClick={toggleContents}>
                  <span>Contents</span>
                  <button
                    className="hide-button"
                    aria-label={
                      isContentsVisible
                        ? "Hide table of contents"
                        : "Show table of contents"
                    }
                    aria-expanded={isContentsVisible}
                  >
                    [{isContentsVisible ? "hide" : "show"}]
                  </button>
                </div>
                {isContentsVisible && (
                  <ol>
                    <li>
                      <span>1</span>
                      <a href="#top">Top</a>
                    </li>
                    <li>
                      <span>2</span>
                      <a href="#fine-wares">Fine wares</a>
                      <ol>
                        <li>
                          <span>2.1</span>
                          <a href="#terra-sigillata">
                            Terra sigillata or red-gloss wares
                          </a>
                        </li>
                        <li>
                          <span>2.2</span>
                          <a href="#other-fine-wares">Other fine wares</a>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <span>3</span>
                      <a href="#coarse-wares">Coarse wares</a>
                      <ol>
                        <li>
                          <span>3.1</span>
                          <a href="#cooking-pots">Cooking pots</a>
                        </li>
                        <li>
                          <span>3.2</span>
                          <a href="#mortaria">Mortaria</a>
                        </li>
                        <li>
                          <span>3.3</span>
                          <a href="#amphorae">Amphorae</a>
                        </li>
                        <li>
                          <span>3.4</span>
                          <a href="#description">Description and function</a>
                        </li>
                        <li>
                          <span>3.5</span>
                          <a href="#studies">Studies on amphorae</a>
                        </li>
                        <li>
                          <span>3.6</span>
                          <a href="#production">Production</a>
                        </li>
                        <li>
                          <span>3.7</span>
                          <a href="#history">History</a>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <span>4</span>
                      <a href="#other-ceramics">Other ceramics</a>
                      <ol>
                        <li>
                          <span>4.1</span>
                          <a href="#lamps">Lamps</a>
                        </li>
                        <li>
                          <span>4.2</span>
                          <a href="#terracotta">Terracotta figurines</a>
                        </li>
                        <li>
                          <span>4.3</span>
                          <a href="#architectural">
                            Brick and other architectural ceramics
                          </a>
                        </li>
                        <li>
                          <span>4.4</span>
                          <a href="#gallery">Gallery</a>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <span>5</span>
                      <a href="#notes">Notes</a>
                    </li>
                    <li>
                      <span>6</span>
                      <a href="#references">References</a>
                    </li>
                    <li>
                      <span>7</span>
                      <a href="#further-reading">Further reading</a>
                    </li>
                    <li>
                      <span>8</span>
                      <a href="#external-links">External links</a>
                    </li>
                  </ol>
                )}
              </nav>

              <div className="main-article-content">
                <p>
                  <b>Pottery</b> was produced in{" "}
                  <a href="#">enormous quantities</a> in{" "}
                  <a href="#">ancient Rome</a>, mostly for utilitarian purposes.
                  It is found all over the former <a href="#">Roman Empire</a>{" "}
                  and beyond. <a href="#">Monte Testaccio</a> is a huge{" "}
                  <a href="#">waste mound</a> in Rome made almost entirely of
                  broken <a href="#">amphorae</a> used for transporting and
                  storing liquids and other products – in this case probably
                  mostly Spanish olive oil, which was landed nearby, and was the
                  main fuel for lighting, as well as its use in the kitchen and
                  washing in the <a href="#">baths</a>.
                </p>

                <div className="infobox">
                  <div className="infobox-image">
                    <img
                      src="https://gcp-la8-storage-cdn.lot-art.com/public/upl/65/Ancient-Roman-terra-sigillata-Bowl-with-decoration-in-relief-Probably-from-southern-Gaul_1619859378_7983.jpg"
                      alt="Ancient Roman pottery bowl"
                    />
                    <div className="infobox-caption">
                      Decorated <i>terra sigillata</i> bowl from Gaul (
                      <a href="#">Metz</a> in France)
                    </div>
                  </div>
                </div>

                <p>
                  It is usual to divide Roman domestic pottery broadly into
                  coarse wares and fine wares, the former being the everyday
                  pottery jars, dishes and bowls that were used for cooking or
                  the storage and transport of foods and other goods, and are
                  usually made of coarser and more absorbent fabric. Fine wares
                  were serving vessels or tableware used for more formal dining,
                  and are usually made at specialized pottery workshops, and
                  were often traded over substantial distances, not only within,
                  but also between, different provinces of the Roman Empire. For
                  example, dozens of different types of <a href="#">British</a>{" "}
                  coarse and fine wares were produced locally
                  <sup>
                    <a href="#cite_note-1">[1]</a>
                  </sup>{" "}
                  yet many other classes of pottery were also imported from
                  elsewhere in the Empire. The manufacture of fine wares such as{" "}
                  <a href="#">terra sigillata</a> took place in large workshop
                  complexes that were organized along industrial lines and
                  produced highly standardized products that tend themselves
                  well to precise and systematic <a href="#">classification</a>.
                </p>

                <div className="thumb tright">
                  <div className="thumbinner">
                    <img
                      src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/240017/538615/main-image"
                      alt="Ancient pottery flask"
                      className="thumbimage"
                    />
                    <div className="thumbcaption">
                      Unusually ambitious <a href="#">Samian ware</a> flask from
                      Southern Gaul around 100 AD. <a href="#">Heracles</a> is
                      being <a href="#">Licomedon</a>.
                    </div>
                  </div>
                </div>

                <p>
                  There is no direct Roman equivalent to the artistically
                  central <a href="#">vase-painting</a> of{" "}
                  <a href="#">ancient Greece</a>, and few objects of outstanding
                  artistic interest.
                  <sup>
                    <a href="#cite_note-2">[2]</a>
                  </sup>{" "}
                  have survived, but there is a great deal of fine tableware,
                  and many small figures, often incorporated into oil lamps or
                  similar objects, and often with religious or erotic themes.
                  Roman burial customs varied over time and space, so vessels
                  deposited as <a href="#">grave goods</a>, the usual source of
                  complete ancient pottery vessels, are not always abundant,
                  though all Roman sites produce plenty of broken pottery,
                  giving good evidence for the types in use. &ldquo;Fine&rdquo;
                  rather than luxury pottery is the main strength of Roman
                  pottery, and the highest quality pottery,{" "}
                  <a href="#">Roman glass</a>, which the elite often used
                  alongside gold or silver tableware, and which could be
                  extremely extravagant and expensive. It is clear from the
                  quantities found that fine pottery was used very widely in
                  both social and geographic terms. The more expensive pottery
                  tended to use <a href="#">relief</a> decoration, usually
                  moulded, rather than colour, and often copied shapes and
                  decoration from the more prestigious metalwork. Especially in
                  the Eastern Empire, local traditions continued, hybridizing
                  with Roman styles to varying extents. From the 3rd century the
                  quality of fine pottery steadily declined, partly because of
                  economic and political disturbances, and because glassware was
                  replacing pottery for drinking cups (the rich had always
                  preferred it).
                </p>

                <p>
                  Fired clay or <a href="#">terracotta</a> was also widely
                  employed in the Roman period for architectural purposes, as
                  structural bricks and tiles, and occasionally as architectural
                  decoration, and for the manufacture of small statuettes and
                  lamps. These are not normally classified under the heading
                  &lsquo;pottery&rsquo; by archaeologists, but the terracottas
                  and lamps will be included in this article.
                </p>

                <p>
                  Pottery is a key material in the dating and interpretation of
                  archaeological sites from the Neolithic period onwards, and
                  has been minutely studied by archaeologists for generations.
                  In the Roman period, ceramics were produced and used in
                  enormous quantities, and the literature on the subject, in
                  numerous languages, is very extensive.
                </p>

                <h2 id="fine-wares">Fine wares</h2>
                <h3 id="terra-sigillata">Terra sigillata or red-gloss wares</h3>
                <p>
                  <a href="#">Terra sigillata</a> is a class of fine red-gloss
                  pottery mass-produced in standardized shapes and decorated
                  with moulded relief scenes. The decoration typically depicts
                  scenes from classical mythology, or sometimes gladiatorial
                  combats or erotic scenes. The main centers of production were
                  in Italy and southern Gaul, though it was produced throughout
                  the Roman Empire.
                </p>

                <p>
                  The Italian sigillata industry was started by immigrant
                  potters from the eastern Mediterranean, where there was a long
                  tradition of mould-made pottery. The earliest and
                  highest-quality Italian products, Arretine ware from Arezzo,
                  were shipped throughout the Empire, but gradually provincial
                  centers of production grew up, and Italian exports declined.
                  The Gaulish industries, particularly those of{" "}
                  <a href="#">La Graufesenque</a> near Millau and{" "}
                  <a href="#">Lezoux</a>, flourished in the 1st and 2nd
                  centuries AD.
                </p>

                <div className="thumb tright">
                  <div className="thumbinner">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/TerraSigillataRGM.jpeg/330px-TerraSigillataRGM.jpeg"
                      alt="Terra sigillata pottery"
                      className="thumbimage"
                    />
                    <div className="thumbcaption">
                      Terra sigillata pottery with characteristic red-gloss
                      finish and relief decoration.
                    </div>
                  </div>
                </div>

                <h3 id="other-fine-wares">Other fine wares</h3>
                <p>
                  A wide range of fine wares were produced throughout the Roman
                  period. These include:
                </p>
                <ul>
                  <li>
                    <b>Black-gloss ware</b>: A predecessor to terra sigillata,
                    produced in Italy from the 4th to 1st centuries BC.
                  </li>
                  <li>
                    <b>Thin-walled pottery</b>: Delicate beakers and cups with
                    walls as thin as 1.5 mm, often with barbotine (slip-trailed)
                    decoration.
                  </li>
                  <li>
                    <b>Colour-coated wares</b>: Various regional fine wares with
                    colored slips, including the Rhenish wares of Germany and
                    Nene Valley wares of Britain.
                  </li>
                  <li>
                    <b>African Red Slip ware</b>: Produced in North Africa from
                    the 1st to 7th centuries AD, eventually replacing terra
                    sigillata as the Empire&rsquo;s main fine tableware.
                  </li>
                </ul>

                <h2 id="coarse-wares">Coarse wares</h2>
                <p>
                  Coarse wares were used for cooking, storage, and transport.
                  They were typically made locally and were rarely traded over
                  long distances. The fabric is usually rough and contains
                  visible inclusions like sand or crushed rock.
                </p>

                <div className="thumb tright">
                  <div className="thumbinner">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMc28Ys2tobkPyqjTlVad6cDZ2ZXcwjiAUQ&s"
                      alt="Roman coarse ware pottery"
                      className="thumbimage"
                    />
                    <div className="thumbcaption">
                      Examples of Roman coarse ware pottery used for everyday
                      cooking and storage.
                    </div>
                  </div>
                </div>

                <h3 id="cooking-pots">Cooking pots</h3>
                <p>
                  Roman cooking pots were usually round-bottomed vessels made of
                  coarse, heat-resistant clay. They often show signs of burning
                  or sooting from use over fires. Common forms include
                  casseroles, deep pots for boiling, and shallow pans for
                  frying.
                </p>

                <h3 id="mortaria">Mortaria</h3>
                <p>
                  <a href="#">Mortaria</a> were heavy mixing bowls with a gritty
                  interior surface used for grinding and mixing foods. They
                  often have a spout for pouring and a distinctive rim profile.
                  Stamps on mortaria sometimes identify the potter.
                </p>

                <h3 id="amphorae">Amphorae</h3>
                <p>
                  <a href="#">Amphorae</a> were large storage and transport
                  vessels, particularly for liquids like wine, olive oil, and
                  fish sauce (garum). Different regions produced distinctive
                  amphora shapes specialized for particular products.
                </p>

                <h3 id="description">Description and function</h3>
                <p>
                  Amphorae were the standard shipping containers of the Roman
                  world, used to transport liquids and semi-liquids in bulk.
                  They had a characteristic two-handled design and were often
                  sealed with clay or cork stoppers, sometimes covered with
                  pozzolanic cement. Inscriptions on amphorae, known as tituli
                  picti, often indicated their contents, origin, or the names of
                  merchants involved in their trade.
                </p>

                <h2 id="references">References</h2>
                <div className="references">
                  <ol>
                    <li id="cite_note-1">
                      <span className="mw-cite-backlink">
                        <a href="#">^</a>
                      </span>{" "}
                      <span className="reference-text">
                        Swan, V.G. (1980). <i>Pottery in Roman Britain</i>.
                        Shire Archaeology. pp. 23–45.
                      </span>
                    </li>
                    <li id="cite_note-2">
                      <span className="mw-cite-backlink">
                        <a href="#">^</a>
                      </span>{" "}
                      <span className="reference-text">
                        Hayes, J.W. (1997).{" "}
                        <i>Handbook of Mediterranean Roman Pottery</i>.
                        University of Oklahoma Press. pp. 112–114.
                      </span>
                    </li>
                  </ol>
                </div>

                <h2 id="further-reading">Further reading</h2>
                <ul className="further-reading">
                  <li>
                    Peacock, D.P.S. (1982).{" "}
                    <i>
                      Pottery in the Roman World: an ethnoarchaeological
                      approach
                    </i>
                    . London: Longman.
                  </li>
                  <li>
                    Webster, P. (1996). <i>Roman Samian Pottery in Britain</i>.
                    York: Council for British Archaeology.
                  </li>
                  <li>
                    Fulford, M. and Wallace-Hadrill, A. (1999). &ldquo;Towards a
                    history of pre-Roman Pompeii: excavations beneath the House
                    of Amarantus (1995-8)&rdquo;.{" "}
                    <i>Papers of the British School at Rome</i> 67: 37-144.
                  </li>
                </ul>

                <h2 id="external-links">External links</h2>
                <ul className="external-links">
                  <li>
                    <a className="external" href="#">
                      Potsherd: Atlas of Roman Pottery
                    </a>
                  </li>
                  <li>
                    <a className="external" href="#">
                      Ceramics in the Roman World
                    </a>
                  </li>
                  <li>
                    <a className="external" href="#">
                      Roman Pottery Database
                    </a>
                  </li>
                </ul>

                <div className="categories">
                  <div className="catlinks">
                    Categories:{" "}
                    <ul>
                      <li>
                        <a href="#">Ancient Roman pottery</a>
                      </li>
                      <li>
                        <a href="#">Roman Empire</a>
                      </li>
                      <li>
                        <a href="#">Archaeological artifacts</a>
                      </li>
                      <li>
                        <a href="#">Ceramic art</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <div className="footer">
            <div className="footer-info">
              <p>This page was last edited on 13 May 2025, at 15:12 (UTC).</p>
              <p>
                Text is available under the{" "}
                <a href="#">
                  Creative Commons Attribution-ShareAlike License 3.0
                </a>
                ; additional terms may apply. By using this site, you agree to
                the <a href="#">Terms of Use</a> and{" "}
                <a href="#">Privacy Policy</a>. Wikipedia® is a registered
                trademark of the <a href="#">Wikimedia Foundation, Inc.</a>, a
                non-profit organization.
              </p>
            </div>
            <div className="footer-places">
              <ul>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">About Wikipedia</a>
                </li>
                <li>
                  <a href="#">Disclaimers</a>
                </li>
                <li>
                  <a href="#">Contact Wikipedia</a>
                </li>
                <li>
                  <a href="#">Mobile view</a>
                </li>
                <li>
                  <a href="#">Developers</a>
                </li>
                <li>
                  <a href="#">Statistics</a>
                </li>
                <li>
                  <a href="#">Cookie statement</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* CSS Variables for theme control */
        :root {
          --text-size: 0.875rem;
          --content-width: 100%;
          --bg-color: #ffffff;
          --text-color: #202122;
          --link-color: #0645ad;
          --visited-color: #0b0080;
        }

        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Screen reader only text for accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Mobile overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: none;
        }

        @media (max-width: 850px) {
          .mobile-overlay {
            display: block;
          }
        }

        /* Wikipedia fonts */
        @font-face {
          font-family: "Linux Libertine";
          src: url("https://en.wikipedia.org/static/fonts/linux-libertine/LinLibertine_RZ.woff")
            format("woff");
        }

        .wikipedia-container {
          font-family: sans-serif;
          font-size: var(--text-size);
          line-height: 1.6;
          color: var(--text-color);
          display: flex;
          background-color: var(--bg-color);
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Sidebar styles */
        .sidebar {
          width: 176px;
          background-color: #f8f9fa;
          padding: 1.25rem 0.75rem;
          border-right: 1px solid #a7d7f9;
          height: auto;
          position: relative;
          flex-shrink: 0;
          z-index: 100;
        }

        .logo {
          margin-bottom: 1rem;
          text-align: center;
        }

        .logo img {
          width: 135px;
          height: auto;
        }

        .sidebar-navigation {
          font-size: 0.75rem;
        }

        .sidebar-section {
          margin-bottom: 1.5rem;
        }

        .sidebar-heading {
          color: #54595d;
          font-weight: normal;
          border-bottom: 1px solid #c8ccd1;
          margin-bottom: 0.25rem;
          padding-bottom: 0.125rem;
        }

        .sidebar-navigation ul {
          list-style: none;
        }

        .sidebar-navigation li {
          padding: 0.125rem 0;
        }

        .sidebar-navigation a {
          color: var(--link-color);
          text-decoration: none;
        }

        .sidebar-navigation a:hover {
          text-decoration: underline;
        }

        .sidebar-navigation a:visited {
          color: var(--visited-color);
        }

        /* Main content styles */
        .main-content {
          flex: 1;
          max-width: calc(100% - 176px);
        }

        /* Header styles */
        .header {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #a7d7f9;
        }

        .header-menu {
          display: flex;
          align-items: center;
        }

        .menu-toggle {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          color: #54595d;
        }

        .header-logo {
          display: flex;
          align-items: center;
          margin-right: 1rem;
        }

        .header-logo a {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .header-logo img {
          height: 3rem;
          margin-right: 0.5rem;
        }

        .header-logo-text {
          display: flex;
          flex-direction: column;
        }

        .header-logo-title {
          font-family: "Linux Libertine", Georgia, Times, serif;
          font-size: 1.5rem;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .header-logo-subtitle {
          font-size: 0.75rem;
          color: #54595d;
        }

        .header-search {
          flex: 1;
          max-width: 600px;
          margin: 0 1rem;
        }

        .header-search form {
          display: flex;
        }

        .header-search input {
          flex: 1;
          height: 2.25rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid #a2a9b1;
          border-radius: 2px 0 0 2px;
          font-size: 0.875rem;
        }

        .header-search button {
          height: 2.25rem;
          padding: 0 0.75rem;
          background-color: #f8f9fa;
          border: 1px solid #a2a9b1;
          border-left: none;
          border-radius: 0 2px 2px 0;
          cursor: pointer;
        }

        .header-user {
          display: flex;
          align-items: center;
        }

        .header-user a {
          margin-left: 1rem;
          color: var(--link-color);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .header-user a:hover {
          text-decoration: underline;
        }

        .more-menu {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          margin-left: 0.5rem;
          color: #54595d;
        }

        .mobile-header {
          display: none;
        }

        /* Content navigation styles */
        .content-navigation {
          display: flex;
          border-bottom: 1px solid #a7d7f9;
          background-color: #f6f6f6;
          font-size: 0.75rem;
          padding: 0 1rem;
          position: relative;
        }

        .namespaces,
        .views {
          display: flex;
        }

        .namespaces ul,
        .views ul {
          list-style: none;
          display: flex;
        }

        .namespaces li,
        .views li {
          margin-right: 0.5rem;
        }

        .namespaces a,
        .views a {
          display: block;
          padding: 0.5rem 0.75rem;
          color: var(--link-color);
          text-decoration: none;
        }

        .namespaces a:hover,
        .views a:hover {
          text-decoration: underline;
        }

        .namespaces .selected a,
        .views .selected a {
          color: #222;
          font-weight: bold;
          background-color: white;
          border: 1px solid #a7d7f9;
          border-bottom: 1px solid white;
        }

        .views {
          margin-left: auto;
        }

        .appearance-menu {
          margin-left: 1rem;
          position: relative;
        }

        .appearance-menu button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .appearance-menu button svg {
          margin-left: 0.25rem;
        }

        .appearance-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 200px;
          background-color: white;
          border: 1px solid #a7d7f9;
          border-top: none;
          padding: 0.5rem;
          z-index: 10;
        }

        .appearance-section {
          margin-bottom: 1rem;
        }

        .appearance-section h3 {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .appearance-options {
          display: flex;
          flex-direction: column;
        }

        .appearance-options label {
          display: flex;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .appearance-options input {
          margin-right: 0.5rem;
        }

        /* Language button styles */
        .language-button {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          display: flex;
          align-items: center;
          background-color: #f8f9fa;
          border: 1px solid #a7d7f9;
          border-radius: 2px;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          cursor: pointer;
          z-index: 5;
        }

        .language-button svg {
          margin-right: 0.25rem;
        }

        .language-button span {
          margin: 0 0.25rem;
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 200px;
          background-color: white;
          border: 1px solid #a7d7f9;
          border-radius: 2px;
          margin-top: 0.25rem;
          z-index: 10;
        }

        .language-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          border-bottom: 1px solid #a7d7f9;
        }

        .language-dropdown-header button {
          background: none;
          border: none;
          cursor: pointer;
        }

        .language-dropdown ul {
          list-style: none;
          max-height: 300px;
          overflow-y: auto;
        }

        .language-dropdown li {
          padding: 0.25rem 0.5rem;
        }

        .language-dropdown a {
          color: var(--link-color);
          text-decoration: none;
          display: block;
        }

        .language-dropdown a:hover {
          text-decoration: underline;
        }

        /* Article styles */
        .article {
          padding: 1rem 1.5rem;
          background-color: var(--bg-color);
          border-left: 1px solid #a7d7f9;
          border-bottom: 1px solid #a7d7f9;
          min-height: calc(100vh - 5rem);
          position: relative;
        }

        .firstHeading {
          font-family: "Linux Libertine", Georgia, Times, serif;
          font-size: 1.8rem;
          font-weight: normal;
          border-bottom: 1px solid #a2a9b1;
          margin-bottom: 0.25rem;
          padding-bottom: 0.125rem;
          overflow-wrap: break-word;
          color: var(--text-color);
        }

        .article-info {
          color: #54595d;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        /* Contents styles */
        .contents {
          display: table;
          border: 1px solid #a2a9b1;
          background-color: #f8f9fa;
          padding: 0.5rem;
          margin: 1rem 0 2rem 0; /* Increased bottom margin */
          font-size: 0.875rem;
          float: left;
          clear: right;
          width: auto;
          min-width: 15rem;
          margin-right: 2rem; /* Added right margin */
        }

        .contents.collapsed {
          padding-bottom: 0;
        }

        .contents-header {
          text-align: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }

        .hide-button {
          color: var(--link-color);
          cursor: pointer;
          margin-left: 0.25rem;
          background: none;
          border: none;
          font-size: inherit;
          font-family: inherit;
          padding: 0;
        }

        .hide-button:hover {
          text-decoration: underline;
        }

        .hide-button:focus {
          outline: 2px solid var(--link-color);
          outline-offset: 2px;
        }

        .contents ul {
          list-style: none;
          margin-left: 1rem;
        }

        .contents li {
          margin: 0.25rem 0;
        }

        .contents a {
          color: var(--link-color);
          text-decoration: none;
        }

        .contents a:hover {
          text-decoration: underline;
        }

        .contents span {
          margin-right: 0.5rem;
        }

        /* Main article content styles */
        .main-article-content {
          font-size: var(--text-size);
          line-height: 1.6;
          width: var(--content-width);
          padding-top: 1rem; /* Added top padding */
        }

        .main-article-content p {
          margin-bottom: 1rem; /* Increased paragraph spacing */
          color: var(--text-color);
        }

        .main-article-content a {
          color: var(--link-color);
          text-decoration: none;
        }

        .main-article-content a:hover {
          text-decoration: underline;
        }

        .main-article-content a:visited {
          color: var(--visited-color);
        }

        .main-article-content h2 {
          font-family: "Linux Libertine", Georgia, Times, serif;
          font-size: 1.5rem;
          font-weight: normal;
          border-bottom: 1px solid #a2a9b1;
          margin: 1.5rem 0 0.5rem;
          padding-bottom: 0.125rem;
          color: var(--text-color);
        }

        .main-article-content h3 {
          font-size: 1.2rem;
          font-weight: bold;
          margin: 1.25rem 0 0.5rem;
          color: var(--text-color);
        }

        .main-article-content sup {
          vertical-align: super;
          font-size: 0.75rem;
          line-height: 0;
        }

        .main-article-content ul {
          margin: 0.5rem 0 0.5rem 1.5rem;
        }

        .main-article-content li {
          margin-bottom: 0.25rem;
        }

        /* Infobox styles */
        .infobox {
          float: right;
          margin: 0.5rem 0 1.5rem 1.5rem; /* Increased margins */
          padding: 0.5rem; /* Increased padding */
          border: 1px solid #a2a9b1;
          background-color: #f8f9fa;
          font-size: 0.875rem;
          width: 22rem;
          clear: right;
        }

        .infobox-image {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .infobox-image img {
          max-width: 100%;
          height: auto;
          border: 1px solid #c8ccd1;
        }

        .infobox-caption {
          font-size: 0.75rem;
          text-align: center;
          padding: 0.25rem;
        }

        /* Thumb styles */
        .thumb {
          margin: 0.75rem 0 1.5rem 0; /* Increased margins */
          border: 1px solid #c8ccd1;
          padding: 5px; /* Increased padding */
          background-color: #f8f9fa;
          font-size: 0.75rem;
        }

        .tright {
          float: right;
          clear: right;
          margin-left: 1.75rem; /* Increased left margin */
          margin-right: 0;
        }

        .thumbinner {
          min-width: 100px;
          max-width: 220px;
        }

        .thumbimage {
          border: 1px solid #c8ccd1;
          background-color: #fff;
          max-width: 100%;
          height: auto;
        }

        .thumbcaption {
          text-align: left;
          padding: 0.25rem 0;
        }

        /* References styles */
        .references {
          font-size: 0.875rem;
        }

        .references ol {
          margin-left: 2rem;
        }

        .references li {
          margin-bottom: 0.5rem;
        }

        .mw-cite-backlink {
          margin-right: 0.5rem;
        }

        .reference-text {
          color: var(--text-color);
        }

        /* External links styles */
        .external-links,
        .further-reading {
          list-style: none;
          margin-left: 1.5rem;
        }

        .external-links li,
        .further-reading li {
          margin-bottom: 0.25rem;
        }

        .external {
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QkPDYznL0calbbq0/1mB3i6Oeo+MTtI8k8+pD/9MwrNRjgOMS/OSoVULMnDqtxFgY69AKYrYtMAAAAASUVORK5CYII=")
            no-repeat right center;
          padding-right: 13px;
        }

        /* Categories styles */
        .categories {
          margin-top: 2rem;
          border-top: 1px solid #a2a9b1;
          padding-top: 0.5rem;
          font-size: 0.875rem;
        }

        .catlinks {
          color: #54595d;
        }

        .catlinks ul {
          display: inline;
          list-style: none;
        }

        .catlinks li {
          display: inline;
          margin-right: 0.5rem;
          border-left: 1px solid #a2a9b1;
          padding-left: 0.5rem;
        }

        .catlinks li:first-child {
          border-left: none;
          padding-left: 0;
        }

        .catlinks a {
          color: var(--link-color);
          text-decoration: none;
        }

        .catlinks a:hover {
          text-decoration: underline;
        }

        /* Footer styles */
        .footer {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          color: #54595d;
          background-color: #f8f9fa;
        }

        .footer-info p {
          margin-bottom: 0.5rem;
        }

        .footer-info a,
        .footer-places a {
          color: var(--link-color);
          text-decoration: none;
        }

        .footer-info a:hover,
        .footer-places a:hover {
          text-decoration: underline;
        }

        .footer-places {
          margin-top: 1rem;
        }

        .footer-places ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
        }

        .footer-places li {
          margin-right: 1rem;
          margin-bottom: 0.5rem;
        }

        /* Responsive styles */
        @media (max-width: 850px) {
          .wikipedia-container {
            flex-direction: column;
          }

          .sidebar {
            position: fixed;
            left: -100%;
            z-index: 1000;
            transition: left 0.3s ease;
            width: 80%;
            max-width: 300px;
            height: 100vh; /* Full height on mobile */
            overflow-y: auto; /* Allow scrolling on mobile only */
          }

          .sidebar.open {
            left: 0;
          }

          .main-content {
            max-width: 100%;
          }

          .header {
            flex-wrap: wrap;
          }

          .header-search {
            order: 3;
            width: 100%;
            max-width: 100%;
            margin: 0.5rem 0 0;
          }

          .header-user {
            margin-left: auto;
          }

          .mobile-header {
            display: flex;
            align-items: center;
            padding: 0.5rem;
            border-bottom: 1px solid #a7d7f9;
            background-color: #f6f6f6;
          }

          .menu-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.25rem;
          }

          .mobile-logo {
            flex: 1;
            text-align: center;
          }

          .mobile-logo img {
            height: 1.5rem;
          }

          .mobile-search-icon {
            font-size: 1.25rem;
            padding: 0.25rem;
            background: none;
            border: none;
            cursor: pointer;
            color: #54595d;
          }

          .mobile-search-icon:focus {
            outline: 2px solid var(--link-color);
            outline-offset: 2px;
          }

          .infobox {
            float: none;
            width: 100%;
            margin: 1rem 0;
          }

          .tright {
            float: none;
            margin: 1rem 0;
          }

          .thumbinner {
            max-width: 100%;
          }

          .language-button {
            position: static;
            margin: 0.5rem 0;
          }

          .language-dropdown {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 300px;
          }
        }

        .menu-toggle:focus {
          outline: 2px solid var(--link-color);
          outline-offset: 2px;
        }

        .more-menu:focus {
          outline: 2px solid var(--link-color);
          outline-offset: 2px;
        }

        .appearance-menu button:focus {
          outline: 2px solid var(--link-color);
          outline-offset: 2px;
        }

        .language-button:focus-within {
          outline: 2px solid var(--link-color);
          outline-offset: 2px;
        }

        .language-dropdown-header button:focus {
          outline: 2px solid var(--link-color);
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
