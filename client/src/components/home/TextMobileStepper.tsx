import React,{useEffect, CSSProperties} from 'react'
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
      width: '100%',
      flexGrow: 1,
    },
    img: {
      height: 255,
      width: '100%',
      overflow: 'hidden',
      display: 'block',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
    },
  }),
)

export default function TextMobileStepper() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length

  const handleNext = () => {
    if(activeStep === maxSteps - 1){
      setActiveStep(prevActiveStep => prevActiveStep = 0)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if(activeStep === 0){
      setActiveStep(prevActiveStep => prevActiveStep = tutorialSteps.length-1)
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
    <div className={classes.root} style={{margin:'0 0 1em 0'}} >
      <div
        className={classes.img}
        style={{
          backgroundImage:`url(${tutorialSteps[activeStep].imgPath})`,
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <Typography style={sliderTextStyle} variant="h5" color="secondary">
          {tutorialSteps[activeStep].sliderText}
        </Typography>
        <div style={sliderSphere}>
        </div>
      </div>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            {theme.direction === 'rtl' ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon/>}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === 'rtl' ? <ArrowForwardIosIcon/> : <ArrowBackIosIcon/>}
          </Button>
        }
      />
    </div>
  )
}

const sliderTextStyle: CSSProperties = {
  whiteSpace: 'pre-line',
  textAlign: 'center',
  position: 'absolute',
  top: '10em',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1
}

const sliderSphere: CSSProperties = {
        backgroundImage: `url(${require("../items/images/sphere.png")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '100%',
        backgroundPositionY: '-3em',
        padding: '10%',
}