import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DiscountIcon from '@mui/icons-material/Discount';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';


var STEP_QUESTIONS = [
  {
    label: "Quality",
    key: "qualityRating",
    type: 'rating',
    step: 1,
  },
  {
    label: "Packaging",
    key: "packagingRating",
    type: 'rating',
    step: 1,
  },
  {
    label: "Delivery",
    key: "deliveryRating",
    type: 'rating',
    step: 1,
  },
  {
    label: "How Likely would you recommend us to a Friend",
    key: "recommendationRating",
    type: 'rating',
    step: 3,
  },
  {
    label: "Any Comments or any new product recommendations ?",
    key: "comments",
    type: 'text',
    step: 3,
  },
];


function App() {
  const { orderId } = useParams();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {


    axios.get(`https://ijapeekfjf.patilkaki.com/api/v2/feedback-order/${orderId}`).then(data => {

      setOrderData(data.data);
      setLoading(false);

      if (STEP_QUESTIONS.length > 5)
        return;
      var usedSKUs = [];

      data.data.order_items.map(item => {


        if (!usedSKUs.includes(item.sku)) {
          STEP_QUESTIONS.push({
            label: item.name,
            key: `product-${item.sku}`,
            type: 'rating',
            step: 2,
          })

          usedSKUs.push(item.sku);
        }

        return true;
      })


      if (!questions.length) {
        setQuestions(STEP_QUESTIONS);
      }
    })

  }, [orderId, questions])

  const setKeyValue = (key, value) => {
    let tempQuestions = [...questions];
    let questionIndex = questions.findIndex((obj => obj.key === key));
    tempQuestions[questionIndex].value = value;

    setQuestions(tempQuestions);
    console.log({ tempQuestions, key, value })
  }

  const setNextStep = (value) => {

    if (value === 4) {
      setLoading(true);

      let finalValues = {};
      finalValues.order_id = orderId;
      let productsFeedback = [];
      questions.map(item => {

        if (item.key.includes('product-')) {
          let sku = item.key.replace('product-', '');
          productsFeedback.push({
            sku,
            value: item.value
          })
        } else {
          finalValues[item.key] = item.value;
        }
        return true;
      })

      finalValues.products = productsFeedback;

      axios.post(`https://ijapeekfjf.patilkaki.com/api/v2/feedback-submit/`, finalValues).then(data => {

        setStep(value);
        setLoading(false);
      });


    } else {
      setStep(value);
    }
  }
  var AllInputsReceived = true;
  let npsScore = 0;

  questions.map(question => {
    if (question.key === 'recommendationRating' && question.value)
      npsScore = question.value;

    if (question.step === step && question.type === 'rating') {
      if (!question.value)
        AllInputsReceived = false;
    }
    return true;
  });

  const progressOutOf = step * 20;
  return (
    <div className="App">


      <Card style={{ maxWidth: 500, width: '100%', paddingTop: 3, border: "none", boxShadow: "none" }}>
        <img src="https://patilkaki.com/wp-content/uploads/2020/10/pk-logo-min.png" alt="PatilKaki Logo" style={{ maxWidth: "50%" }} />
        {!loading && <>
          <CardContent>


            <div style={{ marginTop: 10, marginBottom: 30 }}>

              {(step > 0 && step < 4) && <LinearProgress variant="determinate" value={progressOutOf} />}
            </div>

            <Typography variant="h5" component="div" style={{ fontFamily: "Poppins", marginBottom: 40 }} >
              {step === 0 && `Hey ${orderData.first_name} ${orderData.last_name}`}

              {step === 1 && "Overall Experience"}
              {step === 2 && "Product Feedback"}
              {step === 3 && "Last One"}

              {step === 4 && "Thank You!"}

            </Typography>


            <div style={{ minHeight: 350 }}>
              {step === 0 && <>
                <Typography>
                  We would love to read your precious feedback on the experience you had with us, which will help us serve you better. The feedback takes less than a minute and there is a lil suprise at the end.
                </Typography>

              </>}

              {questions.map(question => {

                if (question.step === step) {

                  if (question.type === 'rating') {
                    return (
                      <>
                        <Typography variant="overline" component="div">
                          {question.label}
                        </Typography>
                        <Rating
                          name={question.key}
                          max={(question.key === 'recommendationRating' ? 10 : 5)}
                          onChange={(e, value) => setKeyValue(question.key, value)}
                          size='large'
                          style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
                        />
                      </>
                    )
                  } else {
                    return (
                      <>
                        <Typography variant="overline" component="div">
                          {question.label}
                        </Typography>
                        <TextField
                          id="outlined-multiline-static"
                          name={question.key}
                          value={question.value}
                          onChange={(e) => setKeyValue(question.key, e.target.value)}
                          multiline
                          rows={4}
                          style={{ marginTop: 5, marginBottom: 35, width: '100%' }}
                        />
                      </>
                    )
                  }
                }

                return false;

              })}


              {step === 4 && <>
                <Typography>
                  We're genuinely thankful for your valuable feedback. As a customer first brand, it really helps us understand how well we are able to serve our PatilKaki community. Here are the next steps-
                </Typography>

                {npsScore > 7 && <>
                  <hr style={{ marginTop: 20, marginBottom: 50 }} />

                  <a href="https://patilkaki.com/refer" target='_blank' rel="noreferrer" style={{ color: '#333', textDecoration: "none" }} >

                    <Grid container style={{ backgroundColor: "#ffede6", cursor: "pointer", padding: 5, paddingBottom: 10, borderRadius: 10, marginBottom: 30 }} >
                      <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <DiscountIcon style={{ fontSize: 30 }} />
                      </Grid>
                      <Grid item xs={10} style={{ textAlign: "left" }}  >
                        <Typography variant='h6' > Refer & Save </Typography>
                        <Typography variant='subtitle2'> Give 20% & Get 25% </Typography>
                      </Grid>
                    </Grid>

                  </a>

                  <a href="https://linktr.ee/patilkaki" target='_blank' rel="noreferrer" style={{ color: '#333', textDecoration: "none" }} >
                    <Grid container style={{ backgroundColor: "#ffede6", cursor: "pointer", padding: 5, paddingBottom: 10, borderRadius: 10, marginBottom: 10 }} >
                      <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <ReviewsIcon style={{ fontSize: 30 }} />
                      </Grid>
                      <Grid item xs={10} style={{ textAlign: "left" }}  >
                        <Typography variant='h6' > Write a Social Review </Typography>
                        <Typography variant='subtitle2'> Get a FLAT 20% Discount on your next order </Typography>
                      </Grid>
                    </Grid>
                  </a>

                  <Typography style={{ textAlign: 'left', display: 'flex', paddingLeft: 20 }} variant='caption' >( Do share a screenshot of the review with us on whatsapp and we will send you your coupon code )</Typography>

                </>}

              </>}
            </div>

          </CardContent>
          <CardActions>
            {step < 4 && <Button fullWidth disabled={!AllInputsReceived} variant='contained' onClick={() => setNextStep(step + 1)} > NEXT  </Button>}
          </CardActions>
        </>}
        {loading && <>
          <div style={{ minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        </>}
      </Card>

    </div>
  );
}

export default App;
