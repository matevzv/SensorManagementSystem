var fs = require('fs');
var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use('config1', new SamlStrategy(
  {
    entryPoint: 'https://ds-edugain.aai.arnes.si/simplesaml/saml2/sp/idpdisco.php',
    issuer: 'https://www.e-osu.si/metadata.xml',
    callbackUrl: '/loginaai',
    cert: fs.readFileSync('./cert/cert.pem', 'utf-8'),
    privateCert: fs.readFileSync('./cert/key.pem', 'utf-8'),
    additionalParams:{'entityID':'https://www.e-osu.si/metadata.xml','returnIDParam':'entityID','return':'http://e6-mvucnik.ijs.si:3000/loginaai'}
  },
  function(profile, done) {
    return done(null,
      {
        id : profile.uid,
        email : profile.mail
      });
    }
));

passport.use('config2', new SamlStrategy(
  {
    entryPoint: 'https://idp.aai.arnes.si/simplesaml/saml2/idp/SSOService.php',
    issuer: 'https://www.e-osu.si/metadata.xml',
    callbackUrl: '/assert',
    cert: fs.readFileSync('./cert/cert.pem', 'utf-8'),
    privateCert: fs.readFileSync('./cert/key.pem', 'utf-8'),
    additionalParams:{'RelayState':'cookie'}
  },
  function(profile, done) {
    return done(null,
      {
        id : profile.uid,
        email : profile.mail
      });
    }
));

module.exports = passport;
