import React, { useEffect, CSSProperties } from 'react'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Typography } from '@material-ui/core'


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

      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    img: {
      position: "relative",

      height: "50vh",
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

    sliderSphere: {
      position: "absolute",
      zIndex: 0,

      width: "50%",
      background: "#2c393f",
      borderRadius: "50%",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "&:after": {
        content: "open-quote",
        display: "block",
        paddingBottom: "100%",
      }
    },
    sliderTextStyle: {
      fontSize: "2rem",

      whiteSpace: 'pre-line',
      textAlign: 'center',
      color: "#e7e7e7",
      opacity: 1
    }
  }),
)

export default function TextMobileStepper() {
  const classes = useStyles()
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

  const handleBack = () => {
    if (activeStep === 0) {
      setActiveStep(prevActiveStep => prevActiveStep = tutorialSteps.length - 1)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1)
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
