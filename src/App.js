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
import './App.css';
import { useState } from 'react';





function App() {
  const [step, setStep] = useState(0);

  const progressOutOf = step * 20;
  return (
    <div className="App">



      <Card style={{ maxWidth: 500, width: '100%', paddingTop: 3, border: "none", boxShadow: "none" }}>
        <img src="https://patilkaki.com/wp-content/uploads/2020/10/pk-logo-min.png" alt="PatilKaki Logo" style={{ maxWidth: "50%" }} />
        <CardContent>


          <Typography variant="h5" component="div">
            {step === 0 && "Hey Darsheel Savla"}

            {step === 1 && "Overall Experience"}
            {step === 2 && "Product Feedback"}
            {step === 3 && "Last One"}

            {step === 4 && "Thank You!"}

          </Typography>

          <div style={{ marginTop: 40, marginBottom: 30 }}>

            {(step > 0 && step < 4) && <LinearProgress variant="determinate" value={progressOutOf} />}
          </div>

          <div style={{ minHeight: 350 }}>
            {step === 0 && <>
              <Typography>
                It would take less than 30 seconds , and there are some suprise rewards at the end!
              </Typography>

            </>}

            {step === 1 && <>
              <Typography variant="overline" component="div">
                Quality
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />

              <Typography variant="overline" component="div">
                Packaging
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />

              <Typography variant="overline" component="div"  >
                Delivery
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />
            </>}

            {step === 2 && <>
              <Typography variant="overline" component="div">
                Product 1
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />

              <Typography variant="overline" component="div">
                Product 2
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />

              <Typography variant="overline" component="div"  >
                Product 3
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />
            </>}

            {step === 3 && <>
              <Typography variant="overline" component="div">
                How Likely would you recommend us to a Friend
              </Typography>
              <Rating
                name="simple-controlled"
                size='large'
                max={10}
                style={{ fontSize: 40, marginTop: 5, marginBottom: 35 }}
              />


              <Typography variant="overline" component="div">
                Any Comments or any new product recommendations ?
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                style={{ marginTop: 5, marginBottom: 35, width: '100%' }}
              />

            </>}

            {step === 4 && <>
              <Typography>
                Hey Darsheel, Thank you for taking your time to share your valuable feedback being a D2C First Brand It's super important for us.
              </Typography>

              <hr style={{ marginTop: 20, marginBottom: 50 }} />

              <Grid container style={{ backgroundColor: "#ffede6", cursor: "pointer", padding: 5, paddingBottom: 10, borderRadius: 10, marginBottom: 30 }} >
                <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                  <DiscountIcon style={{ fontSize: 30 }} />
                </Grid>
                <Grid item xs={10} style={{ textAlign: "left" }}  >
                  <Typography variant='h6' > Refer & Save </Typography>
                  <Typography variant='subtitle2'> Give 20% & Get 25% </Typography>
                </Grid>
              </Grid>


              <Grid container style={{ backgroundColor: "#ffede6", cursor: "pointer", padding: 5, paddingBottom: 10, borderRadius: 10, marginBottom: 10 }} >
                <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                  <ReviewsIcon style={{ fontSize: 30 }} />
                </Grid>
                <Grid item xs={10} style={{ textAlign: "left" }}  >
                  <Typography variant='h6' > Write a Social Review </Typography>
                  <Typography variant='subtitle2'> Get a FLAT 20% Discount Code </Typography>
                </Grid>
              </Grid>



            </>}
          </div>

        </CardContent>
        <CardActions>
          {step < 4 && <Button fullWidth variant='contained' onClick={() => setStep(step + 1)} > NEXT </Button>}
        </CardActions>
      </Card>

    </div>
  );
}

export default App;
