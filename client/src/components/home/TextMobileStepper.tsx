import React, { useEffect } from 'react'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'



//Picks images and text i slider
const tutorialSteps = [
  {
    imgPath:
      'https://source.unsplash.com/i9eaAR4dWi8/1600x900',
    sliderText:
      'Välkommen till butiken\n vid Väggatan 34\nÖppet vardagar: 10-17'
  },
  {
    imgPath:
      'https://source.unsplash.com/waTzoTvrFFs/1600x900',
    sliderText:
      'Besök oss gärna på Temässan\n 10-12 September'
  },
  {
    imgPath:
      'https://source.unsplash.com/p99ZKwVGBRA/1600x900',
    sliderText:
      'Nu erbjuder vi\n även Pu Erh Te\n och Lapsang Souchong'
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      flexGrow: 1,
      position: "relative",

      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    img: {
      position: "relative",

      height: "100vh",
      width: '100%',
      overflow: 'hidden',
      marginBottom: "1rem",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      filter: "grayscale(70%)"
    },

    logo: {
      position: "absolute",
      top: "50vh",

      zIndex: 1000,
      left: "50%",
      transform: "translatex(-50%) translatey(-50%)",

      display: "flex",
      alignItems: "center",

      filter: "invert(100%)",
      borderRadius: "50rem",
      background: "#fff5",

      width: "50vh",
      
      
      [theme.breakpoints.down(510)]: {
        width: "50vw",
      }


    },
  }),
)

export default function TextMobileStepper() {
  const classes = useStyles()


  const logo: any = require("../items/images/te_te_logo.png")

  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      setActiveStep(prevActiveStep => prevActiveStep = 0)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  })

  return (
    <div className={classes.root}>


      <img src={logo} alt="logo" className={classes.logo} />

      <div
        className={classes.img}
        style={{
          backgroundImage: `url(${tutorialSteps[activeStep].imgPath})`,
          transition: 'background-image 1s ease-in-out',
        }}
      >
      </div>
    </div>
  )
}
