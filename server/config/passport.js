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
    additionalParams:{'entityID':'https://www.e-osu.si/metadata.xml','returnIDParam':'entityID','return':'https://www.e-osu.si/loginaai'}
  },
  function(profile, done) {
    return done(null,
      {
        userName: profile.eduPersonPrincipalName,
        lastName:  profile.sn,
        firstName: profile.givenName
      });
    }
  ));

passport.use('config2', new SamlStrategy(
  {
    entryPoint: 'https://idp.aai.arnes.si/simplesaml/saml2/idp/SSOService.php',
    issuer: 'https://www.e-osu.si/metadata.xml',
    callbackUrl: '/assert',
    additionalParams:{'RelayState':'cookie'}
  },
  function(profile, done) {
    return done(null,
      {
        userName: profile.eduPersonPrincipalName,
        lastName:  profile.sn,
        firstName: profile.givenName
      });
    }
  ));

module.exports = passport;
