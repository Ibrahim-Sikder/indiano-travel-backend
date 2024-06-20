const otpTemplate = (otp: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Email</title>
  <style>
    /* Reset CSS */
    body, h1, p {
      margin: 0;
      padding: 0;
    }
    
    /* Email body styles */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* OTP code styles */
    .otp-code {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    /* Call to action button styles */
    .cta-button {
      display: block;
      width: 100%;
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      text-decoration: none;
      padding: 10px 0;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>One-Time Password (OTP) Verification</h1>
    <p>Your OTP code is:</p>
    <div class="otp-code">${otp}</div>
    <p>Please use this code to verify your identity.</p>
    <a href="#" class="cta-button">Verify Now</a>
  </div>
</body>
</html>

    `;
};

export default otpTemplate;
