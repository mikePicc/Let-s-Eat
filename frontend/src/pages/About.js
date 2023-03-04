import React, { useState } from 'react';
import "./About.css"

// Simple html About page. Self explanatory, nothing much to see here.
function About() {

    // Just for some simple fun.
    const [secret, setSecret] = useState(false)
    const handleSecret = () => {
        setSecret(!secret)
    }

    return (
        <div id="about-page">
            <div id="about-header">
                <h1>About Let's Eat</h1>
            </div>
            <div id="about-main">
                <p>
                    Let's Eat is a prototype interface for a hypothetical food delivery service.
                    Developed by Group 23 for Course 195A/B at San Jose State University for the 2022 Spring-Fall semester
                    as a Senior Project. Built primarily in JavaScript and HTML/CSS using the MERN Stack framework.
                    Final submission was of December 2, 2022, 23:59 PST. Any updates to the repository after this deadline is of the member's own volition.
                </p>
                <hr />
                <h2>
                    Development Team
                </h2>
                {
                    !secret ?
                        (
                            <div id="team-members">
                                <div className="team-member odd">
                                    <img className="about-profile-img" src="https://www.pngkit.com/png/detail/11-111261_sushi-png-image-sushi-png.png" alt="Edward pic" />
                                    <h3 onClick={() => handleSecret()}>Edward Josh Hermano</h3>
                                    <p>
                                        Contributions include frontend and backend for restaurants list, restaurant filtering, restaurant pages, navbar, footer, orders page, and this fabulous About page (totes not biased).
                                    </p>
                                </div>
                                <div className="team-member even">
                                    <img className="about-profile-img" src="https://www.pngkit.com/png/detail/238-2388649_beef-noodle-soup-pho.png" alt="Khang pic" />
                                    <h3>Khang Phan</h3>
                                    <p>
                                        Contributions include frontend and backend for user accounts and authentication, restaurant searching, navbar, footer, orders page, cart, and checkout. MVP!
                                    </p>
                                </div>
                                <div className="team-member odd">
                                    <img className="about-profile-img" src="https://www.pngkit.com/png/detail/8-89695_taco-transparent-png-svg-transparent-library-queso-crunch.png" alt="Brian pic" />
                                    <h3>Brian Huynh</h3>
                                    <p>
                                        Contributions include frontend and backend for products list, orders page, cart, and checkout.
                                    </p>
                                </div>
                                <div className="team-member even">
                                    <img className="about-profile-img" src="https://www.pngkit.com/png/detail/155-1551564_lasagna-transparent-background.png" alt="Michael pic" />
                                    <h3>Michael Piccerillo</h3>
                                    <p>
                                        Contributions include frontend for various pages and elements.
                                    </p>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div id="team-members">
                                <div className="team-member odd">
                                    <img className="about-profile-img" src="https://media.tenor.com/76bZ4s0I15cAAAAC/hu-tao-genshin-impact.gif" alt="Edward pic" />
                                    <h3 onClick={() => handleSecret()}>Edward Josh Hermano</h3>
                                    <p>
                                        Self-declared resident madman and a filthy degenerate.
                                    </p>
                                </div>
                                <div className="team-member even">
                                    <img className="about-profile-img" src="https://media.tenor.com/83qR14S3hoQAAAAC/elmo-laughing.gif" alt="Khang pic" />
                                    <h3>Khang Phan</h3>
                                    <p>
                                        Too busy laughing to tell me what to fill in for this page.
                                    </p>
                                </div>
                                <div className="team-member odd">
                                    <img className="about-profile-img" src="https://media.tenor.com/95JjWlGDpVUAAAAC/patrickstarfish-eating.gif" alt="Brian pic" />
                                    <h3>Brian Huynh</h3>
                                    <p>
                                        "I'm Brian. I tried to think of something funny to write, but all I could think about was inhaling more food."
                                    </p>
                                </div>
                                <div className="team-member even">
                                    <img className="about-profile-img" src="https://media.tenor.com/lER2_kKTywYAAAAM/monkey-adult-swim.gif" alt="Michael pic" />
                                    <h3>Michael Piccerillo</h3>
                                    <p>
                                        When not coding, Michael spends his time practicing his typing skills on monkeytype.com where he climbs the jungles of the leaderboards
                                    </p>
                                </div>
                            </div>
                        )
                }
                <hr />
                <h2>
                    Special Thanks
                </h2>
                <div id="special-thanks">
                    <h3>Prof. Simon Shim</h3>
                    <p>
                        Our amazing project advisor. We wouldn't have gotten this far without his support.
                        Prof. Shim gave us the right push to drive us into implementing this application in just over a month.
                        He provided us with very helpful resources and tips to guide us in the right direction.
                        We are all very grateful!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;