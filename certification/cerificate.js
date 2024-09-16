import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import WebView from 'react-native-webview';
import CertLogo from '../assets/certificate/cert.png';

// Define the HTML content as a constant
const htmlContent = (name, date) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #ccc;
          text-align: center;
        }
        .container {
          width: 800px;
          height: 600px;
          background-color: #618597;
          padding: 30px;
          color: #333;
          font-family: Arial, sans-serif;
          box-shadow: 0 0 5px rgba(0, 0, 0, .5);
          position: relative;
          margin: 0 auto;
        }
        .outer-border, .inner-border {
          border: 2px solid #fff;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .inner-border {
          margin: 15px;
        }
        .certificate-border {
          width: 720px;
          height: 520px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border: 1px solid #E1E5F0;
        }
        .certificate-title {
          font-size: 34px;
          color: #4CAF50;
          margin-bottom: 20px;
        }
        .certificate-body {
          font-size: 20px;
          color: #555;
        }
        .signature {
          font-size: 16px;
          font-style: italic;
          color: #666;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="outer-border"></div>
        <div class="inner-border"></div>
        <div class="certificate-border">
          <h2 class="certificate-title">Certificate of Participation</h2>
          <div class="certificate-body">
            <p>This is to certify that</p>
            <h3>${name}</h3>
            <p>has participated in the event</p>
            <p>on ${date}</p>
            <p class="signature">Event Organizer</p>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

const CertificatePage = () => {
  // Generate HTML content for the certificate
  const certificateHTML = htmlContent('John Doe', 'September 14, 2024');

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.logo}
        source={CertLogo} // Replace with your logo URL
      />
      <Text style={styles.title}>Certificate Preview</Text>
      <WebView
        originWhitelist={['*']}
        source={{ html: certificateHTML }}
        style={styles.webview}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  webview: {
    width: '100%',
    height: 600,
  },
});

export default CertificatePage;
