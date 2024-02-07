import { useEffect, useState } from 'react'
import {
  faAngular,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
          I’m a passionate front-end developer seeking an exciting role in an established IT company. My goal is to collaborate with talented teams, tackle challenging projects, and leverage the latest technologies to create exceptional user experiences.
          </p>
          <p align="LEFT">
          <b>Key Attributes:</b>
          </p>
          <ul>
            <ol>
              <b>Ambitious:</b> I thrive on pushing boundaries and constantly seek growth opportunities.
            </ol>
            <ol>
              <b>Curious:</b> My natural curiosity drives me to explore new ideas and learn from every design challenge.
            </ol>
            <ol>
              <b>Confident:</b> I approach each task with confidence, knowing that I can overcome obstacles.
            </ol>
            <ol>
              <b>Family-Centric:</b> Beyond coding, I’m a proud father of a beautiful daughter, cherishing family moments.
            </ol>
            <ol>
              <b>Sports Enthusiast:</b> Whether on the field or in front of the screen, I’m passionate about sports.
            </ol>
            <ol>
              <b>Photography Lover:</b> Capturing life’s moments through my lens brings me immense joy.
            </ol>
            <ol>
              <b>Tech-Obsessed:</b> I’m always up-to-date with the latest tech trends and innovations. 
              </ol>         
          </ul>
          <p>Let’s create something amazing together!</p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faAngular} color="#DD0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
